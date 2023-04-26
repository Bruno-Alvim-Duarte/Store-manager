const productsMock = {
  type: null,
  message: [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  }
]
}

const productMock = {
  type: null,
  message: {
    "id": 5,
    "name": "Travesseiro do Bruno"
  }
};

const productNotFoundMock = {
  type: 'PRODUCT_NOT_FOUND',
  message: 'Product not found',
  statusCode: 404
}

module.exports = {
  productMock,
  productsMock,
  productNotFoundMock
}