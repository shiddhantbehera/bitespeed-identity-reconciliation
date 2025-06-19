const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'mysql',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  logging: false,
};
