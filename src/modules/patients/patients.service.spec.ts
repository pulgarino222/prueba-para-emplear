import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from './patients.service';
import { Patient } from './entities/patient.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('PatientsService', () => {
  let service: PatientsService;
  let repository: Repository<Patient>;

  
  const mockPatients: Patient[] = [
    {
      id: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      fullName: 'John Doe',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'Male',
      contactNumber: '123456789',
      address: '123 Main St',
      appointments: [], 
    },
    {
      id: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
      fullName: 'Jane Doe',
      dateOfBirth: new Date('1995-02-02'),
      gender: 'Female',
      contactNumber: '987654321',
      address: '456 Elm St',
      appointments: [],  
    },
  ];
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientsService,
        {
          provide: getRepositoryToken(Patient),
          useClass: Repository, // Usamos un repositorio simulado
        },
      ],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
    repository = module.get<Repository<Patient>>(getRepositoryToken(Patient));

    // Mockear la respuesta de `find`
    jest.spyOn(repository, 'find').mockResolvedValue(mockPatients);
  });

  it('should return all patients', async () => {
    const result = await service.findAll();
    expect(result).toEqual(mockPatients); // Verifica que los pacientes devueltos sean los mockeados
    expect(repository.find).toHaveBeenCalled(); // Verifica que se haya llamado al repositorio
  });
});
