import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import schema from './schema';
import { BUCKET_NAME, REGION } from '../../config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export const importProductsFile: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event: any) => {
	console.log('Import products file list method invoked');
	try {
		const name = event.queryStringParameters.name;
		const S3 = new S3Client({ region: REGION });
		const params = {
			Bucket: BUCKET_NAME,
			Key: `uploaded/${name}`,
		};

		const command = new PutObjectCommand(params);
		const signedUrl = await getSignedUrl(S3, command, { expiresIn: 3600 });

		return formatJSONResponse(signedUrl, 200);
	} catch (err) {
		return formatJSONResponse(`Something went wrong: ${err.message}`, 500);
	}
};
