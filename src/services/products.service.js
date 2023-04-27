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

const update = async (name, id) => {
  const product = await productsModel.getById(id);
  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found', statusCode: 404 };
  }
  await productsModel.update(name, id);
  
  return { type: null, message: { id, name } };
};

const deleteProduct = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found', statusCode: 404 };
  }
  await productsModel.deleteProduct(id);
  return { type: null, message: '' };
};

const getBySearch = async (name) => {
  if (!name) {
    const products = await productsModel.getAll();
    return { type: null, message: products };
  }
  const productsWithSearch = await productsModel.getBySearch(`${name}%`);
  return { type: null, message: productsWithSearch };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
  getBySearch,
};