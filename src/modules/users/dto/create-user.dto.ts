import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsNumber, IsArray, ArrayNotEmpty } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        description: 'Nombre completo del usuario',
        example: 'Juan Pérez',
    })
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @ApiProperty({
        description: 'Correo electrónico válido del usuario',
        example: 'juan.perez@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'SecurePassword123!',
    })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({
        description: 'Confirmación de la contraseña del usuario',
        example: 'SecurePassword123!',
    })
    @IsNotEmpty()
    @IsString()
    confirmPassword: string;

    @ApiProperty({
        description: 'Número de teléfono del usuario',
        example: 1234567890,
    })
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @ApiProperty({
        description: 'Lista de IDs de roles asociados al usuario',
        example: [1, 2],
        type: [Number],
    })
    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    roles: number[];
}
