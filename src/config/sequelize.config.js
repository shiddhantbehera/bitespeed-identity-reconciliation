import { config } from 'dotenv';
config();

const sequelizeConfig = {
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  logging: false,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER,
  dialectOptions: {},
};

export default sequelizeConfig;
