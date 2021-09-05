const handler = require('src/functions/product/getProductsById');

const ORIGIN = require('src/libs/api.constant').ORIGIN;

const PRODUCT = {
  "count": 3,
  "description": "Published April 1st 1995 by Nicholas Brealey",
  "id": "738b92ae-99df-4083-b252-e6efc837e2e4",
  "price": 2.4,
  "url": "https://www.goodreads.com/book/show/848882.Thick_Face_Black_Heart",
  "img": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1347504860l/848882.jpg",
  "title": "Thick Face, Black Heart: The Asian Path to Thriving, Winning & Succeeding"
};

test('Return product with header', async () => {

  const PRODUCT_RESPONSE = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": ORIGIN,
      "Access-Control-Allow-Methods": "OPTIONS,GET"
      },
    body: JSON.stringify(PRODUCT)
  }
  const ev = {
    pathParameters: {
      id: "738b92ae-99df-4083-b252-e6efc837e2e4"
    }
  }
  const res = await handler.getProductsById(ev);
  expect(res).toMatchObject(PRODUCT_RESPONSE);
});

test('Return no product with header', async () => {

  const NO_FOUND_RESPONSE = {
    statusCode: 404,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": ORIGIN,
      "Access-Control-Allow-Methods": "OPTIONS,GET"
      },
    body: "Product is not found"
  }
  const ev = {
    pathParameters: {
      id: "0000"
    }
  }
  const res = await handler.getProductsById(ev);
  expect(res).toMatchObject(NO_FOUND_RESPONSE);
});