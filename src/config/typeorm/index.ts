const {DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME} = process.env;
import {ConnectionOptions} from "typeorm";

const defaultConfig: ConnectionOptions = {
  name: "default",
  type: "mysql",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  entities: ["${rootDir}/entities/**/*.{js,ts}"],
  migrations: ["${rootDir}/migration/**/*.{js,ts}"]
};

export default [defaultConfig];
