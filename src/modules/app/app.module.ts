import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config/dist';
import configurations from '../../configurations/index'
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/models/user.model';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    load: [configurations]
  }),
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      dialect: 'postgres',
      host: configService.get('db_host'),
      port: configService.get('db_port'),
      database: configService.get('db_user'),
      password: configService.get('db_password'),
      username: configService.get('db_user'),
      synchronize: true,
      autoLoadModels: true,
      models: [User]
    }),
  }),
    UserModule,
    AuthModule,
    TokenModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
