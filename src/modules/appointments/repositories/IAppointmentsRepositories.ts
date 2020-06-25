import Appointment from '../infra/typeorm/entities/Appointments';

export default interface IAppointmentsRepositories {
    findByDate(date: Date): Promise<Appointment | undefined>;

}