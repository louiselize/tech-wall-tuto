import { Body, Controller, Get, Post } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvEntity } from './entities/cv.entity/cv.entity';
import { AddCvDto } from './dto/Add-cv.dto';
import { AddTodoDto } from 'src/todo/DTO/add-todo.dto';

@Controller('cv')
export class CvController {
    constructor(
        private cvService: CvService
    ){}

    @Get()
    async getAllCvs(): Promise<CvEntity[]> {
        return await this.cvService.getCvs()
    }

    @Post()
    async addCv(
        @Body() AddCvDto: AddCvDto
    ) : Promise<CvEntity>{
        return await this.cvService.addCv(AddCvDto)
    }
}
