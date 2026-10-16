import "reflect-metadata";
import {
  createExpressServer,
  RoutingControllersOptions,
  useContainer,
} from "routing-controllers";
import { Container } from "typedi";
import path = require("node:path");
useContainer(Container);

const rcOptions: RoutingControllersOptions = {
  routePrefix: "api",
  controllers: [path.join(process.cwd(), "src/Controllers/*.{js,ts}")],
  validation: {
    validationError: {
      target: false,
      value: false,
    },
  },
};

const app = createExpressServer(rcOptions);

export default app;
