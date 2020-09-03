import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppoitnmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';


import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

// import IUserTokensRepository from '@modules/users/repositories/IUserTokenRepository';
// import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';



container.registerSingleton<IAppoitnmentsRepository>(
    'AppointmentsRepository',
    AppointmentRepository
);


container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);