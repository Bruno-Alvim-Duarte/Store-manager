const connection = require('../connection');

const create = async (arrayOfSales) => {
  const date = new Date();
  const dateTime = `${date.toISOString().split('T')[0]} ${date.toTimeString().split(' ')[0]}`;
  const [{ insertId }] = await connection.execute('INSERT INTO sales (date) VALUES (?)',
    [dateTime]);

  const salesPromise = arrayOfSales.map(async (sale) => {
    await connection.execute(`INSERT INTO sales_products (sale_id, product_id, quantity)
     VALUES (?, ?, ?)`,
      [insertId, sale.productId, sale.quantity]);
    return sale;
  });

  const sales = await Promise.all(salesPromise);

  return { id: insertId, itemsSold: sales };
};

module.exports = { create };