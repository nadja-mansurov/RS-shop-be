import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { ProductsList, ProductsById } from './schema';

import PRODUCTS from './products';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof ProductsList> = async (event) => {
    return {
      statusCode: 200,
      body: JSON.stringify(PRODUCTS)
  };
}

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof ProductsById> = async (event) => {
    return {
      statusCode: 200,
      body: JSON.stringify(PRODUCTS.find(item => item.id === event.pathParameters?.id))
    };
  }

export const productsList = middyfy(getProductsList);
export const productsById = middyfy(getProductsById);

