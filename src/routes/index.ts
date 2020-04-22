import { Router } from 'express';
import  appointmentsRouter from './appointments.routes';
import  usersRouter from './user.routes';
import  sessionRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/sessions', sessionRouter); 
routes.use('/users', usersRouter);


export default routes;
