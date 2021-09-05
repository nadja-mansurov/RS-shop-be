//import { ProductsList, ProductsById } from './schema';
import { handlerPath } from '@libs/handlerResolver';

export const getProductsList = {
  handler: `${handlerPath(__dirname)}/handler.productsList`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products'
      }
    }
  ]
}

export const getProductsById = {
    handler: `${handlerPath(__dirname)}/handler.productsById`,
    events: [
      {
        http: {
          method: 'get',
          path: 'products/{id}'
        }
      }
    ]
  }
  