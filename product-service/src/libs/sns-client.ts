import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';


const getSnsClient = (): SNSClient =>  {
	return new SNSClient({ region: process.env.REGION });
};

export const publishSns = async (message: any) => {
	const params = {
		Message: message,
		TopicArn: process.env.TOPIC_ARN,
	};

	return new Promise( (resolve, reject) => {
		try {
			const snsClient = getSnsClient();
			const data = snsClient.send(new PublishCommand(params));
			resolve(data);
		} catch (error) {
			reject(error);
		}
	});
};