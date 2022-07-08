import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { V1Module } from './v1/v1.module';
import OrmModules from './utils/ormModules';
import { RouterModule, Routes } from '@nestjs/core';
import { ConfigModule, registerAs } from '@nestjs/config';
import { Exam } from './v1/exam/exam.entity';
import { Participation } from './v1/participation/participation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const RoutersOptions: Routes = [
  {
    path: '/v1',
    module: V1Module
  },
];

export class Configation {
  static consts() {
    const pathEnvFile = path.join(__dirname, '../.env');
    const rawConfig = dotenv.parse(fs.readFileSync(pathEnvFile));
    return {
      ...rawConfig,
      PORT: parseInt(rawConfig.PORT),
      DB_PORT: parseInt(rawConfig.DB_PORT),
    }
  }
}

@Module({
  imports: [
    ...OrmModules,
    RouterModule.register(RoutersOptions),
    V1Module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
