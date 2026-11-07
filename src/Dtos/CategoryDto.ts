import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Category } from "../Models/Category";
import { IsExist } from "../Utils/decorators/IsExist";

export class CreateCategoryDto {
  @IsExist(Category, "name", {
    message: "Name already exist",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  status: string;
}

export class UpdateCategoryDto extends CreateCategoryDto {
  @IsNotEmpty()
  // @IsPositive()
  // @IsNumber()
  id: number;
}
