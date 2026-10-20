import "reflect-metadata";
import {
  createExpressServer,
  RoutingControllersOptions,
  useContainer,
} from "routing-controllers";
import { Container } from "typedi";
import path = require("node:path");
import { CustomErrorMiddleware } from "./Middlewares/CustomErrorMiddleware";
useContainer(Container);
Container.set(CustomErrorMiddleware, new CustomErrorMiddleware());

import express from "express";
const rcOptions: RoutingControllersOptions = {
  cors: true,
  defaultErrorHandler: false,
  routePrefix: "/api",
  controllers: [path.join(process.cwd(), "src/Controllers/*.{js,ts}")],
  validation: {
    validationError: {
      target: false,
      value: false,
    },
  },

  middlewares: [CustomErrorMiddleware],
  // middlewares: [path.join(process.cwd(), "src/Middlewares/*.{js,ts}")],
};

const app = createExpressServer(rcOptions);

app.use(express.static("/public/"));

export default app;
