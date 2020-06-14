import { Request, Response } from 'express';
import knex from '../database/connection';

interface Point {
    id: number;
    image: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
    latitude: number;
    longitude: number;
    items: {}[]
}

class PointsController {

    private serializePoint(point: Point) {
        return {
            ...point,
            image: `http://localhost:3333/uploads/${point.image}`
        }
    }

    async index(req: Request, res: Response) {
        const { city, uf, items } = req.query;

        const paresedItems = String(items)
            .split(',')
            .map(id => Number(id.trim()));
        
        const points = await knex('points')
            .join('points_items', 'points.id', '=', 'points_items.point_id')
            .whereIn('points_items.item_id', paresedItems)
            .orWhere('points.city', String(city))
            .orWhere('points.uf', String(uf))
            .select('points.*')
            .distinct();
        
        const serializedPoints = points.map(this.serializePoint);
        
        return res.json(serializedPoints);
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const point = await knex('points')
            .select('*')
            .where('id', id)
            .first();
        
        
        if (!point) {
            return res.status(404).json({ message: `Ponto de coleta '${id}' não encontrado.` });
        }

        // Join para pegar os itens do ponto de coleta
        const items = await knex('items')
            .join('points_items', 'items.id', '=', 'points_items.item_id')
            .where(
                'points_items.point_id', id
            )
            .select('items.*');

        const serializedPoint = this.serializePoint(point);

        return res.json({
            serializedPoint,
            items
        });
    }

    async create(req: Request, res: Response) {
        const {
            name,
            email,
            whatsapp,
            city,
            uf,
            latitude,
            longitude,
            items
        } = req.body;
    
        // pegamos o nome do arquivo direto da request
        // por meio de `request.file.filename`
        const point = {
            image: req.file.filename,
            name,
            email,
            whatsapp,
            city,
            uf,
            latitude,
            longitude
        };

        const trx = await knex.transaction();
        
        try {
            const insertedIds = await trx('points').insert(point);
        
            const point_id = insertedIds[0];
        
            const pointItems = items
                .split(',')
                .map((item: string) => Number(item.trim()))
                .map((item_id: Number) => {
                    return {
                        item_id,
                        point_id
                    }
                });
            
            await trx('points_items').insert(pointItems);
        
            trx.commit();
            
            const serializedPoint = this.serializePoint(point as Point);

            return res.json({
                id: point_id,
                ...serializedPoint,
            });
        } catch(e) {
            trx.rollback();

            console.log(e);
            return res.status(500).json({ message: "Erro interno no servidor!"});
        }
    }
}

export default PointsController;