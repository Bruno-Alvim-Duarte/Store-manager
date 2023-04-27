const { salesModel } = require('../models');
const validateSalesFounded = require('./helpers/validateSalesFounded');

const create = async (arrayOfSales) => {
  const everyProductFounded = await validateSalesFounded(arrayOfSales);

  if (!everyProductFounded) {
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

const deleteSaleByID = async (id) => {
  const sale = await salesModel.getSaleByID(id);
  if (!sale) return { type: 'SALE_NOT_FOUND', message: 'Sale not found', statusCode: 404 };

  await salesModel.deleteSaleByID(id);
};

const updateSaleByID = async (id, arrayOfProducts) => {
  const sale = await salesModel.getSaleByID(id);
  if (!sale) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found', statusCode: 404 };
  }
  
  const everyProductFounded = await validateSalesFounded(arrayOfProducts);

  if (!everyProductFounded) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found', statusCode: 404 };
  }

  const saleUpdated = await salesModel.updateSaleByID(id, arrayOfProducts);
  return { type: null, message: saleUpdated };
};

module.exports = {
  create,
  getAll,
  getSaleWithProductsByID,
  deleteSaleByID,
  updateSaleByID,
};