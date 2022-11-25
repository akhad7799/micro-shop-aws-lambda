import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda';

const EFFECT = {
	Allow: 'Allow',
	Deny: 'Deny'
}

export const basicAuthorizer = async (event: APIGatewayTokenAuthorizerEvent, _context, callback) => {
	const { type } = event;
	let policy;
	try {
		if (type !== 'TOKEN') {
			throw new Error('401');
		}
		const token = event.authorizationToken.split(' ').pop()
		const effect = authenticateUserBy(token)
		policy = generatePolicy(event, effect);
		callback(null, policy)
	} catch (error) {
		callback(error.message)
	}
};


function generatePolicy(event: APIGatewayTokenAuthorizerEvent, effect: string) {
	const { methodArn: resource } = event;
	return {
		principalId: effect.toLowerCase(),
		policyDocument: {
			Version: "2012-10-17",
			Statement: [
				{
					Action: "execute-api:Invoke",
					Effect: effect,
					Resource: resource,
				},
			],
		},
	}
}

function authenticateUserBy(token: string) {
	const buff = Buffer.from(token, "base64");
	const [username, password] = buff.toString("utf-8").split(":");
	const passwordFromEnv = process.env[username];
	return (passwordFromEnv && passwordFromEnv === password) ? EFFECT.Allow : EFFECT.Deny
}