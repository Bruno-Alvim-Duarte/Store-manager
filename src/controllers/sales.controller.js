const { salesService } = require('../services');

const create = async (req, res) => {
  const arrayOfSales = req.body;
  const sales = await salesService.create(arrayOfSales);
  if (sales.type) return res.status(sales.statusCode).json({ message: sales.message });
  return res.status(201).json(sales.message);
};

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  return res.status(200).json(sales.message);
};

const getSaleWithProductsByID = async (req, res) => {
  const { id } = req.params;
  const salesWithProducts = await salesService.getSaleWithProductsByID(+id);
  if (salesWithProducts.type) {
    return res.status(salesWithProducts.statusCode).json({ message: salesWithProducts.message });
  }
  return res.status(200).json(salesWithProducts.message);
};

module.exports = {
  create,
  getAll,
  getSaleWithProductsByID,
};