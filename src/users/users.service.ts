import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import axios from 'axios';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: number) {
    const uniqueid = await axios.get(`https://reqres.in/api/users/${id}`);
    return uniqueid.data.data;
  }

  async findAvatar(id: string) {
    const user = await this.userModel.findById(id);
    const encoded = Buffer.from(user.avatar, 'utf8').toString('base64');
    return JSON.stringify(encoded);
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
