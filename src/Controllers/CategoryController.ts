import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  UploadedFile,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import { CreateCategoryDto, UpdateCategoryDto } from "../Dtos/CategoryDto";
import { CategoryService } from "../Services/CategoryService";
import { fileUploadOptions } from "../Utils/upload/fileUploadOption";

@JsonController("/admin/categories")
@Service()
export class CategoryController {
  constructor(@Inject() private CategoryService: CategoryService) {}

  @Get("/")
  getAll() {
    return this.CategoryService.getAll();
  }

  // @UseBefore(
  //   multer(
  //     fileUploadOptions({
  //       directoryPath: "videos/products",
  //       fileType: "image",
  //       maxFileSize: 2,
  //     }),
  //   ).fields([
  //     { name: "video", maxCount: 2 },
  //     { name: "video2", maxCount: 4 },
  //   ]),
  // )
  @Post("/")
  create(
    @UploadedFile("image", {
      options: fileUploadOptions({
        directoryPath: "images/categories",
        maxFileSize: 1,
      }),
    })
    image: any,
    @Body()
    body: CreateCategoryDto,
  ) {
    return this.CategoryService.create(body, image);
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
