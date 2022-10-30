import { products } from './data';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';


export const seedProducts = async (docClient: DocumentClient, tableName) => {
  for (const product of products) {
    await docClient
      .put({
        TableName: tableName,
        Item: product,
      })
      .promise();
  }
};
