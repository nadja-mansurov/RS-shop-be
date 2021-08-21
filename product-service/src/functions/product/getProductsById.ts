import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';

import { ProductsById } from './schema';

import PRODUCTS from './products';


export const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof ProductsById> = async (event) => {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "https://d2hyfirjnphuti.cloudfront.net",
        "Access-Control-Allow-Methods": "OPTIONS,GET"
        },
      body: JSON.stringify(PRODUCTS.find(item => item.id === event.pathParameters?.id))
    };
  }



