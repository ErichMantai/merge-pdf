interface IMergePdfDTO {
    diretorio: string;
    estabelecimento?: string;
}

interface IMergePdfRepository {
  listFilesDirectory(diretorio:string):Promise<string[]>
  mergeFiles(diretorio:string) :Promise<void>;
}

export {IMergePdfRepository,IMergePdfDTO};