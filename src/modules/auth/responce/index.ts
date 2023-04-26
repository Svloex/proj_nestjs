import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class AuthUserResponce {
    @ApiProperty()
    @IsString()
    firstName: string

    @ApiProperty()
    @IsString()
    userName: string

    @ApiProperty()
    @IsString()
    email: string
    
    @ApiProperty()
    @IsString()
    password: string

    @ApiProperty()
    @IsString()
    token: string
}