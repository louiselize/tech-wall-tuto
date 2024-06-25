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

    async findCvById(id: number): Promise<CvEntity>{
        const cv = await this.cvRepository.findOneBy({
            id:id
        });
        if(! cv){
            throw new NotFoundException(`Cv ${id} does not exist`)
        }
        return cv
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
        const cvToRemove = await this.findCvById(id);
        return this.cvRepository.remove(cvToRemove)
    }

    async deleteCv(id: number) {
        return this.cvRepository.delete(id)
    }

    async softDeleteCv(id: number) {
        return this.cvRepository.softDelete(id)
    }

    async restoreCv(id: number) {
        return this.cvRepository.restore(id)
    }

    async statCvCountByAge(maxAge,minAge = 0){
        const qb = this.cvRepository.createQueryBuilder("cv")
        qb.select("cv.age, count(cv.id) as CvCount")
        .where("cv.age > :minAge and cv.age< :maxAge")
        .setParameters({
                minAge,
                maxAge
            })
        .groupBy("cv.age")
        console.log(qb.getSql());
        return await qb.getRawMany();
    }
    
}
