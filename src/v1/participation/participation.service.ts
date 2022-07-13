import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participation } from './participation.entity';
import { Repository, FindOneOptions } from 'typeorm';
import { ExamService } from '../exam/exam.service';
import { ParticipateDto } from './dto/participate.dto';
import { BaseValidator } from 'src/baseClasses/validator/baseValidator';
import { 
    SameExamParticipationValidator,
    ExistableExamValidator, 
    IncorrectBeginningTimeValidator
} from './participaton.validators';

interface IParticipationService {
    participate(dto: ParticipateDto): Promise<Participation>;
    getParticipation(options: FindOneOptions<Participation>): Promise<Participation>;
}

abstract class BaseParticipationCreator {
    protected _repo: Repository<Participation>;

    constructor(repo: Repository<Participation>) { this._repo = repo; }
    abstract create(
        name: string,
        number: string,
        examId: number
    ): Participation;
}

class ParticipationCreator extends BaseParticipationCreator {
    constructor(repo: Repository<Participation>) { super(repo); }

    create(name: string, number: string, examId: number): Participation {
        let participation: Participation = this._repo.create();
        participation.participantName = name;
        participation.registrationNumber = number;
        participation.examId = examId;
        return participation;
    }
}

@Injectable()
export class ParticipationService implements IParticipationService {
    constructor(
        @InjectRepository(Participation) private _parRepo: Repository<Participation>,
        private readonly _examService: ExamService
    ) {}
    async participate(dto: ParticipateDto): Promise<Participation> {
        let validator: BaseValidator = new ExistableExamValidator();
        validator.add([
            new SameExamParticipationValidator(),
            new IncorrectBeginningTimeValidator()
        ]);
        let env: any = {
            examService: this._examService,
            parService: this,
            parDto: dto,
        }
        await validator.check(env);

        const participation: Participation = new ParticipationCreator(this._parRepo).create(
            dto.participantName, 
            dto.registrationNumber, 
            dto.examId
        );
        return this._parRepo.save(participation);
    }
    async getParticipation(options: FindOneOptions<Participation>): Promise<Participation> {
        const par: Participation = await this._parRepo.findOne(options);
        if (par == null)
            throw new NotFoundException('Participation with this options wasn\'t founded');
        return par;
    }
}
