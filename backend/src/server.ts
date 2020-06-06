import express from 'express';
import path from 'path';
import routes from './routes';

const app = express();
app.use(express.json());

app.use(routes);

/* 
    usamos `express.static` quando 
    queremos servir aquivos estáticos
    de um diretório específico
*/
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3000);