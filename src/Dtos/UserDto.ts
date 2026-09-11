import { IsNotEmpty, IsString } from "class-validator";
import { IsExist } from "../Utils/decorators/IsExist";
import { User } from "../Models/User";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsExist(User, "email", { message: "Email is exist!" })
  @IsNotEmpty()
  @IsString()
  email: string;
}

export class UpdateUserDto extends CreateUserDto {
  @IsNotEmpty()
  id: number;
}
