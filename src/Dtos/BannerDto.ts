import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Banner } from "../Models/Banner";
import { IsExist } from "../Utils/decorators/IsExist";

export class CreateBannerDto {
  @IsExist(Banner, "title", {
    message: "Title already exist",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsOptional()
  @IsString()
  status: string;
}

export class UpdateBannerDto extends CreateBannerDto {
  @IsNotEmpty()
  id: number;
}
