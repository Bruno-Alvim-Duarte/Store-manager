const productsMock = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  }
];

const productsSearchMock = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  }
];

const productMock = {
  "id": 5,
  "name": "Travesseiro do Bruno"
}

const expectedUpdateProductSucessMock = {
  type: null,
  message: {
    id: 2,
    name: 'Travesseiro'
  }
};

const expectedUpdateProductUnsucessMock = {
  type: 'PRODUCT_NOT_FOUND',
  message: 'Product not found',
  statusCode: 404,
}

module.exports = {
  productMock,
  productsMock,
  productsSearchMock,
  expectedUpdateProductSucessMock,
  expectedUpdateProductUnsucessMock
}