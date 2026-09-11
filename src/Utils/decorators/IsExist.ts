import {
  type ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from "class-validator";
import { Not, Repository } from "typeorm";
import { dataSource } from "../../DB/dataSource";

export function IsExist<T>(
  modal: any,
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isExist",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

          console.log(args);
          let updateId = (args.object as any)?.id;
          let whereCondition: any = {
            [relatedPropertyName]: relatedValue,
          };

          whereCondition = updateId
            ? { ...whereCondition, id: Not(updateId) }
            : { ...whereCondition };

          console.log(whereCondition, "where condir");
          const isExist = await dataSource.getRepository(modal).findOne({
            where: whereCondition,
          });

          console.log(isExist, "exist");

          if (isExist) return false;
          return true;
        },
      },
    });
  };
}
