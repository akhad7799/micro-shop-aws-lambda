import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { createDynamoDBClient } from '../../db-client';
import { ProductModel } from '../../../models';

const { PRODUCTS_TABLE } = process.env;

export class ProductsRepository {
	readonly docClient: DocumentClient;
	private readonly tableName: string;
	public constructor() {
		this.docClient = createDynamoDBClient();
		this.tableName = PRODUCTS_TABLE;
	}

	async getAllProducts(): Promise<ProductModel[]> {
		const result = await this.docClient
			.scan({
				TableName: this.tableName,
			})
			.promise();

		return result.Items as ProductModel[];
	}

	async getProduct(productId: string): Promise<ProductModel> {
		const result = await this.docClient
			.get({
				TableName: this.tableName,
				Key: { id: productId },
			})
			.promise();

		return result.Item as ProductModel;
	}

	async createProduct(product: ProductModel): Promise<ProductModel> {
		await this.docClient
			.put({
				TableName: this.tableName,
				Item: product,
			})
			.promise();

		return product;
	}
}
