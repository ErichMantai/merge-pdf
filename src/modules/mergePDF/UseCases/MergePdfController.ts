import { Request, Response } from "express";
import { container } from 'tsyringe';
import {MergePdfUseCase} from './MergePdfUseCase';

class MergePdfController {

      async handle(request: Request, response: Response): Promise<Response> {

        const mergePdfUseCase = container.resolve(MergePdfUseCase);

        try {

            const {file_path} = request.body;
        
            if (!file_path) {
                return response.status(400).json({error: "Diretório dos arquivos não informado!"})
             }

             await mergePdfUseCase.execute(file_path);

        }catch(err) {
            return response.status(404).json({erro: "Diretório dos arquivos inexistente ou incorreto! " + err})
        }

         return response.json({message: "OK"});

    } 

}

export {MergePdfController}