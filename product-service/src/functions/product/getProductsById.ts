import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';

import { ProductsById } from './schema';

import PRODUCTS from './products';
import { ORIGIN } from '../../libs/api.constant';


export const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof ProductsById> = async (event) => {
    const product = PRODUCTS.find(item => item.id === event.pathParameters?.id);
    if (product)
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": ORIGIN,
          "Access-Control-Allow-Methods": "OPTIONS,GET"
          },
        body: JSON.stringify(product)
      };
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": ORIGIN,
          "Access-Control-Allow-Methods": "OPTIONS,GET"
          },
        body: 'Product not found'
      };
  }



