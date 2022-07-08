import { NotAcceptableException } from "@nestjs/common";
import { BaseValidator } from "src/baseClasses/validator/baseValidator";
import { Interval, NativeDateAnalyzer } from "src/utils/dateAnalyzer";

export class SameNameValidator extends BaseValidator {
    override async check(opt: any): Promise<void> {
        if (!opt.service || !opt.dto)
            throw new NotAcceptableException('not acceptable data');
        try {
            await opt.service.findExamByOptions({where: {title: opt.dto.title}});
            throw new NotAcceptableException('Not acceptable title for exam');
        } catch (e: any) {
            if (e instanceof NotAcceptableException)
                throw e;
        }
        if (this._nextValidator !== null)
            return this._nextValidator.check(opt);
    }
}

export class InterceptingTimeValidator extends BaseValidator {
    override async check(opt: any): Promise<void> {
        const allExams = await opt.service.getAllExams();
        const analyzer: NativeDateAnalyzer = new NativeDateAnalyzer();
        const flagOfInterception: boolean = allExams.some((exam) => {
            const curExamInterval: Interval = {
                begin: exam.startsAt,
                end: exam.endsAt
            };
            const examInterval: Interval = {
                begin: opt.dto.startsAt,
                end: opt.dto.endsAt
            }
            return analyzer.isIntercepting(examInterval, curExamInterval);
        })
        if (flagOfInterception)
            throw new NotAcceptableException('Exams shouldn\'t intercept by time');
        if (this._nextValidator !== null)
            return this._nextValidator.check(opt);
    }
}