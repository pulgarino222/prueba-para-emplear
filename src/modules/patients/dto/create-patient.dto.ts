import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsPhoneNumber } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({
    description: 'Nombre completo del paciente',
    example: 'Juan Pérez',
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del paciente en formato ISO',
    example: '1990-05-15',
  })
  @IsDateString()
  dateOfBirth: Date;

  @ApiProperty({
    description: 'Género del paciente',
    example: 'Masculino',
  })
  @IsString()
  gender: string;

  @ApiProperty({
    description: 'Número de contacto del paciente en formato válido',
    example: '+34123456789',
  })
  @IsPhoneNumber()
  contactNumber: string;

  @ApiProperty({
    description: 'Dirección del paciente',
    example: 'Calle Falsa 123, Madrid, España',
  })
  @IsString()
  address: string;
}