import { IMergePdfRepository } from "../IMergePdfRepository";
import {readdir, stat} from 'fs/promises';
import fs from 'fs';
import dir from 'fs';
import path from 'path';
import merge from 'easy-pdf-merge'
import {AppError} from '../../../../shared/Errors/AppError';

class MergePdfRepository implements IMergePdfRepository {

    private files : any[];

    constructor() {
        this.files = [];
    }

    async listFilesDirectory(diretorio: string): Promise<string[]> {
       
       const listfiles = await readdir(diretorio);

       for(let k in listfiles) {

        const ext_file = path.extname(listfiles[k]); 

         if (ext_file == '.PDF') {         
           const stats = await stat(diretorio + '\\' + listfiles[k]);
           if (stats.isDirectory()) {
             await this.listFilesDirectory(diretorio + '\\' + listfiles[k])
           } else {

            const caminho = diretorio + '\\' + listfiles[k]

            this.files.push(caminho);
           } 

          } 

        }

        return this.files;

    }

    async mergeFiles(diretorio: string): Promise<void> {

         const files =  await this.listFilesDirectory(diretorio);

         if (files.length == 0) {
             throw new AppError("Nenhum arquivo encontrado no diretório para realizar o Merge!",)
         }

         const fileToMerge = diretorio + 'teste.pdf';


        fs.access(fileToMerge, dir.constants.F_OK, (err) => {

            if (err) {
                if (err.code == 'ENOENT') {
                    merge(files, diretorio + 'Movimento_Diario.pdf', (err) => {
                        if (err) {
                            throw new AppError(`Erro ao Realizar junção dos arquivos!: ${err}`);
                        }
                    });
                }
            } else {

                dir.unlink(fileToMerge, (err) => {
                    if (err) {
                        throw new AppError(`Erro ao Remover arquivo da pasta: ${err}`);
                    }

                });


                merge(files, diretorio + 'Movimento_Diario.pdf', (err: any) => {
                    if (err) {
                        throw new AppError(`Erro ao Realizar junção dos arquivos!: ${err}`);
                    }
                });

            }
        })
    }

}
export {MergePdfRepository}