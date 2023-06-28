import express from 'express';
import { Request, Response } from 'express';
import MongoDBConnector from './src/utils/mongodb';
import { config } from 'dotenv';
import { Vehicule, Carsitter, Planning, Client } from './src/interfaces';

config();

const db = new MongoDBConnector();

const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});

app.get('/', async (req: Request, res: Response) => {
        res.send('Default route');
    }
);

// API Client
// Clients CRUD
app.get('/clients', async (req: Request, res: Response) => {
    try {
        const client = await db.clientGetAll();

        res.send(client);
    } catch (error) {
        console.log(error);
    }
});

// app.get('/clients', (req: Request, res: Response) => {
//     try {
//         const id = req.body.id;

//         const client = db.clientGetById(id);

//         res.send(client);
//     }
//     catch (error) {
//         console.log(error);
//     }
// });

app.post('/clients', async (req: Request, res: Response) => {
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


// Planning CRUD
// Récupérer tous les plannings
app.get('/plannings', async (res: Response) => {
    try {
        const planning = await db.planningGetAll();

        res.send(planning);
    } catch (error) {
        console.log(error);
    }
}
);

app.get('/planning/:id', async (req: Request, res: Response) => {
    const id = req.params.id;

    const planning = await db.planningGetById(id);

    res.send(planning);
}
);

app.post('/plannings', async (req: Request, res: Response) => {
    const regexObjectID = /^[0-9a-fA-F]{24}$/;
    const { vehiculeID, carsitterID, clientID, date, time, duration } = req.body;

    if (carsitterID === vehiculeID || clientID === vehiculeID || carsitterID === clientID) {
        res.status(400).json({ error: 'Carsitter and vehicule or client and vehicule or carsitter and client cannot be the same person' });
                return;
    }

    if (!vehiculeID || !carsitterID || !clientID || !date || !time || !duration) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

    if (!regexObjectID.test(vehiculeID) || !regexObjectID.test(carsitterID) || !regexObjectID.test(clientID)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
    }
    
    // On verifie le format de la date et du temps et de la durée (1 ou 2 chiffres)
    if (!date.match(/^\d{4}-\d{2}-\d{2}$/) || !time.match(/^\d{2}:\d{2}$/) || !duration.match(/^\d{1,2}$/)) {
        res.status(400).json({ error: 'Invalid date or time or duration' });
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
            error: 'Internal Server Error' 
        });
    }
    });



// );

// Carsitter CRUD
// Récupérer tous les carsitters
app.get('/carsitters', async (req: Request, res: Response) => {
    const carsitter = await db.carsitterGetAll();

    res.send(carsitter);
}
);

// app.get('/carsitter/:id', async (req: Request, res: Response) => {
//     const id = req.params.id;
//    const carsitter = await db.carsitterGetById(id);
//    res.send(carsitter);
// }
// );

app.post('/carsitters', async (req: Request, res: Response) => {

    if (!req.body.lastname || !req.body.firstname || !req.body.age || !req.body.password) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

    if (req.body.age < 18) {
        res.status(400).json({ error: 'Carsitter must be 18 or older' });
        return;
    }

    try {
        const newCarsitter: Carsitter =
        {
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            age: req.body.age,
            password: req.body.password
        }
        res.send(db.carsitterAdd(newCarsitter));
    } catch (error) {
        console.error('Error adding carsitter:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

// Vehicule CRUD
// Récupérer tous les vehicules
app.get('/vehicules', async (req: Request, res: Response) => {
    try {
        const vehicule = await db.vehiculeGetAll();

        res.send(vehicule);
    } catch (error) {
        console.error('Error getting vehicule:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

app.get('/vehicules', async (req: Request, res: Response) => {
    const id = req.body.id;
    try {
        const vehicule = await db.vehiculeGetByID(id);
        res.send(vehicule);
    } catch (error) {
        console.error('Error getting vehicule:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

app.post('/vehicules', async (req: Request, res: Response) => {
    try {
        const newVehicule: Vehicule =
        {
            type: req.body.type,
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price,
            mode: req.body.mode,
            vehicleType: req.body.vehicleType
        }
    
        const result = await db.vehiculeAdd(newVehicule);
    
        res.send(result);
    } catch (error) {
        console.error('Error adding vehicule:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

app.delete('/vehicules/:id', async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const result = await db.vehiculeDelete(id);
        res.send(result);
    } catch (error) {
        console.error('Error deleting vehicule:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

app.put('/vehicules/:id', async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const newVehicule: Vehicule =
        {
            type: req.body.type,
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price,
            mode: req.body.mode,
            vehicleType: req.body.vehicleType
        }

        const result = await db.vehiculeUpdate(id, newVehicule.type, newVehicule.brand, newVehicule.model, newVehicule.price, newVehicule.mode);

        res.send(result);
    }
    catch (error) {
        console.error('Error updating vehicule:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

);
