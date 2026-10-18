import multer, { MulterError, Options } from "multer";
import path from "node:path";
import { BadRequestError, NotFoundError } from "routing-controllers";

export const uploadFileOption = (filePath: string): Options => {
  return {
    storage: multer.diskStorage({
      destination: path.join(__dirname, "../../../public/uploads", filePath),
      filename: (_req, file, cb) => {
        let extension = file.mimetype.split("/")[1];
        let fileName = Date.now() + "." + extension;
        cb(null, fileName);
      },
    }),
    limits: {
      fileSize: 1024 * 512, // 0.5 MB
    },
    fileFilter: (req, file, cb) => {
      let allowedTypes = ["jpg", "jpeg"];

      console.log(file, "file filter");
      if (!allowedTypes.includes(file.mimetype.split("/")[1])) {
        cb(new MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname));
      } else {
        cb(null, true);
      }
    },
  };
};
