import { Service } from "typedi";
import { InjectRepository } from "../Utils/decorators/InjectRepository";
import { Banner } from "../Models/Banner";
import { In, Repository } from "typeorm";
import { CreateBannerDto, UpdateBannerDto } from "../Dtos/BannerDto";
import { NotFoundError } from "routing-controllers";
import { unlinkSync } from "node:fs";
import path from "node:path";
import { fileValidationError } from "../helpers/fileValidationError";

@Service()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private BannerRepository: Repository<Banner>,
  ) {}

  async getAll() {
    return await this.BannerRepository.find({
      order: {
        id: "DESC",
      },
    });
  }

  async getOneBy(fieldName: string, value: number | string) {
    return await this.BannerRepository.findOne({
      where: {
        [fieldName]: value,
      },
    });
  }

  async create(data: CreateBannerDto, image: Express.Multer.File) {
    if (!image) {
      throw fileValidationError({
        property: "image",
        constraint: "isNotEmpty",
        message: "Image should not be empty.",
      });
    }

    const banner = this.BannerRepository.create({
      ...data,
      image: "/uploads/images/banners/" + image.filename,
    });
    return await this.BannerRepository.save(banner);
  }

  async update(
    paramId: number,
    data: UpdateBannerDto,
    image: Express.Multer.File,
  ) {
    const { id, ...rest } = data;
    const banner = await this.getOneBy("id", paramId);
    if (!banner) throw new NotFoundError("Banner not found by id");

    if (image && banner.image) {
      unlinkSync(path.join(__dirname, "../../public", banner.image));
    }

    const updateData = image
      ? {
          ...rest,
          image: "/uploads/images/banners/" + image.filename,
        }
      : { ...rest };

    return await this.BannerRepository.update({ id: paramId }, updateData);
  }

  async delete(paramId: number) {
    return await this.BannerRepository.delete({ id: paramId });
  }

  async statusChange(data: { ids: number[]; status: string }) {
    return await this.BannerRepository.update(
      { id: In(data.ids) },
      { status: data.status },
    );
  }
}
