import path = require("node:path");
import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASS || "",
  database: process.env.DB_DATABASE,
  entities: [path.join(process.cwd(), "src/Models/**/*{.js,.ts}")],
  synchronize: true,
});

export { dataSource };
