import { Response } from "express";
import { MulterError } from "multer";
import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from "routing-controllers";
import { Service } from "typedi";

@Service()
@Middleware({ type: "after" })
export class CustomErrorMiddleware implements ExpressErrorMiddlewareInterface {
  error(
    error: any,
    request: any,
    response: Response,
    next: (err?: any) => any,
  ): void {
    console.log("custom err middleware", error);
    // if (error instanceof MulterError) {
    //   return response.status(400).json({
    //     status: false,
    //     message: "Not valid file type",
    //   });
    // }

    response.status(400).json({
      status: false,
      meesage: error.message,
    });
    next(error);
  }
}
