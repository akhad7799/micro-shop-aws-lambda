import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { createDynamoDBClient } from '../../db-client';
import { StockModel } from '../../../models';

const { STOCKS_TABLE } = process.env;

export class StocksRepository {
  readonly docClient: DocumentClient;
  private readonly tableName: string;
  public constructor() {
    this.docClient = createDynamoDBClient();
    this.tableName = STOCKS_TABLE;
  }

  async getAllStocks(): Promise<StockModel[]> {
    const result = await this.docClient
      .scan({
        TableName: this.tableName,
      })
      .promise();

    return result.Items as StockModel[];
  }

  async getStock(productId: string): Promise<StockModel> {
    const result = await this.docClient
      .get({
        TableName: this.tableName,
        Key: { product_id: productId },
      })
      .promise();

    return result.Item as StockModel;
  }

  async createStock(stock: StockModel): Promise<StockModel> {
    await this.docClient
      .put({
        TableName: this.tableName,
        Item: stock,
      })
      .promise();

    return stock;
  }
}
