import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Exam } from './exam.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { ExamUpdateDto } from './dto/examUpdate.dto';
import { ExamCreateDto } from './dto/examCreate.dto';
import { QueryPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseValidator } from 'src/baseClasses/validator/baseValidator';
import { InterceptingTimeValidator, SameNameValidator } from './exam.validators';
import { Participation } from '../participation/participation.entity';

abstract class BaseExamCreator {
    protected _repo: Repository<Exam>;

    constructor(repo: Repository<Exam>) { this._repo = repo; }
    abstract create(title: string, startsAt: string, endsAt: string): Exam;
}

class ExamCreator extends BaseExamCreator {
    constructor(repo: Repository<Exam>) { super(repo); }
    create(title: string, startsAt: string, endsAt: string): Exam {
        let exam: Exam = this._repo.create();
        exam.title = title;
        exam.startsAt = startsAt;
        exam.endsAt = endsAt;
        return exam;
    }
}

interface IExamService {
    getAllExams(): Promise<Exam[]>;
    getExamById(id: number): Promise<Exam>;
    deleteExamById(id: number): Promise<Exam>;
    addExam(dto: ExamCreateDto): Promise<Exam>;
    patchExamById(id: number, dto: ExamUpdateDto): Promise<Exam>;
    findExamByOptions(opt: FindOneOptions<Exam>): Promise<Exam>;
}

@Injectable()
export class ExamService implements IExamService {
    constructor(
        @InjectRepository(Exam) private _repo: Repository<Exam>,
        @InjectRepository(Participation) private _parRepo: Repository<Participation>
    ) {}
    
    getAllExams(): Promise<Exam[]> {
        return this._repo.find();
    }
    async addExam(dto: ExamCreateDto): Promise<Exam> {
        const validator: BaseValidator = new SameNameValidator();
        validator.addValidators([
            new InterceptingTimeValidator()
        ]);
        const options: any = {
            service: this,
            dto: dto
        };
        await validator.check(options);

        const exam: Exam = new ExamCreator(this._repo).create(
            dto.title, 
            dto.startsAt, 
            dto.endsAt
        );
        return this._repo.save(exam);
    }
    async getExamById(id: number): Promise<Exam> {
        const options: FindOneOptions<Exam> = {where: {id}};
        const exam: Exam = await this._repo.findOne(options);
        if (exam === null)
            throw new NotFoundException('Exam with this id not founded');
        return exam;            
    }
    async patchExamById(id: number, dto: ExamUpdateDto): Promise<Exam> {
        const findOptions: FindOptionsWhere<Exam> = {id};
        const updateOptions: QueryPartialEntity<Exam>  = {...dto};
        const exam: Exam = await this.getExamById(id);
        this._repo.update(findOptions, updateOptions);
        return exam;
    }
    async deleteExamById(id: number): Promise<Exam> {
        const foundedExam: Exam = await this.getExamById(id);
        const pars: Participation[] = await this._parRepo.find({
            where: {examId: id}
        });
        await this._parRepo.remove(pars);
        let deletedExam: Exam = await this._repo.remove(foundedExam);
        return deletedExam;
    }
    async findExamByOptions(opt: FindOneOptions<Exam>): Promise<Exam> {
        const exam: Exam = await this._repo.findOne(opt);
        if (exam == null)
            throw new NotFoundException('Exam with this options wasn\'t founded');
        return exam;
    }
}
