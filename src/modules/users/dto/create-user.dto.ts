import { IsString, IsEmail, IsNotEmpty, IsNumber, IsArray, ArrayNotEmpty, IsUUID } from "class-validator";
import { IsDigits } from "src/common/decorators/quantity-number.decorator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    confirmPassword: string;

    @IsNotEmpty()
    @IsNumber()

    phone: number;

    
    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true }) 
    roles: number[];
}

