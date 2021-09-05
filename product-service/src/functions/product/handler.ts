
import { middyfy } from '@libs/lambda';

import { getProductsById } from './getProductsById';
import { getProductsList } from './getProductsList';

export const productsList = middyfy(getProductsList);
export const productsById = middyfy(getProductsById);