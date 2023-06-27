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
const bcrypt_1 = __importDefault(require("bcrypt"));
(0, dotenv_1.config)();
const db = new mongodb_1.default();
const app = (0, express_1.default)();
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Default route');
}));
// API Client
// Clients CRUD
app.get('/client', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield db.clientGetAll();
    res.send(client);
}));
// app.get('/client/:id', (req: Request, res: Response) => {
//     const id = req.params.id;
//     const client = db.clientGetById(id);
//     res.send(client);
// });
app.post('/client', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newClient = {
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            email: req.body.email,
            age: req.body.age,
            password: bcrypt_1.default.hashSync(req.body.password, 10)
        };
        const result = yield db.clientAdd(newClient);
        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}));
// Planning CRUD
// Récupérer tous les plannings
app.get('/planning', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planning = yield db.planningGetAll();
        res.send(planning);
    }
    catch (error) {
        console.log(error);
    }
}));
// app.get('/planning/:id', async (req: Request, res: Response) => {
//     const id = req.params.id;
//     const planning = await db.planningGetById(id);
//     res.send(planning);
// }
// );
// app.post('/planning', async (req: Request, res: Response) => {
//     const newPlanning: Planning =
//     {
//         date: req.body.date,
//         duration: req.body.duration,
//         client: req.body.client,
//         carsitter: req.body.carsitter
//     }
//     const result = await db.planningAdd(newPlanning);
//     res.send(result);
// }
// );
// Carsitter CRUD
// Récupérer tous les carsitters
app.get('/carsitter', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carsitter = yield db.carsitterGetAll();
    res.send(carsitter);
}));
// app.get('/carsitter/:id', async (req: Request, res: Response) => {
//     const id = req.params.id;
//    const carsitter = await db.carsitterGetById(id);
//    res.send(carsitter);
// }
// );
// app.post('/carsitter', async (req: Request, res: Response) => {
//     const newCarsitter: Carsitter =
//     {
//         lastname: req.body.lastname,
//         firstname: req.body.firstname,
//         age: req.body.age,
//         password: req.body.password
//     }
// Vehicule CRUD
// Récupérer tous les vehicules
app.get('/vehicule', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicule = yield db.vehiculeGetAll();
    res.send(vehicule);
}));
// app.get('/vehicule/:id', async (req: Request, res: Response) => {
//     const id = req.params.id;
//     const vehicule = await db.vehiculeGetById(id);
//     res.send(vehicule);
// }
// );
// app.post('/vehicule', async (req: Request, res: Response) => {
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
// app.delete('/vehicule/:id', async (req: Request, res: Response) => {
//     const id = req.params.id;
//     const result = await db.vehiculeDelete(id);
//     res.send(result);
// }
// );
// app.update('/vehicule/:id', async (req: Request, res: Response) => {
//     const id = req.params.id;
//     const result = await db.vehiculeUpdate(id);
//     res.send(result);
// }
// );
//# sourceMappingURL=index.js.map