"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const clientsRoutes_routes_1 = __importDefault(require("./src/routes/clientsRoutes.routes"));
const planningsRoutes_routes_1 = __importDefault(require("./src/routes/planningsRoutes.routes"));
const carsittersRoutes_routes_1 = __importDefault(require("./src/routes/carsittersRoutes.routes"));
const vehiculesRoutes_routes_1 = __importDefault(require("./src/routes/vehiculesRoutes.routes"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(process.env.PORT_API, () => {
    console.log(`Server is listening on port ${process.env.PORT_API}`);
});
app.use('/clients', clientsRoutes_routes_1.default);
app.use('/plannings', planningsRoutes_routes_1.default);
app.use('/carsitters', carsittersRoutes_routes_1.default);
app.use('/vehicules', vehiculesRoutes_routes_1.default);
app.get('/', (req, res) => {
    res.send('Carsitter API is running');
});
// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});
//# sourceMappingURL=index.js.map