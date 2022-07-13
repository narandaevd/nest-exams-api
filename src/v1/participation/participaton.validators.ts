import { ConflictException, ForbiddenException, NotAcceptableException } from "@nestjs/common";
import { BaseValidator } from "src/baseClasses/validator/baseValidator";
import { NativeDateAnalyzer, BaseDateAnalyzer } from "src/utils/dateAnalyzer";
import { Exam } from "src/v1/exam/exam.entity";

export class ExistableExamValidator extends BaseValidator {
    override async check(opt: any): Promise<void> {
        if (!opt?.examService || !opt?.parDto?.examId)
            throw new NotAcceptableException('not acceptable data');
        try {
            await opt.examService.getExamById(opt.parDto.examId);
        } catch (e: any) {
            throw e;
        }
        if (this._nextValidator !== null)
            return this._nextValidator.check(opt);
    }
}
export class SameExamParticipationValidator extends BaseValidator {
    override async check(opt: any): Promise<void> {
        if (!opt.parService || !opt.parDto?.registrationNumber || !opt.parDto?.examId)
            throw new NotAcceptableException('not acceptable data');
        try {
            let par = await opt.parService.getParticipation({
                where: { 
                    registrationNumber: opt.parDto.registrationNumber,
                    examId: opt.parDto.examId
                }
            });
            if (par)
                throw new ConflictException('User tried participate at exam again');
        } catch (e: any) {
            if (e instanceof ConflictException)
                throw e;
        }
        if (this._nextValidator !== null)
            return this._nextValidator.check(opt);
    }
}

export class IncorrectBeginningTimeValidator extends BaseValidator {
    override async check(opt: any): Promise<void> {
        if (!opt.parService || !opt.parDto?.examId || !opt.examService)
            throw new NotAcceptableException('not acceptable data');
        let exam: Exam = null;
        try {
            exam = await opt.examService.getExamById(opt.parDto.examId);
        } catch (e: any) {
            throw e;
        }
        const analyzer: BaseDateAnalyzer = new NativeDateAnalyzer();
        // const dateNow: string = Date.now().toLocaleString();
        const dateNow: string = '2018-08-06T21:10:24.577Z';// testData
        if (analyzer.less(dateNow, exam.startsAt))
            throw new ForbiddenException('Exam wasn\'t begun');
        if (analyzer.more(dateNow, exam.endsAt))
            throw new ForbiddenException('Exam is passed');
        if (this._nextValidator !== null)
            return this._nextValidator.check(opt);
    }
}
