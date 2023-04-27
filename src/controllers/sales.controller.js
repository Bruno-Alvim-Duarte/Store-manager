const { salesService } = require('../services');

const create = async (req, res) => {
  const arrayOfSales = req.body;
  const sales = await salesService.create(arrayOfSales);
  if (sales.type) return res.status(sales.statusCode).json({ message: sales.message });
  return res.status(201).json(sales.message);
};

module.exports = {
  create,
};