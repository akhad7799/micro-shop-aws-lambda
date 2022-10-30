import { formatJSONResponse } from '../../libs/api-gateway';
import { ProductsRepository } from '../../data/repositories';
import { v4 as uuidv4 } from 'uuid';
import { ProductModel } from '../../models';
import { StocksRepository } from '../../data/repositories';

const productRepository = new ProductsRepository();
const stockRepository = new StocksRepository();

export const createProduct = async (event) => {
  console.log(`Create product executed. Body: ${JSON.stringify(event.body)}`);
  try {
    const { title, description, price, count } = JSON.parse(event.body);
    const product: ProductModel = {
      id: uuidv4(),
      description,
      title,
      price,
    };
    const productData = await productRepository.createProduct(product);
    if (!productData) {
      return formatJSONResponse(`Can not create product: ${JSON.stringify(product)}`, 400);
    }

    const stock = {
      product_id: productData.id,
      count,
    };
    const stockData = await stockRepository.createStock(stock);
    if (!stockData) {
      return formatJSONResponse(`Can not create stock: ${JSON.stringify(stock)}`, 400);
    }

    const responseData = {
      ...productData,
      count: stockData.count,
    };

    return formatJSONResponse(responseData, 200);
  } catch (err) {
    return formatJSONResponse(`Something went wrong: ${err.message}`, 500);
  }
};
