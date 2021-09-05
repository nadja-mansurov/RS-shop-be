import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';

import { ProductsList } from './schema';

import CRED from '../../../../CRED';
import { ORIGIN } from '../../libs/api.constant';

const { Client } = require('pg');

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof ProductsList> = async (event) => {
  console.log(event);
  try {
    const client = new Client(CRED);
    await client.connect();

    const res = await client.query('SELECT * FROM PRODUCTS')
    await client.end();

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
      await client.end();
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

