import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between,Like } from 'typeorm';
import { Appointment } from '../appointments/entities/appointment.entity';
import { User } from '../users/entities/user.entity';
import { Patient } from '../patients/entities/patient.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>
  ) {}

  private convertToUtcDate(date: Date, time: string): Date {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);


    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;


    date.setHours(hours, minutes, 0, 0);
    return new Date(date.toISOString()); 
  }

  async createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const { doctorId, patientId, date, time, description, specialty, reason } = createAppointmentDto;

    const appointmentDate = new Date(date); 

    const doctor = await this.userRepository.findOne({ where: { id: doctorId } });
    if (!doctor) {
      throw new NotFoundException('Médico no encontrado');
    }

    const patient = await this.patientRepository.findOne({ where: { id: patientId } });
    if (!patient) {
      throw new NotFoundException('Paciente no encontrado');
    }

   
    const appointmentDateWithTime = this.convertToUtcDate(appointmentDate, time);


    const startRange = new Date(appointmentDateWithTime);
    const endRange = new Date(appointmentDateWithTime);
    startRange.setMinutes(startRange.getMinutes() - 30);
    endRange.setMinutes(endRange.getMinutes() + 30); 

    console.log('Validating appointment within range:', {
      startRange,
      endRange,
    });


    const conflictingAppointments = await this.appointmentRepository.find({
      where: {
        doctor: { id: doctorId },
        date: Between(startRange, endRange),
      },
    });

    console.log('Conflicting appointments found:', conflictingAppointments);

    if (conflictingAppointments.length > 0) {
      throw new BadRequestException('El médico ya tiene una cita dentro de los 30 minutos de esta hora.');
    }


    const newAppointment = this.appointmentRepository.create({
      date: appointmentDateWithTime,
      time,
      description,
      specialty,
      reason,
      doctor,
      patient,
    });

    console.log('Saving new appointment:', newAppointment);

    return this.appointmentRepository.save(newAppointment);
  }




  async filterAppointments({
    date,
    specialty,
    reason,
  }: {
    date?: string; 
    specialty?: string;
    reason?: string;
  }): Promise<Appointment[]> {
    const where: any = {};

    if (date) {
      const parsedDate = new Date(date);
      const startOfDay = new Date(parsedDate.setUTCHours(0, 0, 0, 0));
      const endOfDay = new Date(parsedDate.setUTCHours(23, 59, 59, 999));

      where.date = Between(startOfDay, endOfDay); 
    }

    if (specialty) {
      where.specialty = Like(`%${specialty}%`); 
    }

    if (reason) {
      where.reason = Like(`%${reason}%`); 
    }

    const appointments = await this.appointmentRepository.find({
      where,
      relations: ['doctor', 'patient'], 
    });

    return appointments;
  }

  async updateDescription(id: string, newDescription: string): Promise<Appointment> {

    const appointment = await this.appointmentRepository.findOne({ where: { id } });
    
  
    if (!appointment) {
      throw new NotFoundException('Cita no encontrada');
    }

    
    appointment.description = newDescription;

    
    return this.appointmentRepository.save(appointment);
  }



  async getDoctorAvailability(doctorId: string, date: string): Promise<{ availableHours: string[] }> {
    
    const workStartHour = 9;
    const workEndHour = 17;
  
    
    const parsedDate = new Date(date);
    const startOfDay = new Date(parsedDate.setUTCHours(0, 0, 0, 0));
    const endOfDay = new Date(parsedDate.setUTCHours(23, 59, 59, 999));
  
    
    const doctor = await this.userRepository.findOne({ where: { id: doctorId } });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
  
   
    const appointments = await this.appointmentRepository.find({
      where: {
        doctor: { id: doctorId },
        date: Between(startOfDay, endOfDay),
      },
      select: ['time'], 
    });
  
    
    const occupiedHours = new Set(appointments.map(app => app.time));
  
    
    const availableHours: string[] = [];
    for (let hour = workStartHour; hour < workEndHour; hour++) {
      const hourString = `${hour}:00`;
      if (!occupiedHours.has(hourString)) {
        availableHours.push(hourString);
      }
    }
  
    return { availableHours };
  }
}


