const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.getAll();
  return { type: null, message: products };
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found', statusCode: 404 };
  }
  return { type: null, message: product };
};

const create = async (name) => {
  const insertId = await productsModel.create(name);
  return { type: null, message: { id: insertId, name } };
};

module.exports = {
  getAll,
  getById,
  create,
};