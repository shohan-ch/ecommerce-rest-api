import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";
import { IsExist } from "../Utils/decorators/IsExist";
import { Category } from "../Models/Category";

export class CreateCategoryDto {
  @IsExist(Category, "name", {
    message: "Name already exist",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  status: number;
}

export class UpdateCategoryDto extends CreateCategoryDto {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  id: number;
}
