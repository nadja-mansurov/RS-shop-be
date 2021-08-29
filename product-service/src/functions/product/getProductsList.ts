import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';

import { ProductsList } from './schema';

import PRODUCTS from './products';
import { ORIGIN } from '../../libs/api.constant';

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof ProductsList> = async () => {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": ORIGIN,
        "Access-Control-Allow-Methods": "OPTIONS,GET"
        },
      body: JSON.stringify(PRODUCTS)
  };
}

