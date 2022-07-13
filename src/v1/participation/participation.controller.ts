import { Body, Controller, Get, Res, HttpStatus, Post, HttpCode } from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { ParticipateDto } from './dto/participate.dto';

@Controller('participate')
export class ParticipationController {
    constructor(private readonly _service: ParticipationService) {}

    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    participate(@Body() dto: ParticipateDto) {
        return this._service.participate(dto);
    }
}