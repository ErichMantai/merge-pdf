import {Router} from "express";
import {mergeRoutes}  from './merge.routes';

const routes = Router();

routes.use('/merge', mergeRoutes);

export {routes};