import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';

import { ProductsList } from './schema';

import PRODUCTS from './products';

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof ProductsList> = async (event) => {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "https://d2hyfirjnphuti.cloudfront.net",
        "Access-Control-Allow-Methods": "OPTIONS,GET"
        },
      body: JSON.stringify(PRODUCTS)
  };
}

