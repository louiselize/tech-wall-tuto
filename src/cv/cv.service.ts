import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CvEntity } from './entities/cv.entity/cv.entity';
import { AddCvDto } from './dto/Add-cv.dto';
import { UpdateCvDto } from './dto/Update-cv.dto';

@Injectable()
export class CvService {
    constructor(
        @InjectRepository(CvEntity)
        private cvRepository: Repository<CvEntity>
    ){

    }

    async getCvs(): Promise<CvEntity[]>{
        return await this.cvRepository.find();
    }

    async addCv(cv: AddCvDto): Promise<CvEntity> {
        return await this.cvRepository.save(cv);
    }

    async updateCv(id: number, cv: UpdateCvDto): Promise<CvEntity> {
        const newCv = await this.cvRepository.preload({
            id,
            ...cv
        })
        if (! newCv){
            throw new NotFoundException(`Cv ${id} does not exist`)
        }
        return await this.cvRepository.save(newCv);
    }

    async updateCvWithCriteria(updateCriteria, cv: UpdateCvDto) {
        return this.cvRepository.update(updateCriteria,cv)
    }

    async removeCv(id: number) {
        const cvToRemove = await this.cvRepository.findOneBy({
            id:id
        });
        if(! cvToRemove){
            throw new NotFoundException(`Cv ${id} does not exist`)
        }
        return this.cvRepository.remove(cvToRemove)
    }

    async deleteCv(id: number) {
        return this.cvRepository.delete(id)
    }
}
