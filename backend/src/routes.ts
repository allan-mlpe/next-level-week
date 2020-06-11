import express from 'express';

// lib para configuração de upload
import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();

const upload = multer(multerConfig);

// Controllers
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/', (req, res) => {
    return res.json({message: "Hello world!"});
});

// Rotas de Itens de Coleta
routes.get('/items', itemsController.index);

// Rotas de Pontos de Coleta
/*
Para que um método privado da PointsController  usado pelos métodos
`show` e `bind` possa ser executado podemos usar 2 abordagens: 

- um bind como na rota `/points/:id`.
- uma arrow function como na rota `/points`

Ver: https://stackoverflow.com/a/46219922
*/
routes.get('/points/:id', pointsController.show.bind(pointsController));
routes.get('/points', (req, res) => pointsController.index(req, res));

/*
Passamos a instância do multer para a rota que precisa lidar com o upload.
Como vamos usar somente um arquivo, usamos `upload.single(...)`. Caso
contrário poderíamos utilizar `upload.array(...)`. O parâmetro dentro das
funções `single` ou `array` deve ser o nome do campo da request que contém 
a imagem. 
*/
routes.post('/points', upload.single('image'), pointsController.create.bind(pointsController));

export default routes;