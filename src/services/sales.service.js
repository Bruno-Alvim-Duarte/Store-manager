const { salesModel, productsModel } = require('../models');

const create = async (arrayOfSales) => {
  const productsFound = arrayOfSales.map(async (sale) => {
    const product = await productsModel.getById(+sale.productId);
    if (!product) return false;
    return true;
  });

  const productsFoundSolved = await Promise.all(productsFound);

  if (productsFoundSolved.some((product) => !product)) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found', statusCode: 404 };
  }

  const productsSold = await salesModel.create(arrayOfSales);

  return { type: null, message: productsSold };
};

module.exports = {
  create,
};