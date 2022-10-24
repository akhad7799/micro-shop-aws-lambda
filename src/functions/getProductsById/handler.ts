import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { products } from '../../data/seeds/data';

import schema from './schema';

export const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const response = products.find((product) => product.id === event.pathParameters.productId);
  if (!response) {
    return formatJSONResponse('Product not found', 404);
  }

  return formatJSONResponse(response, 200);
};
