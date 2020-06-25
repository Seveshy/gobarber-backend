import { EntityRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepositories';

import Appointment from '../../typeorm/entities/Appointments';

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> 
  
  implements IAppointmentsRepository {
  public async findByDate(date: Date): Promise<Appointment | undefined> {

    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment;
  }
}

export default AppointmentRepository;
