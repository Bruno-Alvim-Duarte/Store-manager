const mysql2 = require('mysql2/promise');

const connection = mysql2.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: 3306,
  database: 'StoreManager',
});

module.exports = connection;