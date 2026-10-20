import { Request, Response } from "express";
import { MulterError } from "multer";
import { existsSync, unlinkSync } from "node:fs";
import {
  ExpressErrorMiddlewareInterface,
  HttpError,
  Middleware,
} from "routing-controllers";
import { Service } from "typedi";
import { fileValidationError } from "../helpers/fileValidationError";

@Service()
@Middleware({ type: "after" })
export class CustomErrorMiddleware implements ExpressErrorMiddlewareInterface {
  error(
    error: any,
    request: Request,
    response: Response,
    next: (err?: any) => any,
  ): void {
    let statusCode = 500;
    let errorResponse = error;
    if (error.code === 500) {
      error.response == error;
    }

    if (error instanceof MulterError) {
      console.warn("Multer Err=============", error);
      const multerErrorCodes = {
        LIMIT_FILE_SIZE: {
          isBigSize: "File size exceeds the limit.",
        },
        LIMIT_UNEXPECTED_FILE: {
          isMaximum: "File count exceeds the limit.",
        },
      } as const;
      errorResponse = {
        status: false,
        statusCode: 400,
        errors: [
          {
            property: error.field ?? request.files[0]?.fieldname,
            children: [],
            constraints: multerErrorCodes[error.code],
          },
        ],
      };
    }

    if (error instanceof HttpError) {
      let err = error as any;
      if (Object.hasOwn(err, "errors")) {
        console.warn("Class validator Err=============", error);
        // class validator errors
        statusCode = 400;
        errorResponse = {
          status: false,
          statusCode: statusCode,
          errors: err?.errors,
        };

        // remove files if exist in error
        if (request.file) {
          const file = request.file;
          unlinkSync(file.path);
        }

        if (request.files && (request.files?.length as number) > 0) {
          console.warn("files error===============", request.files);
          const files: any = request.files;
          files.forEach((f) => {
            if (existsSync(f.path)) unlinkSync(f.path);
          });
        }
      } else {
        console.warn("Routing controller Err=============", error);
        statusCode = err.httpCode;
        errorResponse = {
          status: false,
          statusCode,
          message: err.message,
        };
      }
    }

    response.status(statusCode).json(errorResponse);
    next(error);
  }
}
