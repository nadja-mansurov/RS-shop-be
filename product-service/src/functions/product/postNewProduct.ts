import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';

import { Product } from './schema';

import CRED from '../../../../CRED';
import { ORIGIN } from '../../libs/api.constant';

const { Client } = require('pg');
const client = new Client(CRED);

export const postNewProduct: ValidatedEventAPIGatewayProxyEvent<typeof Product> = async (event) => {
  const body = JSON.parse(JSON.stringify(event.body));

  if (!body.name || !body.descr || !body.price) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": ORIGIN,
        "Access-Control-Allow-Methods": "OPTIONS,GET"
        },
      body: 'Failed format check'
    };
  }

  try {
    await client.connect();
    const data = `'${body.name}', '${body.descr}', ${body.price}`;
    const res_prod = await client.query(`insert into products (title, descr, price) values (${data}) returning id`);
    const prod_id = res_prod?.rows[0].id;
    const res_stocks = await client.query(`insert into stocks (count_items, product_id) values (1, ${prod_id}) returning id`);
    const stock_id = res_stocks?.rows[0].id;

    const product = await client.query(`SELECT * FROM PRODUCTS WHERE id=${prod_id}`)
    console.log('INSERTED to PRODUCTS', product.rows);
    const stocks = await client.query(`SELECT * FROM STOCKS WHERE id='${stock_id}'`)
    console.log('INSERTED to STOCKS', stocks.rows);

    await client.end()

    if (prod_id && stock_id) {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": ORIGIN,
          "Access-Control-Allow-Methods": "OPTIONS,GET"
          },
        body: 'OK'
      };
    } else {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": ORIGIN,
          "Access-Control-Allow-Methods": "OPTIONS,GET"
          },
        body: 'Failed format check'
      };

    }
  } catch(e) {
    await client.end();
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

