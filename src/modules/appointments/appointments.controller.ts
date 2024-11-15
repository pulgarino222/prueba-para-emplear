import { Controller, Post, Body ,Get,Query,Patch,Param} from '@nestjs/common';
import { AppointmentService } from '../appointments/appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from '../appointments/entities/appointment.entity';
import { ApiQuery } from '@nestjs/swagger'

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}


  @Get('availability/:doctorId')
  async getDoctorAvailability(
    @Param('doctorId') doctorId: string,
    @Query('date') date: string,
  ) {
    return this.appointmentService.getDoctorAvailability(doctorId, date);
  }

  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    return this.appointmentService.createAppointment(createAppointmentDto);
  }

  @Get('filter')
  @ApiQuery({ name: 'date', required: false, description: 'Fecha en formato ISO' })
  @ApiQuery({ name: 'specialty', required: false, description: 'Especialidad médica' })
  @ApiQuery({ name: 'reason', required: false, description: 'Motivo de la cita' })
  async filterAppointments(
    @Query('date') date?: string, 
    @Query('specialty') specialty?: string, 
    @Query('reason') reason?: string, 
  ): Promise<Appointment[]> {
    return this.appointmentService.filterAppointments({ date, specialty, reason });
  }


  @Patch(':id/description')
  async updateDescription(
    @Param('id') id: string, 
    @Body('description') description: string, 
  ): Promise<Appointment> {
    return this.appointmentService.updateDescription(id, description);
  }

  

}