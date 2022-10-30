import { stocks } from './data';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const seedStocks = async (docClient: DocumentClient, tableName) => {
  for (const stock of stocks) {
    await docClient
      .put({
        TableName: tableName,
        Item: stock,
      })
      .promise();
  }
};
