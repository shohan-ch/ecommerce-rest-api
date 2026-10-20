import { BadRequestError } from "routing-controllers";

type ValidationProps = {
  property: string;
  message: string;
  constraint: string;
};

export const fileValidationError = (
  props: ValidationProps,
): BadRequestError => {
  let error = new BadRequestError();
  Object.assign(error, {
    status: false,
    statusCode: 400,
    errors: [
      {
        property: props.property,
        children: [],
        constraints: {
          [props.constraint]: props.message,
        },
      },
    ],
  });

  return error;
};
