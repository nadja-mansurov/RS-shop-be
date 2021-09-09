
import { middyfy } from '@libs/lambda';

import { getProductsById } from './getProductsById';
import { getProductsList } from './getProductsList';
import { postNewProduct } from './postNewProduct';

export const productsList = middyfy(getProductsList);
export const productsById = middyfy(getProductsById);
export const productAdd = middyfy(postNewProduct);