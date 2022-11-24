import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { REGION, SQS_URL } from '../config';

export const sqsClient = async(message: any) => {
	const sqs = new SQSClient({ region: REGION });
	const sqsParams = {
		MessageBody: message,
		QueueUrl: SQS_URL
	};
	await sqs.send(new SendMessageCommand(sqsParams));
};