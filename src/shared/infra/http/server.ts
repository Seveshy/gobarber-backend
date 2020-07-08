import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/infra/typeorm';
import uploadConfig from '@config/upload';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
  console.log('Server started in port 3333');
});
