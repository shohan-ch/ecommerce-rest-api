import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";
import { IsExist } from "../Utils/decorators/IsExist";
import { Color } from "../Models/Color";

export class CreateColorDto {
  @IsExist(Color, "name", {
    message: "Name already exist",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  colorCode: string;

  @IsOptional()
  @IsNumber()
  status: number;
}

export class UpdateColorDto extends CreateColorDto {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  id: number;
}
