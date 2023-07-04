import { Request, Response } from 'express';
import MongoDBConnector from '../utils/mongodb';
import { Planning } from '../interfaces';

const db = new MongoDBConnector();

export const getAllPlannings = async (req: Request, res: Response) => {
    try {
        const planning = await db.planningGetAll();
        res.send(planning);
    } catch (error) {
        console.log(error);
    }
};

export const getPlanningById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const planning = await db.planningGetById(id);
    res.send(planning);
};

export const addPlanning = async (req: Request, res: Response) => {
    const { vehiculeID, carsitterID, clientID, date, time, duration } = req.body;

    if (!vehiculeID || !carsitterID || !clientID || !date || !time || !duration) {
        res.status(400).json({
        status: 400,
        error: 'Bad Request',
        });
        return;
    }

    if (duration < 1 && duration > 24) {
        res.status(400).json({
        status: 400,
        error: 'Duration must be greater than 0 and more than 24',
        });
        return;
    }

    if (date < Date.now()) {
        res.status(400).json({
        status: 400,
        error: 'Date must be greater than now',
        });
        return;
    }

    // check date format
    if (date.length !== 10) {
        res.status(400).json({
        status: 400,
        error: 'Date format must be YYYY-MM-DD',
        });
        return;
    }

    // Check time format
    if (time.length !== 5) {
        res.status(400).json({
        status: 400,
        error: 'Time format must be HH:MM',
        });
        return;
    }

    try {
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
        res.status(500).json({
        status: 500,
        error: 'Internal Server Error',
        });
    }
};
