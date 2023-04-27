module.exports = (req, _res, next) => {
  const arrayOfSales = req.body;

  if (arrayOfSales.some((sale) => !sale.productId)) {
    return next({ statusCode: 400, message: '"productId" is required' });
  }

  if (arrayOfSales.some((sale) => sale.quantity === undefined || sale.quantity === null)) {
    return next({ statusCode: 400, message: '"quantity" is required' });
  }

  if (arrayOfSales.some((sale) => sale.quantity < 1)) {
    return next({ statusCode: 422, message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};