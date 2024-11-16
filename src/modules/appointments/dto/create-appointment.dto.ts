import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'ID del doctor asignado a la cita',
    example: 'doctor123',
  })
  @IsNotEmpty()
  doctorId: string;

  @ApiProperty({
    description: 'ID del paciente que solicita la cita',
    example: 'patient456',
  })
  @IsNotEmpty()
  patientId: string;

  @ApiProperty({
    description: 'Fecha de la cita en formato ISO 8601',
    example: '2024-11-20',
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'Hora de la cita en formato 24 horas (hh:mm)',
    example: '14:30',
  })
  @IsNotEmpty()
  @IsString()
  time: string;

  @ApiProperty({
    description: 'Descripción opcional de la cita',
    example: 'Consulta médica general',
    required: false,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Especialidad médica requerida para la cita',
    example: 'Cardiología',
  })
  @IsNotEmpty()
  @IsString()
  specialty: string;

  @ApiProperty({
    description: 'Motivo principal de la cita',
    example: 'Dolor en el pecho',
  })
  @IsNotEmpty()
  @IsString()
  reason: string;
}
