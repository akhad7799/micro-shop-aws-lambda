import { seedProducts } from './products';
import { seedStocks } from './stocks';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const docClient = new DocumentClient({
  region: 'eu-central-1',
});
const productTable = 'Products-service-dev';
const stockTable = 'Stocks-service-dev';

async function main() {
  await seedProducts(docClient, productTable);
  await seedStocks(docClient, stockTable);
}

main()
  .then(() => {
    console.log('All seeds run successfully');
    process.exit(0);
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
