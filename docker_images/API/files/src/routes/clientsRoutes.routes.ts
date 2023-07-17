import express, { Request, Response } from 'express';
import MongoDBConnector from '../mongodb';
import { Client } from '../interfaces';

const router = express.Router();
const db = new MongoDBConnector();

router.get('/', async (req: Request, res: Response) => {
  try {
    const clients = await db.clientGetAll();
    res.send(clients);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const client = await db.clientGetByID(id);
    res.send(client);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const newClient: Client = {
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      email: req.body.email,
      age: req.body.age,
      password: req.body.password,
    };

    const result = await db.clientAdd(newClient);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error adding client:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const client = await db.clientGetByID(id);
    res.send(client);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const client = await db.clientDelete(id);
    res.send(client);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
