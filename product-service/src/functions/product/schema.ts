export const ProductsList = {
  type: Array
};

export const ProductsById = {
  type: Object,
  properties: {
    id: {
      type: "string"
    }
  }
};

export const Product = {
  type: Object,
  body: {
    type: Object,
    properties: {
      title: {
        type: "string"
      },
      descr: {
        type: "string"
      },
      price: {
        type: "string"
      }
    }
}
}