const connection = require('../connection');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};

const getById = async (id) => {
  const [[result]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return result;
};

const getBySearch = async (search) => {
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE name LIKE(?)', [search],
);
  return result;
};

const create = async (name) => {
  const [{ insertId }] = await connection.execute('INSERT INTO products (name) VALUE (?)', [name]);
  return insertId;
};

const update = async (name, id) => {
  const [{ affectedRows }] = await connection.execute('UPDATE products SET name = ? WHERE id = ?;',
    [name, id]);
  return affectedRows;
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute('DELETE FROM products WHERE id = ?', [id]);
  return affectedRows;
};

module.exports = {
  getAll,
  getById,
  getBySearch,
  create,
  update,
  deleteProduct,
};