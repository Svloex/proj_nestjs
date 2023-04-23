import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt/dist';

@Module({
  imports: [],
  providers: [TokenService, JwtService],
  exports: [TokenService]
})
export class TokenModule { }
