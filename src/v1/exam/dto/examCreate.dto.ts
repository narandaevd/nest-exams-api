import { IsNotEmpty, IsDateString } from "class-validator";

export class ExamCreateDto {
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    @IsDateString()
    readonly startsAt: string;

    @IsNotEmpty()
    @IsDateString()
    readonly endsAt: string;
}