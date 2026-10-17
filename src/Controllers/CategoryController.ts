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
import { CreateCategoryDto, UpdateCategoryDto } from "../Dtos/CategoryDto";
import { CategoryService } from "../Services/CategoryService";

@JsonController("/admin/categories")
@Service()
export class CategoryController {
  constructor(@Inject() private CategoryService: CategoryService) {}

  @Get("/")
  getAll() {
    return this.CategoryService.getAll();
  }

  @Post("/")
  create(@Body() body: CreateCategoryDto) {
    console.log(body, "category post");
    return this.CategoryService.create(body);
  }

  @Put("/:id")
  update(@Param("id") id: number, @Body() body: UpdateCategoryDto) {
    console.log(body, "category update");
    return this.CategoryService.update(id, body);
  }

  @Delete("/:id")
  delete(@Param("id") id: number) {
    return this.CategoryService.delete(id);
  }

  @Post("/status-change")
  statusChange(@Body() body: { ids: number[]; status: number }) {
    return this.CategoryService.statusChange(body);
  }
}
