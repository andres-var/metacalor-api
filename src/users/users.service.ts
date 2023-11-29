import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { BcryptAdapter } from 'src/common/adapters/bcrypt.adapter';

import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseQueryDto } from 'src/common/dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: PaginateModel<User>,
    private bcryptAdapter: BcryptAdapter,
  ) {}

  private readonly logger = new Logger(UsersService.name);

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new this.userModel({
        ...createUserDto,
        password: this.bcryptAdapter.hashSync(createUserDto.password),
      });

      await user.save();

      return user;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException({
        key: 'users',
        message: 'User not found',
      });
    }

    return user;
  }

  async findAll(baseQuery: BaseQueryDto<User>) {
    console.log(baseQuery.sort);
    const users = await this.userModel.paginate(
      {
        ...baseQuery?.filters,
      },
      {
        page: baseQuery.page,
        limit: baseQuery.limit,
        sort: baseQuery.sort,
      },
    );

    return users;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userModel.findByIdAndUpdate(
        id,
        { ...updateUserDto },
        { new: true },
      );

      return user;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async patchIsVerified(id: string): Promise<User> {
    try {
      await this.findOne(id);

      const user = await this.userModel.findByIdAndUpdate(
        id,
        { isAccountVerified: true },
        { new: true },
      );

      return user;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const user = await this.findOne(id);

      const isDeleted = await this.userModel.deleteOne({ _id: id });

      if (isDeleted.deletedCount === 0) {
        throw new ConflictException({
          key: 'users',
          message: 'User not deleted',
        });
      }

      return user;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async position(id: string) {
    const users = await this.userModel.find().sort({ score: -1 });

    const position = users.findIndex((user) => user.id === id);
    const user = users[position];

    return {
      position: position + 1,
      ...user.toJSON(),
    };
  }
}
