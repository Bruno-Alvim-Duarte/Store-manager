const { productsModel } = require('../../models');

module.exports = async (arrayOfProducts) => {
    const productsFound = arrayOfProducts.map(async (sale) => {
    const product = await productsModel.getById(+sale.productId);
    if (!product) return false;
    return true;
  });

  const productsFoundSolved = await Promise.all(productsFound);
  console.log(productsFoundSolved);

  if (productsFoundSolved.some((product) => !product)) {
    return false;
  }

  return true;
};