import express from 'express';
import path from 'path';
import routes from './routes';
import cors from 'cors';
import { errors } from 'celebrate';

const app = express();

app.use(cors(
    /* filtra os domínios que terão acesso ao server
    {
        origin: 'www.meuapp.com.br'
    }
    */
));
app.use(express.json());
app.use(routes);

/* 
    usamos `express.static` quando 
    queremos servir aquivos estáticos
    de um diretório específico
*/
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

// habilita o express a lidar com erros do celebrade
// quando ocorrer erro de validação de dados
app.use(errors());

app.listen(3000);