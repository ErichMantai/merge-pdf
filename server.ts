import "reflect-metadata";
import express from 'express';
import 'dotenv/config';


import {routes} from './src/modules/mergePDF/infra/http/routes';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT} 🚀`);
  });
  