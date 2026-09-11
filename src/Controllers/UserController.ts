import "reflect-metadata";
import {
  Body,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import { UserService } from "../Services/UserService";
import { CreateUserDto, UpdateUserDto } from "../Dtos/UserDto";

@JsonController("/users")
@Service()
export class UserController {
  constructor(public userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Patch("/:id")
  update(@Param("id") id: number, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }
}
