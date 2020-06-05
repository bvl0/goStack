import { Router } from 'express';
import multer from 'multer';
import multerconfig from './config/multer';

import UserController from './app/controllers/userController';
import SessionController from './app/controllers/sessionController';
import FileController from './app/controllers/fileController';
import ProviderController from './app/controllers/providerController';
import AppointmentController from './app/controllers/appointmentController'
import ScheduleController from './app/controllers/scheduleController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerconfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.get('/schedules', ScheduleController.index);


routes.post('/files', upload.single('file'), FileController.store);
export default routes;
