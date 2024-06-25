import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvEntity } from './entities/cv.entity/cv.entity';
import { AddCvDto } from './dto/Add-cv.dto';
import { AddTodoDto } from 'src/todo/DTO/add-todo.dto';
import { UpdateCvDto } from './dto/Update-cv.dto';

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
        @Body() addCvDto: AddCvDto
    ) : Promise<CvEntity>{
        return await this.cvService.addCv(addCvDto)
    }

    @Patch(':id')
    async updateCv(
        @Body() updateCvDto: UpdateCvDto,
        @Param('id', ParseIntPipe) id : number,
    ) : Promise<CvEntity>{
        return await this.cvService.updateCv(id,updateCvDto);
    }

    @Patch()
    async updateCvWithCriteria(
        @Body() updateObject,
    ) {
        const {updateCriteria, updateCvDto} = updateObject
        return await this.cvService.updateCvWithCriteria(updateCriteria,updateCvDto);
    }

    @Delete(':id')
    async deleteCv(
        @Param('id', ParseIntPipe) id : number,
    ) {
        return await this.cvService.softDeleteCv(id);

    }

    @Get('recover/:id')
    async restoreCv(        
        @Param('id', ParseIntPipe) id : number,
    ){
        return await this.cvService.restoreCv(id);
    }

    @Get('stats')
    async statsCvNumberByAge(){
        return await this.cvService.statCvCountByAge(50,16);
    }

    @Get(':id')
    async getCvById(
        @Param('id', ParseIntPipe) id : number,

    ): Promise<CvEntity> {
        return await this.cvService.findCvById(id);
    }
    
    // caution with order, place generic path at the end
}
