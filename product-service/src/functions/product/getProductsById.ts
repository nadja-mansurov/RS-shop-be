import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';

import { ProductsById } from './schema';
import CRED from '../../../../CRED';
import { ORIGIN } from '../../libs/api.constant';

const { Client } = require('pg');
const client = new Client(CRED);

export const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof ProductsById> = async (event) => {
  const id = event.pathParameters?.id;
  try {
    await client.connect();

    const product = await client.query(`SELECT * FROM PRODUCTS WHERE id=${id}`)
    await client.end()

    if (product?.rows)
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": ORIGIN,
          "Access-Control-Allow-Methods": "OPTIONS,GET"
          },
        body: JSON.stringify(product.rows)
      };
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": ORIGIN,
          "Access-Control-Allow-Methods": "OPTIONS,GET"
          },
        body: 'Product is not found'
      };
    } catch(e) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": ORIGIN,
          "Access-Control-Allow-Methods": "OPTIONS,GET"
          },
        body: 'Database Error'
      };
    }
  }



