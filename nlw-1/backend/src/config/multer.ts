import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const multerConfig = {
    storage: multer.diskStorage({
        // local onde o arquivo será salvo na máquina
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        // configuração para salvar nome do arquivo
        filename: (request, file, callback) => {
            const hash = crypto.randomBytes(6).toString('hex');

            const fileName = `${hash}_${file.originalname}`;

            // o primeiro parâmetro é um possível erro.
            // passamos `null` dada a baixa probabilidade
            // de ser lançada uma exceção nas linhas acima
            callback(null, fileName);
        }
    })
};

export default multerConfig;