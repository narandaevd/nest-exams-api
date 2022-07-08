import { Module } from '@nestjs/common';
import { ExamService } from './exam/exam.service';
import { ExamController } from './exam/exam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './exam/exam.entity';
import { Participation } from './participation/participation.entity';
import { ParticipationController } from './participation/participation.controller';
import { ParticipationService } from './participation/participation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exam, Participation]),
  ],
  providers: [ExamService, ParticipationService],
  controllers: [ExamController, ParticipationController]
})
export class V1Module {}
