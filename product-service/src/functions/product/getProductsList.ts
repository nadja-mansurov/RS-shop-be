import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';

import { ProductsList } from './schema';

import CRED from '../../../../CRED';
import { ORIGIN } from '../../libs/api.constant';

const { Client } = require('pg');
const client = new Client(CRED);

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof ProductsList> = async () => {
    
  try {
    await client.connect();

    const res = await client.query('SELECT * FROM PRODUCTS')
    await client.end()

    if (res?.rows) {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": ORIGIN,
          "Access-Control-Allow-Methods": "OPTIONS,GET"
          },
        body: JSON.stringify(res.rows)
      };
    } else {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": ORIGIN,
          "Access-Control-Allow-Methods": "OPTIONS,GET"
          },
        body: 'Database Error'
      };

    }
    
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

