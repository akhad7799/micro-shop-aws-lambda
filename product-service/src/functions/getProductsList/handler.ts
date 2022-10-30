import { formatJSONResponse } from '../../libs/api-gateway';
import { ProductsRepository, StocksRepository } from '../../data/repositories';

const productRepository = new ProductsRepository();
const stockRepository = new StocksRepository();

export const getProductsList = async () => {
  console.log('Get products list method invoked');

  try {
    const products = await productRepository.getAllProducts();
    const stocks = await stockRepository.getAllStocks();


    const responseData = products.map((product) => {
      const stockData = stocks.find((stock) => stock.product_id === product.id);
      return {
        ...product,
        count: stockData.count,
      };
    });

    return formatJSONResponse(responseData, 200);
  } catch (err) {
    return formatJSONResponse(`Something went wrong: ${err.message}`, 500);
  }


};
