import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { BadRequestException } from '@nestjs/common';
import { AppError } from 'src/common/constants/errors';
import { CreateUserDto } from '../user/dto';
import { UserLoginDto } from './dto';
import * as bcrypt from 'bcrypt'
import { AuthUserResponce } from './responce';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService

    ) { }

    async registUsers(dto: CreateUserDto): Promise<CreateUserDto> {
        const exitUser = await this.userService.findUserByEmail(dto.email)

        if (exitUser) throw new BadRequestException(AppError.USER_EXIST)

        return this.userService.createUser(dto)
    }
    async loginUser(dto: UserLoginDto):Promise<any> {
        const exitUser = await this.userService.findUserByEmail(dto.email)

        if (!exitUser) throw new BadRequestException(AppError.USER_NOT_EXIST)

        const validatePassword = bcrypt.compare(dto.password, exitUser.password)

        if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA)

        // const userData = {
        //     name: exitUser.firstName,
        //     email: exitUser.email
        // }

        const user = await this.userService.publicUser(dto.email)

        const token = await this.tokenService.generateJwtToken(user)

        return { user, token }

    }
}
