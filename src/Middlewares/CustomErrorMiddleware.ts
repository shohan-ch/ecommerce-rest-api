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
    response: any,
    next: (err?: any) => any,
  ): void {
    console.log(error, "custom err middleware");
    // if (error instanceof MulterError) {
    //   return response.status(400).json({
    //     status: false,
    //     message: "Not valid file type",
    //   });
    // }
    next(error);
  }
}
