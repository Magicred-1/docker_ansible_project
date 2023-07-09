import express, { Request, Response } from 'express';
import MongoDBConnector from '../utils/mongodb';
import { Carsitter } from '../interfaces';

const router = express.Router();
const db = new MongoDBConnector();

router.get('/', async (req: Request, res: Response) => {
    try {
        const carsitters = await db.carsitterGetAll();
        res.send(carsitters);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    if (!req.body.lastname || !req.body.firstname || !req.body.age || !req.body.password) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

    if (req.body.age < 18) {
        res.status(400).json({ error: 'Carsitter must be 18 or older' });
        return;
    }

    try {
        const newCarsitter: Carsitter = {
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        age: req.body.age,
        password: req.body.password,
        };

        const result = await db.carsitterAdd(newCarsitter);
        res.send(result);
    } catch (error) {
        console.error('Error adding carsitter:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const carsitter = await db.carsitterGetByID(id);
        res.send(carsitter);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await db.carsitterDelete(id);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
