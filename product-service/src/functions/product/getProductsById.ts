import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';

import { ProductsById } from './schema';

import PRODUCTS from './products';
import { ORIGIN } from '../../libs/api.constant';


export const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof ProductsById> = async (event) => {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": ORIGIN,
        "Access-Control-Allow-Methods": "OPTIONS,GET"
        },
      body: JSON.stringify(PRODUCTS.find(item => item.id === event.pathParameters?.id))
    };
  }



