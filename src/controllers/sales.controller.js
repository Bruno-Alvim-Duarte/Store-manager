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

const deleteSaleByID = async (req, res) => {
  const { id } = req.params;
  const error = await salesService.deleteSaleByID(+id);
  if (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  return res.status(204).end();
};

const updateSaleByID = async (req, res) => {
  const { id } = req.params;
  const arrayOfProducts = req.body;
  const saleUpdated = await salesService.updateSaleByID(+id, arrayOfProducts);
  if (saleUpdated.type) {
    return res.status(saleUpdated.statusCode).json({ message: saleUpdated.message });
  }
  return res.status(200).json(saleUpdated.message);
};

module.exports = {
  create,
  getAll,
  getSaleWithProductsByID,
  deleteSaleByID,
  updateSaleByID,
};