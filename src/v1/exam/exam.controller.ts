import { Controller, Delete, Get, HttpCode, Param, Patch, Post, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ExamService } from './exam.service';
import { Exam } from './exam.entity';
import { Body } from '@nestjs/common';
import { ExamCreateDto } from './dto/examCreate.dto';
import { ExamUpdateDto } from './dto/examUpdate.dto';

@Controller('exams')
export class ExamController {
    constructor(private readonly _service: ExamService) {}

    @Get('/')
    getAllExams(): Promise<Exam[]> {
        return this._service.getAllExams();
    }
    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    addExam(@Body() dto: ExamCreateDto): Promise<Exam> {
        return this._service.addExam(dto);
    }
    @Get('/:id')
    getExamById(@Param('id', ParseIntPipe) id: number): Promise<Exam> {
        return this._service.getExamById(id);
    }
    @Patch('/:id')
    patchExamById(@Param('id', ParseIntPipe) id: number, @Body() dto: ExamUpdateDto): Promise<Exam> {
        return this._service.patchExamById(id, dto);
    }
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteExamById(@Param('id', ParseIntPipe) id: number): Promise<Exam> {
        return this._service.deleteExamById(id);
    } 
}