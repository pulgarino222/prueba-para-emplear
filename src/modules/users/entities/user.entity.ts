import { IsEmail, IsNumber, IsString } from "class-validator";
import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Role } from '../../../auth/entities/roles.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @Column()
    fullName: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    password: string;

    @Column({ type: 'bigint' })
    @IsNumber()
    phone: number;

    @Column({ default: true })
    availability: boolean;

    @ManyToMany(() => Role, role => role.users)
    @JoinTable() 
    roles: Role[];
}
