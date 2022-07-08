import { DynamicModule } from "@nestjs/common"
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from '../v1/exam/exam.entity';
import { Participation } from '../v1/participation/participation.entity';
import { Configation } from './config';

let OrmModules: Array<DynamicModule> = [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: Configation.consts().DB_HOST,
        port: Configation.consts().DB_PORT,
        username: Configation.consts().DB_USERNAME,
        password: Configation.consts().DB_PASSWORD,
        database: Configation.consts().DB_NAME,
        entities: [
            Exam, 
            Participation
        ],
        synchronize: true
    })
]

export default OrmModules;