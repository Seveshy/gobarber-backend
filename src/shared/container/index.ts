import { container } from 'tsyringe';

import '@modules/users/providers';

import IAppoitnmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';


import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';


container.registerSingleton<IAppoitnmentsRepository>(
    'AppointmentsRepository',
    AppointmentRepository
);


container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);