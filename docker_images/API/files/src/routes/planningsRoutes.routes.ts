import express, { Request, Response } from 'express';
import MongoDBConnector from '../utils/mongodb';
import { Planning } from '../interfaces';

const router = express.Router();
const db = new MongoDBConnector();

router.get('/', async (req: Request, res: Response) => {
    try {
        const plannings = await db.planningGetAll();
        res.send(plannings);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const planning = await db.planningGetById(id);
        res.send(planning);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { vehiculeID, carsitterID, clientID, date, time, duration } = req.body;

        const newPlanning: Planning = {
        vehiculeID,
        carsitterID,
        clientID,
        date,
        time,
        duration,
        };

        const result = await db.planningAdd(newPlanning);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error adding planning:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
});

export default router;
