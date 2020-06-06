import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
    private static SERVER_UPLOADS_URL = 'http://localhost:3333/uploads';

    async index(req:Request, res: Response) {
        const items = await knex.table('items').select('*');

        const serializedItems = items.map(item => {
            return {
                ...item,
                image: `${ItemsController.SERVER_UPLOADS_URL}/${item.image}`
            }
        });

        return res.json(serializedItems);

    }
}

export default ItemsController;