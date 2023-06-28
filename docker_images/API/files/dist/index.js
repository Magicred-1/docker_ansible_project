"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = __importDefault(require("./src/utils/mongodb"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const db = new mongodb_1.default();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Default route');
}));
// API Client
// Clients CRUD
app.get('/clients', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield db.clientGetAll();
        res.send(client);
    }
    catch (error) {
        console.log(error);
    }
}));
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
app.post('/clients', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newClient = {
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            email: req.body.email,
            age: req.body.age,
            password: req.body.password,
        };
        const result = yield db.clientAdd(newClient);
        res.status(200).json(result);
    }
    catch (error) {
        console.error('Error adding client:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Planning CRUD
// Récupérer tous les plannings
app.get('/plannings', (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planning = yield db.planningGetAll();
        res.send(planning);
    }
    catch (error) {
        console.log(error);
    }
}));
app.get('/planning/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const planning = yield db.planningGetById(id);
    res.send(planning);
}));
app.post('/plannings', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const newPlanning = {
            vehiculeID,
            carsitterID,
            clientID,
            date,
            time,
            duration,
        };
        const result = yield db.planningAdd(newPlanning);
        res.status(200).json(result);
    }
    catch (error) {
        console.error('Error adding planning:', error);
        res.status(500).json({
            status: 500,
            error: 'Internal Server Error'
        });
    }
}));
// );
// Carsitter CRUD
// Récupérer tous les carsitters
app.get('/carsitters', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carsitter = yield db.carsitterGetAll();
    res.send(carsitter);
}));
// app.get('/carsitter/:id', async (req: Request, res: Response) => {
//     const id = req.params.id;
//    const carsitter = await db.carsitterGetById(id);
//    res.send(carsitter);
// }
// );
app.post('/carsitters', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.lastname || !req.body.firstname || !req.body.age || !req.body.password) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }
    if (req.body.age < 18) {
        res.status(400).json({ error: 'Carsitter must be 18 or older' });
        return;
    }
    try {
        const newCarsitter = {
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            age: req.body.age,
            password: req.body.password
        };
    }
    catch (error) {
        console.error('Error adding carsitter:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Vehicule CRUD
// Récupérer tous les vehicules
app.get('/vehicules', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicule = yield db.vehiculeGetAll();
    res.send(vehicule);
}));
// app.get('/vehicules', async (req: Request, res: Response) => {
//     const id = req.body.id;
//     const vehicule = await db.vehiculeGetById(id);
//     res.send(vehicule);
// }
// );
// app.post('/vehicules', async (req: Request, res: Response) => {
//     const newVehicule: Vehicule =
//     {
//         type: req.body.type,
//         brand: req.body.brand,
//         model: req.body.model,
//         price: req.body.price,
//         mode: req.body.mode,
//         vehicleType: req.body.vehicleType
//     }
//     const result = await db.vehiculeAdd(newVehicule);
//     res.send(result);
// }
// );
// app.delete('/vehicules/:id', async (req: Request, res: Response) => {
//     const id = req.params.id;
//     const result = await db.vehiculeDelete(id);
//     res.send(result);
// }
// );
// app.update('/vehicules/:id', async (req: Request, res: Response) => {
//     const id = req.params.id;
//     const result = await db.vehiculeUpdate(id);
//     res.send(result);
// }
// );
//# sourceMappingURL=index.js.map