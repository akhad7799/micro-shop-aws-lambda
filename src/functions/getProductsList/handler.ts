import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { products } from "../../data/data";

const getProductsList = async () => {
  return formatJSONResponse(products, 200);
};

export const main = middyfy(getProductsList);
