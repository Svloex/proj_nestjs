import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async generateJwtToken(userData) {
        const payload = { userData }

        return this.jwtService.sign(payload, {
            secret: this.configService.get('secret_jwt'),
            expiresIn: this.configService.get('expire_jwt')
        })
    }
}