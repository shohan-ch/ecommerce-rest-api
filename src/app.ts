import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import path = require("node:path");
useContainer(Container);

const rcOptions = {
  controllers: [path.join(process.cwd(), "src/Controllers/*.{js,ts}")],
  validation: true,
};

const app = createExpressServer(rcOptions);

export default app;
