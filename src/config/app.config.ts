export default () => ({
  database: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT ?? '3306', 10),
    user: process.env.DB_USER,
  },
  port: parseInt(process.env.APP_PORT ?? '3000', 10),
});
