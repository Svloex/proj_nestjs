import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { users } from 'src/mocks';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto';
import { Watchlist } from '../watchlist/models/watchlist.model';
// import { AppError } from 'src/common/constants/errors';
// import { BadRequestException } from '@nestjs/common';


@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User) { }
    async hashPassword(password: string): Promise<string> {
        try {
            return bcrypt.hash(password, 10)
        } catch (err) {
            throw new Error(err)
        }

    }

    async findUserByEmail(email: string): Promise<User> {
        try {
            return await this.userRepository.findOne({ where: { email } })
        } catch (err) {
            throw new Error(err)
        }

    }

    async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
        try {
            dto.password = await this.hashPassword(dto.password)

            await this.userRepository.create({
                firstName: dto.firstName,
                userName: dto.userName,
                email: dto.email,
                password: dto.password
            })

            return dto
        } catch (err) {
            throw new Error(err)
        }

    }

    // async publicUser(email: string) {
    //     return this.userRepository.findOne({
    //         where: { email },
    //         attributes: { exclude: ['password}'] },
    //         include: {
    //             model: Watchlist,
    //             required: false
    //         }
    //     })
    // }
    async publicUser(email: string): Promise<User> {
        try {
            return await this.userRepository.findOne({
                where: { email },
                attributes: { exclude: ['password'] },
                include: {
                    model: Watchlist,
                    required: false
                }
            })
        } catch (err) {
            throw new Error(err)
        }

    }

    async updateUser(email: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
        try {
            await this.userRepository.update(dto, {
                where: { email }
            })

            return dto
        } catch (err) {
            throw new Error(err)
        }

    }
    async deleteUser(email: string): Promise<boolean> {
        try {
            await this.userRepository.destroy({
                where: { email }
            })

            return true
        } catch (err) {
            throw new Error(err)
        }

    }
    // async getAllUsers() {
    //     return await this.userRepository.findAll()
    // }
}
