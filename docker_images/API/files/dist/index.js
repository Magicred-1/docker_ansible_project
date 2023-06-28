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
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
const db = new mongodb_1.default();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
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
app.get('/clients', (req, res) => {
    try {
        const id = req.body.id;
        const client = db.clientGetByID(id);
        res.send(client);
    }
    catch (error) {
        console.log(error);
    }
});
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
app.put('/clients/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const client = yield db.clientGetByID(id);
        res.send(client);
    }
    catch (error) {
        console.log(error);
    }
}));
app.delete('/clients/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const client = yield db.clientDelete(id);
        res.send(client);
    }
    catch (error) {
        console.log(error);
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
    const { vehiculeID, carsitterID, clientID, date, time, duration } = req.body;
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
        res.send(db.carsitterAdd(newCarsitter));
    }
    catch (error) {
        console.error('Error adding carsitter:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Vehicule CRUD
// Récupérer tous les vehicules
app.get('/vehicules', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicule = yield db.vehiculeGetAll();
        res.send(vehicule);
    }
    catch (error) {
        console.error('Error getting vehicule:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.get('/vehicules', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    try {
        const vehicule = yield db.vehiculeGetByID(id);
        res.send(vehicule);
    }
    catch (error) {
        console.error('Error getting vehicule:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.post('/vehicules', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newVehicule = {
            type: req.body.type,
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price,
            mode: req.body.mode,
            vehicleType: req.body.vehicleType
        };
        const result = yield db.vehiculeAdd(newVehicule);
        res.send(result);
    }
    catch (error) {
        console.error('Error adding vehicule:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.delete('/vehicules/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield db.vehiculeDelete(id);
        res.send(result);
    }
    catch (error) {
        console.error('Error deleting vehicule:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.put('/vehicules/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const newVehicule = {
            type: req.body.type,
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price,
            mode: req.body.mode,
            vehicleType: req.body.vehicleType
        };
        const result = yield db.vehiculeUpdate(id, newVehicule.type, newVehicule.brand, newVehicule.model, newVehicule.price, newVehicule.mode);
        res.send(result);
    }
    catch (error) {
        console.error('Error updating vehicule:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
//# sourceMappingURL=index.js.map