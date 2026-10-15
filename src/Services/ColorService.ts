import { Service } from "typedi";
import { InjectRepository } from "../Utils/decorators/InjectRepository";
import { Color } from "../Models/Color";
import { Repository } from "typeorm";
import { CreateColorDto, UpdateColorDto } from "../Dtos/ColorDto";
import { NotFoundError } from "routing-controllers";

@Service()
export class ColorService {
  constructor(
    @InjectRepository(Color) private ColorRepository: Repository<Color>,
  ) {}

  async getAll() {
    return await this.ColorRepository.find({});
  }

  async getOneBy(fieldName: string, value: number | string) {
    return await this.ColorRepository.findOne({
      where: {
        [fieldName]: value,
      },
    });
  }

  async create(data: CreateColorDto) {
    let color = this.ColorRepository.create({ ...data });
    return await this.ColorRepository.save(color);
  }

  async update(paramId: number, data: UpdateColorDto) {
    const { id, ...rest } = data;
    let findById = await this.getOneBy("id", paramId);
    if (!findById) throw new NotFoundError("Color not found by id");
    return await this.ColorRepository.update({ id: paramId }, rest);
  }

  async delete(paramId: number) {
    return await this.ColorRepository.delete({ id: paramId });
  }
}
