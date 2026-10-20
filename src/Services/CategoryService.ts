import { Service } from "typedi";
import { InjectRepository } from "../Utils/decorators/InjectRepository";
import { Category } from "../Models/Category";
import { In, Repository } from "typeorm";
import { CreateCategoryDto, UpdateCategoryDto } from "../Dtos/CategoryDto";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { mkdir } from "node:fs";
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
        property: image.fieldname,
        constraint: "isNotEmpty",
        message: "Image should not be empty.",
      });
    }
    let category = this.CategoryRepository.create({
      ...data,
      imagePath: image.path,
    });
    return await this.CategoryRepository.save(category);
  }

  async update(paramId: number, data: UpdateCategoryDto) {
    const { id, ...rest } = data;
    let findById = await this.getOneBy("id", paramId);
    if (!findById) throw new NotFoundError("Category not found by id");
    return await this.CategoryRepository.update({ id: paramId }, rest);
  }

  async delete(paramId: number) {
    return await this.CategoryRepository.delete({ id: paramId });
  }

  async statusChange(data: { ids: number[]; status: number }) {
    return await this.CategoryRepository.update(
      { id: In(data.ids) },
      { status: data.status },
    );
  }
}
