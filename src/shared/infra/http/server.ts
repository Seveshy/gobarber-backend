import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

import uploadConfig from '@config/upload';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.listen(3333, () => {
  console.log('Server started in port 3333');
});
