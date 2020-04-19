import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()

  @Column('timestamp with time zone')
  provider: string;
  date: Date;
}

export default Appointment;
