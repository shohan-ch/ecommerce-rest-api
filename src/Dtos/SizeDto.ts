import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";
import { IsExist } from "../Utils/decorators/IsExist";
import { Size } from "../Models/Size";

export class CreateSizeDto {
  @IsExist(Size, "name", {
    message: "Name already exist",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  status: number;
}

export class UpdateSizeDto extends CreateSizeDto {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  id: number;
}
