import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, isNotEmpty } from "class-validator";

export class AddCvDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(15)
    @Max(65)
    age: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    cin: number;

    @IsNotEmpty()
    @IsString()
    job: string;

    @IsOptional()
    @IsString()
    path: string;


}