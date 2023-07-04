import express from 'express';
import clientsRouter from './clientsRoutes.routes';
import planningsRouter from './planningsRoutes.routes';
import carsittersRouter from './carsittersRoutes.routes';
import vehiculesRouter from './vehiculesRoutes.routes';

const router = express.Router();

router.use('/clients', clientsRouter);
router.use('/plannings', planningsRouter);
router.use('/carsitters', carsittersRouter);
router.use('/vehicules', vehiculesRouter);

export default router;
