import { container } from 'tsyringe';
import {MergePdfRepository} from  '../repositories/implementations/MergePdfRepository';

class MergePdfUseCase {

       public async execute(diretorio:string): Promise<void> {
        const mergePdf = container.resolve(MergePdfRepository);

        await mergePdf.mergeFiles(diretorio)
 
        }
}

export {MergePdfUseCase}