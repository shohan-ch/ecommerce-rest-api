import { Service } from "typedi";
import { InjectRepository } from "../Utils/decorators/InjectRepository";
import { CreateUserDto, UpdateUserDto } from "../Dtos/UserDto";
import { User } from "../Models/User";
import { Repository } from "typeorm";
import { NotFoundError } from "routing-controllers";

@Service()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  getAll() {
    return this.userRepository.find();
  }

  async create(body: CreateUserDto) {
    let res = await this.userRepository.save(body);
    console.log("create", res);
    return res;
  }

  async update(paramId: number, body: UpdateUserDto) {
    const { id, ...data } = body;
    let isExist = await this.userRepository.findOneBy({ email: data.email });
    if (!isExist) throw new NotFoundError("Email is not found");

    return await this.userRepository.update(
      {
        id: paramId,
      },
      { ...data },
    );
  }
}
