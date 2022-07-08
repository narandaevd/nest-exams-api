import { IsInt, IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, Generated } from "typeorm";

namespace ExamNames {
    export const TABLE_NAME: string = 'exams';
    export const ID: string = 'id';
    export const GUID: string = 'guid';
    export const TITLE: string = 'title';
    export const STARTS_AT: string = 'starts_at';
    export const ENDS_AT: string = 'ends_at';
}

@Entity({name: ExamNames.TABLE_NAME})
export class Exam {
    @PrimaryGeneratedColumn({name: ExamNames.ID})
    @IsInt() 
    id: number;
    
    @Column({name: ExamNames.GUID})
    @Generated("uuid") 
    @IsString()
    guid: string;
    
    @Column({name: ExamNames.TITLE}) 
    @IsString()
    title: string;

    @Column({name: ExamNames.STARTS_AT}) 
    @IsString()
    startsAt: string;

    @Column({name: ExamNames.ENDS_AT}) 
    @IsString()
    endsAt: string;
}