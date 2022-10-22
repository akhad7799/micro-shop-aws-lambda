import { formatJSONResponse } from '@libs/api-gateway';
import { products } from '../../data/data';

export const getProductsList = async () => {
  return formatJSONResponse(products, 200);
};
