import { Service } from "typedi";
import { InjectRepository } from "../Utils/decorators/InjectRepository";
import { Category } from "../Models/Category";
import { In, Repository } from "typeorm";
import { CreateCategoryDto, UpdateCategoryDto } from "../Dtos/CategoryDto";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { mkdir, unlinkSync } from "node:fs";
import path from "node:path";
import multer from "multer";
import { ValidationError } from "class-validator";
import { fileValidationError } from "../helpers/fileValidationError";

@Service()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private CategoryRepository: Repository<Category>,
  ) {}

  async getAll() {
    return await this.CategoryRepository.find({
      order: {
        id: "DESC",
      },
    });
  }

  async getOneBy(fieldName: string, value: number | string) {
    return await this.CategoryRepository.findOne({
      where: {
        [fieldName]: value,
      },
    });
  }

  async create(data: CreateCategoryDto, image: Express.Multer.File) {
    if (!image) {
      throw fileValidationError({
        property: "image",
        constraint: "isNotEmpty",
        message: "Image should not be empty.",
      });
    }
    let category = this.CategoryRepository.create({
      ...data,
      image: "/uploads/images/categories/" + image.filename,
    });
    return await this.CategoryRepository.save(category);
  }

  async update(
    paramId: number,
    data: UpdateCategoryDto,
    image: Express.Multer.File,
  ) {
    const { id, ...rest } = data;
    let category = await this.getOneBy("id", paramId);
    if (!category) throw new NotFoundError("Category not found by id");

    if (image && category.image) {
      unlinkSync(path.join(__dirname, "../../public", category.image));
    }

    let updateData = image
      ? {
          ...rest,
          image: "/uploads/images/categories/" + image.filename,
        }
      : { ...rest };

    return await this.CategoryRepository.update({ id: paramId }, updateData);
  }

  async delete(paramId: number) {
    return await this.CategoryRepository.delete({ id: paramId });
  }

  async statusChange(data: { ids: number[]; status: string }) {
    return await this.CategoryRepository.update(
      { id: In(data.ids) },
      { status: data.status },
    );
  }
}
