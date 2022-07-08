import { IsInt, IsString } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, Generated } from "typeorm";

namespace ParticipationNames {
    export const TABLE_NAME: string = "participations";
    export const ID: string = 'id';
    export const GUID: string = 'guid';
    export const PARTICIPANT_NAME: string = 'participant_name';
    export const REGISTRATION_NUMBER: string = 'registration_number';
    export const EXAM_ID: string = 'exam_id';
}

@Entity({name: ParticipationNames.TABLE_NAME})
export class Participation {
    @PrimaryGeneratedColumn({name: ParticipationNames.ID})
    @IsInt() 
    id: number;
    
    @Column({name: ParticipationNames.GUID})
    @Generated("uuid") 
    @IsString()
    guid: string;
    
    @Column({name: ParticipationNames.PARTICIPANT_NAME}) 
    @IsString()
    participantName: string;

    @Column({name: ParticipationNames.REGISTRATION_NUMBER}) 
    @IsString()
    registrationNumber: string;

    @Column({name: ParticipationNames.EXAM_ID}) 
    @IsInt()
    examId: number;
}
