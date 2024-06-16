import { IsNotEmpty, IsString, MaxLength, MinLength, isNotEmpty } from "class-validator";

export class AddTodoDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6, {
        message: "'name' size should be minimum 6 caracters"
    })
    @MaxLength(25)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    description: string;
}