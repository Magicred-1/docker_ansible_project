import { Request, Response } from 'express';
import MongoDBConnector from '../utils/mongodb';
import { Carsitter } from '../interfaces';

const db = new MongoDBConnector();

export const getAllCarsitters = async (req: Request, res: Response) => {
    const carsitter = await db.carsitterGetAll();
    res.send(carsitter);
};

export const addCarsitter = async (req: Request, res: Response) => {
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

        res.send(db.carsitterAdd(newCarsitter));
    } catch (error) {
        console.error('Error adding carsitter:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
