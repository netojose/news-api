import {ConnectionOptions} from "typeorm";
const {DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, NODE_ENV} = process.env;

const commonConfig = {
  name: "default",
  logging: false,
  entities: ["${rootDir}/entities/**/*.{js,ts}"],
  migrations: ["${rootDir}/migration/**/*.{js,ts}"]
};

const defaultConfig: ConnectionOptions = {
  type: "mysql",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  ...commonConfig
};

const testConfig: ConnectionOptions = {
  type: "sqlite",
  database: ":memory:",
  synchronize: true,
  ...commonConfig
};

export default [NODE_ENV === "test" ? testConfig : defaultConfig];
