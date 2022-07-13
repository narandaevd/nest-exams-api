import { IsNotEmpty, IsNumber } from 'class-validator';

export class ParticipateDto {
    @IsNotEmpty()
    readonly participantName: string;

    @IsNotEmpty()
    readonly registrationNumber: string;

    @IsNumber()
    readonly examId: number;
}