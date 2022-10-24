import AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const createDynamoDBClient = (): DocumentClient => new AWS.DynamoDB.DocumentClient();
