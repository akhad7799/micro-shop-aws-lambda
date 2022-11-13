import { CopyObjectCommand, DeleteObjectCommand, GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { formatJSONResponse } from '../../libs/api-gateway';
import { processS3Stream } from '../../libs/s3-stream';
import { sqsClient } from '../../libs/sqs-client';

export const importFileParser = async (event) => {
	console.log('Import file parser list method invoked');
	try {
		const {
			awsRegion,
			s3: { bucket, object: s3Object },
		} = event.Records[0];

		const s3Client = new S3Client({ region: awsRegion });

		const bucketParams = {
			Bucket: bucket.name,
			Key: s3Object.key,
		};
		const command = new GetObjectCommand(bucketParams);
		const streamData = await s3Client.send(command);

		const data = await processS3Stream(streamData.Body);

		await s3Client.send(
			new CopyObjectCommand({
				...bucketParams,
				CopySource: `${bucketParams.Bucket}/${bucketParams.Key}`,
				Key: bucketParams.Key.replace('uploaded', 'parsed'),
			})
		);

		await s3Client.send(new DeleteObjectCommand(bucketParams));
		await sqsClient(data);

		console.log('CSV parsed and send to queue.');

		return formatJSONResponse('CSV parsed and send to queue.', 200);
	} catch (error) {
		console.log('Error while parsing CSV ===> ', error);
		throw error;
	}
};
