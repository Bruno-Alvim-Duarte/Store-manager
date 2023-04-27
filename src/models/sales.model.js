const camelize = require('camelize');
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

const getAll = async () => {
  const [salesProducts] = await connection.execute('SELECT * FROM sales_products');
  const salesPromise = salesProducts.map(async (sale) => {
    const [[date]] = await connection.execute('SELECT date FROM sales WHERE id = ?',
      [sale.sale_id]);
    return {
      ...camelize(sale),
      ...date,
    };
  });

  const sales = await Promise.all(salesPromise);

  return sales;
};

const getSaleWithProductsByID = async (id) => {
  const [result] = await connection.execute(`SELECT
   sp.product_id, sp.quantity, s.date FROM StoreManager.sales_products sp
    INNER JOIN StoreManager.sales AS s
    ON s.id = sp.sale_id
    WHERE sp.sale_id = ?;`, [id]);
  
  return camelize(result);
};

const getSaleByID = async (id) => {
  const [[result]] = await connection.execute('SELECT * FROM sales WHERE id = ?', [id]);
  return result;
};

const deleteSaleByID = async (id) => {
  await connection.execute(
    'DELETE FROM sales_products WHERE sale_id = ?', [id],
  );
  const [{ affectedRows }] = await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
  return affectedRows;
};

const updateSaleByID = async (id, arrayOfProducts) => {
  const productsUpdatePromise = arrayOfProducts.map(async (sale) => {
    await connection.execute(
      'UPDATE sales_products SET quantity = ? WHERE product_id = ? AND sale_id = ?',
      [sale.quantity, sale.productId, id],
);
    return sale;
  });

  const productsUpdated = await Promise.all(productsUpdatePromise);

  return { saleId: id, itemsUpdated: productsUpdated };
};

module.exports = {
  create,
  getAll,
  getSaleWithProductsByID,
  getSaleByID,
  deleteSaleByID,
  updateSaleByID,
};