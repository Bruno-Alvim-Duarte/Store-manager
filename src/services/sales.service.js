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

const getAll = async () => {
  const sales = await salesModel.getAll();
  return { type: null, message: sales };
};

const getSaleWithProductsByID = async (id) => {
  const sale = await salesModel.getSaleByID(id);
  if (!sale) return { type: 'SALE_NOT_FOUND', message: 'Sale not found', statusCode: 404 };

  const salesWithProducts = await salesModel.getSaleWithProductsByID(id);
  return { type: null, message: salesWithProducts };
};

module.exports = {
  create,
  getAll,
  getSaleWithProductsByID,
};