import { IsNotEmpty, IsDateString } from "class-validator";

export class ExamUpdateDto {
    @IsNotEmpty()
    readonly title: string;

    @IsDateString()
    @IsNotEmpty()
    readonly startsAt: string;

    @IsDateString()
    @IsNotEmpty()
    readonly endsAt: string;
}