import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async create(createUserDto: CreateUserDto) {
		try {
			if(createUserDto.password)
				createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);

			const user = new this.userModel(createUserDto);
			return await user.save();
		} catch (erro) {
			throw new HttpException('Erro ao cadastrar registro', HttpStatus.BAD_REQUEST);
		}
	}

	async findAll() {
		return await this.userModel.find()
			.select('name')
			.select('username')
			.select('role');
	}

	async findOne(id: string) {
		return await this.userModel.findById(id)
			.select('name')
			.select('username')
			.select('role');;
	}

	async findUsername(username: string) {
		return await this.userModel.findOne({
			'username': username
		});
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		return await this.userModel.findByIdAndUpdate(
			{
				_id: id,
			},
			{
				$set: updateUserDto,
			},
			{
				new: true,
			}
		);
	}

	async remove(id: string) {
		try {
			const remove = await this.userModel.deleteOne(
				{
				_id: id,
				}
			).exec();

			if (remove.deletedCount == 0)
				throw new HttpException('Nenhum registro deletado', HttpStatus.NOT_MODIFIED);

			return remove;
		} catch (erro) {
			throw new HttpException('Erro ao deletar registro', HttpStatus.BAD_REQUEST);
		}
	}
}
