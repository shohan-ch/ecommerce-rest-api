import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
  Put,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import { CreateColorDto, UpdateColorDto } from "../Dtos/ColorDto";
import { ColorService } from "./../Services/ColorService";

@JsonController("/admin/colors")
@Service()
export class ColorControlle {
  constructor(@Inject() private ColorService: ColorService) {}

  @Get("/")
  getAll() {
    return this.ColorService.getAll();
  }

  @Post("/")
  create(@Body() body: CreateColorDto) {
    console.log(body, "color post");
    return this.ColorService.create(body);
  }

  @Put("/:id")
  update(@Param("id") id: number, @Body() body: UpdateColorDto) {
    console.log(body, "color update");
    return this.ColorService.update(id, body);
  }

  @Delete("/:id")
  delete(@Param("id") id: number) {
    return this.ColorService.delete(id);
  }
}
