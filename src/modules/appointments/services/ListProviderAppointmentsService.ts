import { injectable, inject } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
interface IRequest {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}


@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ){}

  public async execute({ provider_id, day, month, year }: IRequest): Promise<Appointment[]> {
    const cacheData = await this.cacheProvider.recover('asd');
    
    console.log(cacheData)

    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
        provider_id, 
        day, 
        month, 
        year
    });

    this.cacheProvider.save('aaa', 'bbn');

    return appointments;
  }
} 

export default ListProviderAppointmentsService;