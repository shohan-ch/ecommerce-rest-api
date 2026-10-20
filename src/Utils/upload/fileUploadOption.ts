import multer, { MulterError, Options } from "multer";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { BadRequestError, NotFoundError } from "routing-controllers";

type OptionsType = {
  directoryPath: string;
  fileType?: "image" | undefined;
  isCreateSubDirectory?: boolean;
  maxFileSize?: number;
};

export const fileUploadOptions = (options: OptionsType): Options => {
  const {
    directoryPath,
    fileType = undefined,
    isCreateSubDirectory = false,
    maxFileSize,
  } = options;

  return {
    storage: multer.diskStorage({
      destination: (_req, file, cb) => {
        // console.log(file, "f");
        let directory = path.join(
          __dirname,
          "../../../public/uploads",
          directoryPath,
          isCreateSubDirectory ? file.fieldname : "",
        );
        if (!existsSync(directory)) {
          mkdirSync(directory, { recursive: true });
        }
        cb(null, directory);
      },

      filename: (_req, file, cb) => {
        // console.log(file, "ff");
        let extension = file.mimetype.split("/")[1];
        let fileName = Date.now() + file.fieldname + "." + extension;
        cb(null, fileName);
      },
    }),
    limits: {
      fileSize: maxFileSize ? 1024 * 1024 * maxFileSize : undefined, // max 1mb default allow to upload
    },
    fileFilter: (req, file, cb) => {
      // console.log(file, "filefilter");
      let allowedTypes: string[] = [];
      if (fileType === "image") {
        allowedTypes = ["jpg", "jpeg"];
      }

      if (
        fileType !== undefined &&
        !allowedTypes.includes(file.mimetype.split("/")[1])
      ) {
        cb(new MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname));
      } else {
        cb(null, true);
      }
    },
  };
};
