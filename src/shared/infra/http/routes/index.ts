import { Router } from 'express';
import  appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import  usersRouter from '@modules/users/infra/http/routes/user.routes';
import  sessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import  passwordRoutes from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/sessions', sessionRouter); 
routes.use('/users', usersRouter);
routes.use('/password', passwordRoutes);


export default routes;
