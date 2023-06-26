import express from 'express';
import { Request, Response } from 'express';
import MongoDBConnector from './src/utils/mongodb';

const db = new MongoDBConnector();


const app = express();

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

app.get('/', (req: Request, res: Response) => {
        res.send('Default route');
    }
);

// API Client
app.get('/client', (req: Request, res: Response) => {
    db.clientGetAll().then((clients) => {
        res.send(clients);
    }
    ).catch((err) => {
        res.send(err);
    }
    );
});

// app.get('/client', (req: Request, res: Response) => {
//     db.clientGetById(req.body.id).then((client) => {
//         res.send(client);
//     }
//     ).catch((err) => {
//         res.send(err);
//     }
//     );
// });

app.post('/client', (req: Request, res: Response) => {
    db.clientAdd(req.body.lastname, req.body.firstname, req.body.email, req.body.age, req.body.password, req.body.vehicule).then((client) => {
        res.send(client);
    } 
    ).catch((err) => {
        res.send(err);
    }
    );
});

