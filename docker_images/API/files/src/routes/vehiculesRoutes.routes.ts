import express, { Request, Response } from 'express';
import MongoDBConnector from '../mongodb';
import { Vehicule } from '../interfaces';

const router = express.Router();
const db = new MongoDBConnector();

router.get('/', async (req: Request, res: Response) => {
  try {
    const vehicules = await db.vehiculeGetAll();
    res.send(vehicules);
  } catch (error) {
    console.error('Error getting vehicules:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const vehicule = await db.vehiculeGetByID(id);
    res.send(vehicule);
  } catch (error) {
    console.error('Error getting vehicule:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const newVehicule: Vehicule = {
      type: req.body.type,
      brand: req.body.brand,
      model: req.body.model,
      price: req.body.price,
      mode: req.body.mode,
      vehicleType: req.body.vehicleType,
    };

    const result = await db.vehiculeAdd(newVehicule);
    res.send(result);
  } catch (error) {
    console.error('Error adding vehicule:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await db.vehiculeDelete(id);
    res.send(result);
  } catch (error) {
    console.error('Error deleting vehicule:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const newVehicule: Vehicule = {
      type: req.body.type,
      brand: req.body.brand,
      model: req.body.model,
      price: req.body.price,
      mode: req.body.mode,
      vehicleType: req.body.vehicleType,
    };

    const result = await db.vehiculeUpdate(
      id,
      newVehicule.type,
      newVehicule.brand,
      newVehicule.model,
      newVehicule.price,
      newVehicule.mode
    );

    res.send(result);
  } catch (error) {
    console.error('Error updating vehicule:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
