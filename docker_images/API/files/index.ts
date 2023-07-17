import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import clientRoutes from './src/routes/clientsRoutes.routes';
import planningRoutes from './src/routes/planningsRoutes.routes';
import carsitterRoutes from './src/routes/carsittersRoutes.routes';
import vehiculeRoutes from './src/routes/vehiculesRoutes.routes';

config();
const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT_API, () => {
  console.log(`Server is listening on port ${process.env.PORT_API}`);
});

app.use('/clients', clientRoutes);
app.use('/plannings', planningRoutes);
app.use('/carsitters', carsitterRoutes);
app.use('/vehicules', vehiculeRoutes);

app.get('/', (req, res) => {
  res.send('Carsitter API is running');
});
// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});
