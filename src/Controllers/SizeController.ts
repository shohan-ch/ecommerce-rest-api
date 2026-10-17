import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import { CreateSizeDto, UpdateSizeDto } from "../Dtos/SizeDto";
import { SizeService } from "./../Services/SizeService";

@JsonController("/admin/sizes")
@Service()
export class SizeController {
  constructor(@Inject() private SizeService: SizeService) {}

  @Get("/")
  getAll() {
    return this.SizeService.getAll();
  }

  @Post("/")
  create(@Body() body: CreateSizeDto) {
    console.log(body, "size post");
    return this.SizeService.create(body);
  }

  @Put("/:id")
  update(@Param("id") id: number, @Body() body: UpdateSizeDto) {
    console.log(body, "size update");
    return this.SizeService.update(id, body);
  }

  @Delete("/:id")
  delete(@Param("id") id: number) {
    return this.SizeService.delete(id);
  }

  @Post("/status-change")
  statusChange(@Body() body: { ids: number[]; status: number }) {
    return this.SizeService.statusChange(body);
  }
}
