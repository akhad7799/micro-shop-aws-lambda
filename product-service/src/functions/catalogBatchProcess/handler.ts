import { formatJSONResponse } from '../../libs/api-gateway';
import { createProduct } from '../createProduct';
import { publishSns } from '../../libs/sns-client';

export const catalogBatchProcess = async (event) => {
	try {
		console.log('Catalog Batch Process Executed.');
		const { Records: records } = event;
		const products = records.reduce((previousValue: Array<any>, currentValue: any) => [...previousValue, ...(JSON.parse(currentValue.body))], []);
		await Promise.all(products.map(async (product: Array<any>) => {
			await createProduct({
				body: JSON.stringify(product)
			});
		}));
		console.log('Products created');

		await publishSns('New products created!');
		console.log('SNS topic published!');

		return formatJSONResponse({ message: 'products created' }, 200);
	} catch (err) {
		return formatJSONResponse(`Something went wrong: ${err.message}`, 500);
	}
};
