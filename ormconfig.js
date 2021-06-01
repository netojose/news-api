const {DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME} = process.env;

module.exports = {
  name: "default",
  type: "mysql",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  migrationsTableName: "migrations",
  migrations: [`src/migrations/*.{ts,js}`],
  cli: {
    migrationsDir: `src/migrations`,
    entitiesDir: `src/entities`
  }
};
