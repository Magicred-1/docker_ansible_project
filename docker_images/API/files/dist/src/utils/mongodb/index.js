"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = __importStar(require("mongodb"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class MongoDBConnector {
    constructor() {
        var _a, _b;
        this.uri = (_a = process.env.MONGODB_URI) !== null && _a !== void 0 ? _a : '';
        this.client = new mongodb.MongoClient(this.uri);
        this.databaseName = (_b = process.env.MONGODB_DB_NAME) !== null && _b !== void 0 ? _b : '';
    }
    // CRUD pour les vehicules
    // Ajouter un vehicule
    vehiculeAdd(vehicule) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const database = this.client.db(this.databaseName);
                const cars = database.collection('vehicules');
                // create a document to be inserted
                const insertedCar = {
                    type: vehicule.type,
                    brand: vehicule.brand,
                    model: vehicule.model,
                    price: vehicule.price,
                    mode: vehicule.mode,
                    vehicleType: vehicule.vehicleType
                };
                const result = yield cars.insertOne(insertedCar);
                console.log(`The documents were inserted with the _id: ${result.insertedId}`);
            }
            finally {
                yield this.client.close();
            }
        });
    }
    // Récupérer toutes les vehicules
    vehiculeGetAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const database = this.client.db(this.databaseName);
                const cars = database.collection('vehicules');
                const result = yield cars.find({}).toArray();
                return result;
            }
            finally {
                yield this.client.close();
            }
        });
    }
    // Récupérer une voiture par son ID
    vehiculeGetByID(vehiculeID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const database = this.client.db(this.databaseName);
                const vehicules = database.collection('vehicules');
                const result = yield vehicules.findOne({ _id: new mongodb.ObjectId(vehiculeID) });
                if (result == undefined) {
                    throw new Error("Vehicule not found");
                }
                return result;
            }
            finally {
                yield this.client.close();
            }
        });
    }
    // Supprimer une voiture
    vehiculeDelete(vehiculeID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const database = this.client.db('tp_ansible_docker');
                const vehicule = database.collection('vehicules');
                // On récupère la voiture et verifie qu'elle existe dans la base de données
                const searchedVehicule = yield vehicule.findOne({ _id: new mongodb.ObjectId(vehiculeID) });
                if (searchedVehicule == undefined) {
                    throw new Error("Car not found");
                }
                const result = yield vehicule.deleteOne({ _id: new mongodb.ObjectId(vehiculeID) });
                console.log(`${result.deletedCount} car(s) was/were deleted.`);
            }
            finally {
                yield this.client.close();
            }
        });
    }
    // Modifier une voiture
    vehiculeUpdate(vehiculeID, type, brand, model, price, mode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const database = this.client.db('tp_ansible_docker');
                const vehicules = database.collection('vehicules');
                // On récupère la voiture et vérifie qu'elle existe dans la base de données
                const searchedVehicule = yield vehicules.findOne({ _id: new mongodb.ObjectId(vehiculeID) });
                if (searchedVehicule == undefined) {
                    throw new Error("Car not found");
                }
                const result = yield vehicules.updateOne({ _id: new mongodb.ObjectId(vehiculeID) }, { $set: { type: type, brand: brand, model: model, price: price, mode: mode } });
                console.log(`${result.modifiedCount} car(s) was/were updated.`);
            }
            finally {
                yield this.client.close();
            }
        });
    }
    // CRUD pour les carsitters
    // Pour les carsitters
    // carsitter: { _id: string, lastname: string, firstname: string, age: number }
    // Ajouter un carsitter
    carsitterAdd(carsitter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const database = this.client.db(this.databaseName);
                const carsitters = database.collection('carsitters');
                // on vérifie que le carsitter n'existe pas déjà
                const searchedCarsitter = yield carsitters.findOne({ _id: new mongodb.ObjectId(carsitter["_id"]) });
                if (searchedCarsitter != undefined) {
                    throw new Error("Carsitter already exists");
                }
                // create a document to be inserted
                const insertedCarsitter = {
                    lastname: carsitter.lastname,
                    firstname: carsitter.firstname,
                    age: carsitter.age
                };
                const result = yield carsitters.insertOne(insertedCarsitter);
                console.log(`The carsitter(s) were inserted with the _id: ${result.insertedId}`);
            }
            finally {
                yield this.client.close();
            }
        });
    }
    // Récupérer tous les carsitters
    carsitterGetAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const database = this.client.db(this.databaseName);
                const carsitters = database.collection('carsitters');
                const result = yield carsitters.find({}).toArray();
                return result;
            }
            finally {
                yield this.client.close();
            }
        });
    }
    // Récupérer un carsitter par son ID
    carsitterGetByID(carsitterID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const database = this.client.db(this.databaseName);
                const carsitters = database.collection('carsitters');
                const result = yield carsitters.findOne({ _id: new mongodb.ObjectId(carsitterID) });
                if (result == undefined) {
                    throw new Error("Carsitter not found");
                }
                return result;
            }
            finally {
                yield this.client.close();
            }
        });
    }
    // Supprimer un carsitter
    carsitterDelete(carsitterID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const database = this.client.db('tp_ansible_docker');
                const carsitters = database.collection('carsitters');
                // On récupère le carsitter et verifie qu'il existe dans la base de données
                const carsitter = yield carsitters.findOne({ _id: new mongodb.ObjectId(carsitterID) });
                if (carsitter == undefined) {
                    throw new Error("Carsitter not found");
                }
                const result = yield carsitters.deleteOne({ _id: new mongodb.ObjectId(carsitterID) });
                console.log(`${result.deletedCount} carsitter(s) was/were deleted.`);
            }
            finally {
                yield this.client.close();
            }
        });
    }
    // Modifier un carsitter
    carsitterUpdate(carsitterID, lastname, firstname, age, vehicule) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const database = this.client.db('tp_ansible_docker');
                const carsitters = database.collection('carsitters');
                // On récupère le carsitter et verifie qu'il existe dans la base de données
                const carsitter = yield carsitters.findOne({ _id: new mongodb.ObjectId(carsitterID) });
                if (carsitter == undefined) {
                    throw new Error("Carsitter not found");
                }
                // On verifie les champs qui ont été modifiés
                if (lastname == undefined) {
                    lastname = carsitter.lastname;
                }
                if (firstname == undefined) {
                    firstname = carsitter.firstname;
                }
                if (age == undefined) {
                    age = carsitter.age;
                }
                if (vehicule == undefined) {
                    vehicule = carsitter.vehicule;
                }
                const result = yield carsitters.updateOne({ _id: new mongodb.ObjectId(carsitterID) }, { $set: { lastname: lastname, firstname: firstname, age: age, vehicule: vehicule } });
                console.log(`${result.modifiedCount} carsitter(s) was/were updated.`);
            }
            finally {
                yield this.client.close();
            }
        });
    }
    // CRUD pour les plannings
    // Ajouter un planning
    planningAdd(vehiculeID, carsitterID, date, time, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const database = this.client.db(this.databaseName);
                const plannings = database.collection('plannings');
                const carsitters = database.collection('carsitters');
                const vehicules = database.collection('vehicules');
                // On vérifie que le carsitter et la voiture existent dans la base de données
                const searchedCarsitter = yield carsitters.findOne({ _id: new mongodb.ObjectId(carsitterID) });
                const searchedVehicule = yield vehicules.findOne({ _id: new mongodb.ObjectId(vehiculeID) });
                if (searchedCarsitter == undefined) {
                    throw new Error("Carsitter not found");
                }
                if (searchedVehicule == undefined) {
                    throw new Error("Car not found");
                }
                // create a document to be inserted
                const insertedPlanning = {
                    vehicule_: vehiculeID,
                    date: date,
                    time: time,
                    duration: duration
                };
                const result = yield plannings.insertOne(insertedPlanning);
                console.log(`The planning(s) were inserted with the _id: ${result.insertedId}`);
            }
            finally {
                this.client.close();
            }
        });
    }
    // Récupérer tous les plannings
    planningGetAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const database = this.client.db(this.databaseName);
                const plannings = database.collection('plannings');
                const result = yield plannings.find({}).toArray();
                return result;
            }
            finally {
                yield this.client.close();
            }
        });
    }
    // Supprimer un planning
    planningDelete(planningID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const database = this.client.db('tp_ansible_docker');
                const plannings = database.collection('plannings');
                // On récupère le planning et verifie qu'il existe dans la base de données
                const planning = yield plannings.findOne({ _id: new mongodb.ObjectId(planningID) });
                if (planning == undefined) {
                    throw new Error("Planning not found");
                }
                const result = yield plannings.deleteOne({ _id: new mongodb.ObjectId(planningID) });
                console.log(`${result.deletedCount} planning(s) was/were deleted.`);
            }
            finally {
                yield this.client.close();
            }
        });
    }
    // Modifier un planning
    planningUpdate(planningID, carsitterID, vehiculeID, date, time, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const database = this.client.db('tp_ansible_docker');
                const plannings = database.collection('plannings');
                // On récupère le planning et verifie qu'il existe dans la base de données
                const planning = yield plannings.findOne({ _id: new mongodb.ObjectId(planningID) });
                if (planning == undefined) {
                    throw new Error("Planning not found");
                }
                // On verifie les champs qui ont été modifiés
                if (carsitterID == undefined) {
                    carsitterID = planning.carsitter_;
                }
                if (vehiculeID == undefined) {
                    vehiculeID = planning.vehicule_;
                }
                if (date == undefined) {
                    date = planning.date;
                }
                if (time == undefined) {
                    time = planning.time;
                }
                if (duration == undefined) {
                    duration = planning.duration;
                }
                const result = yield plannings.updateOne({ _id: new mongodb.ObjectId(planningID) }, { $set: { carsitter_: carsitterID, vehicule_: vehiculeID, date: date, time: time, duration: duration } });
                console.log(`${result.modifiedCount} planning(s) was/were updated.`);
            }
            finally {
                yield this.client.close();
            }
        });
    }
    // CRUD pour les clients
    clientAdd(Client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const database = this.client.db(this.databaseName);
                const clients = database.collection('clients');
                // create a document to be inserted
                const insertedClient = {
                    lastname: Client.lastname,
                    firstname: Client.firstname,
                    password: Client.password,
                    email: Client.email,
                    age: Client.age,
                    vehicule: Client.vehicule
                };
                const result = yield clients.insertOne(insertedClient);
                console.log(`The client(s) were inserted with the _id: ${result.insertedId}`);
            }
            finally {
                this.client.close();
            }
        });
    }
    // Récupérer tous les clients
    clientGetAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const database = this.client.db(this.databaseName);
                const clients = database.collection('clients');
                const result = yield clients.find({}).toArray();
                return result;
            }
            finally {
                yield this.client.close();
            }
        });
    }
    // Supprimer un client
    clientDelete(clientID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const database = this.client.db('tp_ansible_docker');
                const clients = database.collection('clients');
                // On récupère le client et verifie qu'il existe dans la base de données
                const client = yield clients.findOne({ _id: new mongodb.ObjectId(clientID) });
                if (client == undefined) {
                    throw new Error("Client not found");
                }
                const result = yield clients.deleteOne({ _id: new mongodb.ObjectId(clientID) });
                console.log(`${result.deletedCount} client(s) was/were deleted.`);
            }
            finally {
                yield this.client.close();
            }
        });
    }
    // Modifier un client
    clientUpdate(clientID, lastname, firstname, password, email, age, cars) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const database = this.client.db('tp_ansible_docker');
                const clients = database.collection('clients');
                // On récupère le client et verifie qu'il existe dans la base de données
                const client = yield clients.findOne({ _id: new mongodb.ObjectId(clientID) });
                if (client == undefined) {
                    throw new Error("Client not found");
                }
                // On verifie les champs qui ont été modifiés
                if (lastname == undefined) {
                    lastname = client.lastname;
                }
                if (firstname == undefined) {
                    firstname = client.firstname;
                }
                if (password == undefined) {
                    password = client.password;
                }
                if (email == undefined) {
                    email = client.email;
                }
                if (age == undefined) {
                    age = client.age;
                }
                if (cars == undefined) {
                    cars = client.cars;
                }
                const result = yield clients.updateOne({ _id: new mongodb.ObjectId(clientID) }, { $set: { lastname: lastname, firstname: firstname, password: password, email: email, age: age, cars: cars } });
                console.log(`${result.modifiedCount} client(s) was/were updated.`);
            }
            finally {
                yield this.client.close();
            }
        });
    }
}
exports.default = MongoDBConnector;
//# sourceMappingURL=index.js.map