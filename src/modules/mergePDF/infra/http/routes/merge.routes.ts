import Router from "express";
import { container } from 'tsyringe';
import {MergePdfController} from '../../../UseCases/MergePdfController';

const mergeRoutes = Router();

const mergePdfController = container.resolve(MergePdfController);

mergeRoutes.post("/", (request,response) => {
    return mergePdfController.handle(request,response)
});

export {mergeRoutes};