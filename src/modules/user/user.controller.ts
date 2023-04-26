import { Body, Controller, Delete, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
//import { CreateUserDto } from './dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // @Post('create-user')
    // createUsers(@Body() dto: CreateUserDto) {
    //     console.log(dto)
    //     return this.userService.createUser(dto)
    // }

    @ApiTags('API')
    @ApiResponse({
        status: 200,
        type: UpdateUserDto
    })
    @UseGuards(JwtAuthGuard)
    @Patch()
    updateUser(@Body() updateDto: UpdateUserDto, @Req() request): Promise<UpdateUserDto> {
        const user = request.user
        return this.userService.updateUser(user.email, updateDto)

    }

    @ApiTags('API')
    @ApiResponse({
        status: 200
    })
    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteUser(@Req() request): Promise<boolean> {
        const user = request.user
        return this.userService.deleteUser(user.email)

    }
    // @ApiTags('API')
    // @ApiResponse({
    //     status: 200
    // })
    @UseGuards(JwtAuthGuard)
    @Get('all')
    getAllUsers(@Req() request){
        const user = request.user
        return this.userService.getAllUsers()

    }
}
