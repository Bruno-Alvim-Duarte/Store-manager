const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(200).json(products.message);
}; 

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(+id);
  if (product.type) return res.status(product.statusCode).json({ message: product.message });
  return res.status(200).json(product.message);
};

const create = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productsService.create(name);
  return res.status(201).json(newProduct.message);
};

const update = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const productUpdated = await productsService.update(name, +id);
  if (productUpdated.type) {
    return res.status(productUpdated.statusCode).json({ message: productUpdated.message });
  }
  return res.status(200).json(productUpdated.message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const error = await productsService.deleteProduct(+id);
  if (error.type) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  return res.status(204).end();
};

const getBySearch = async (req, res) => {
  const { q } = req.query;
  const products = await productsService.getBySearch(q);
  return res.status(200).json(products.message);
};

module.exports = { getAll, getById, create, update, deleteProduct, getBySearch };