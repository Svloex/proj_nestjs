import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config/dist';
import configurations from '../../configurations/index'
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configurations]
  }),
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      dialect: 'postqres',
      host: configService.get('db_host'),
      port: configService.get('db_port'),
      database: configService.get('db_database'),
      password: configService.get('db_password'),
      username: configService.get('db_user'),
      synchronise: true,
      autoLoadModels: true,
      models: []
    }),
  }),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
