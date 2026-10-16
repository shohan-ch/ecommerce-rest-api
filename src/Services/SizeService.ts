import { Service } from "typedi";
import { InjectRepository } from "../Utils/decorators/InjectRepository";
import { Size } from "../Models/Size";
import { Repository } from "typeorm";
import { CreateSizeDto, UpdateSizeDto } from "../Dtos/SizeDto";
import { NotFoundError } from "routing-controllers";

@Service()
export class SizeService {
  constructor(
    @InjectRepository(Size) private SizeRepository: Repository<Size>,
  ) {}

  async getAll() {
    return await this.SizeRepository.find({});
  }

  async getOneBy(fieldName: string, value: number | string) {
    return await this.SizeRepository.findOne({
      where: {
        [fieldName]: value,
      },
    });
  }

  async create(data: CreateSizeDto) {
    let size = this.SizeRepository.create({ ...data });
    return await this.SizeRepository.save(size);
  }

  async update(paramId: number, data: UpdateSizeDto) {
    const { id, ...rest } = data;
    let findById = await this.getOneBy("id", paramId);
    if (!findById) throw new NotFoundError("Size not found by id");
    return await this.SizeRepository.update({ id: paramId }, rest);
  }

  async delete(paramId: number) {
    return await this.SizeRepository.delete({ id: paramId });
  }
}
