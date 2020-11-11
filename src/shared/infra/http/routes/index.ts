import { Router } from 'express';
import  appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import  providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import  usersRouter from '@modules/users/infra/http/routes/user.routes';
import  sessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import  passwordRoutes from '@modules/users/infra/http/routes/password.routes';
import  profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/providers', profileRouter);
routes.use('/sessions', sessionRouter); 
routes.use('/users', usersRouter);
routes.use('/password', passwordRoutes);
routes.use('/profile', profileRouter);

export default routes;
