import express from 'express';
import knex from './database/connection';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/', (req, res) => {
    return res.json({message: "Hello world!"});
});

// Rotas de Itens de Coleta
routes.get('/items', itemsController.index);

// Rotas de Pontos de Coleta
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.post('/points', pointsController.create);



export default routes;