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
import { CreateBannerDto, UpdateBannerDto } from "../Dtos/BannerDto";
import { BannerService } from "../Services/BannerService";
import { fileUploadOptions } from "../Utils/upload/fileUploadOption";

@JsonController("/admin/banners")
@Service()
export class BannerController {
  constructor(@Inject() private BannerService: BannerService) {}

  @Get("/")
  getAll() {
    return this.BannerService.getAll();
  }

  @Post("/")
  create(
    @UploadedFile("image", {
      options: fileUploadOptions({
        directoryPath: "images/banners",
        maxFileSize: 1,
        fileType: "image",
      }),
    })
    image: any,
    @Body()
    body: CreateBannerDto,
  ) {
    return this.BannerService.create(body, image);
  }

  @Put("/:id")
  update(
    @UploadedFile("image", {
      options: fileUploadOptions({
        directoryPath: "images/banners",
        maxFileSize: 1,
        fileType: "image",
      }),
    })
    image: any,
    @Param("id")
    id: number,
    @Body() body: UpdateBannerDto,
  ) {
    return this.BannerService.update(id, body, image);
  }

  @Delete("/:id")
  delete(@Param("id") id: number) {
    return this.BannerService.delete(id);
  }

  @Post("/status-change")
  statusChange(@Body() body: { ids: number[]; status: string }) {
    return this.BannerService.statusChange(body);
  }
}
