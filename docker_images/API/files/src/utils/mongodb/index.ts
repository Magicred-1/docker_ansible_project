import mongodb from 'mongodb';
import { config } from 'dotenv';
import { Vehicule, Carsitter, Planning, Client } from '../../interfaces/';

const { MongoClient } = mongodb;

config();
class MongoDBConnector {
    private uri: string;
    private client: mongodb.MongoClient;
    private databaseName: string;

    constructor() {
        this.uri = process.env.MONGODB_URI || '';
        this.client = new MongoClient(this.uri);
        this.databaseName = process.env.MONGODB_DB_NAME || '';
    }

    // CRUD pour les vehicules

    // Ajouter un vehicule
    async vehiculeAdd(vehicule: Vehicule) {
        try {
            await this.client.connect();
            const database = this.client.db(this.databaseName);
            const cars = database.collection('vehicules');

            // create a document to be inserted
            const insertedCar = {
                type: vehicule.type,
                brand: vehicule.brand,
                model: vehicule.model,
                price: vehicule.price,
                mode: vehicule.mode
            };

            const result = await cars.insertOne(insertedCar);
            console.log(
                `${result.insertedCount} car(s) were inserted with the _id: ${result.insertedId}`,
            );
        }
        finally {
            await this.client.close();
        }
    }

    // Récupérer toutes les vehicules
    async vehiculeGetAll() {
        try {
            await this.client.connect();
            const database = this.client.db(this.databaseName);
            const cars = database.collection('vehicules');

            const result = await cars.find({}).toArray();
            return result;
        }
        finally {
            await this.client.close();
        }
    }

    // Récupérer une voiture par son ID
    async vehiculeGetByID(vehiculeID: Vehicule["_id"]) {
        try {
            await this.client.connect();
            const database = this.client.db(this.databaseName);
            const vehicules = database.collection('vehicules');

            const result = await vehicules.findOne({ _id: new mongodb.ObjectID(vehiculeID) });

            if (result == undefined) {
                throw new Error("Vehicule not found");
            }

            return result;
        }
        finally {
            await this.client.close();
        }
    }

    // Supprimer une voiture
    async vehiculeDelete(vehiculeID: Vehicule["_id"]) {
        try {
            await this.client.connect();
            const database = this.client.db('tp_ansible_docker');
            const cars = database.collection('vehicules');

            // On récupère la voiture et verifie qu'elle existe dans la base de données
            const searchedVehicule = await cars.findOne({ _id: new mongodb.ObjectID(vehiculeID) });

            if (searchedVehicule == undefined) {
                throw new Error("Car not found");
            }

            const result = await cars.deleteOne({ _id: new mongodb.ObjectID(carID) });
            console.log(`${result.deletedCount} car(s) was/were deleted.`);
        }
        finally {
            await this.client.close();
        }
    }

    // Modifier une voiture
    async vehiculeUpdate(vehiculeID: Vehicule["_id"], type?: String, brand?: String, model?: String, price?: Number, mode?: String) {
        try {
            await this.client.connect();
            const database = this.client.db('tp_ansible_docker');
            const vehicules = database.collection('vehicules');

            // On récupère la voiture et vérifie qu'elle existe dans la base de données
            const searchedVehicule = await vehicules.findOne({ _id: new mongodb.ObjectID(vehiculeID) });
            if (searchedVehicule == undefined) {
                throw new Error("Car not found");
            }

            const result = await vehicules.updateOne(
                { _id: new mongodb.ObjectID(vehiculeID) },
                { $set: { type: type, brand: brand, model: model, price: price, mode: mode } }
            );
            console.log(`${result.modifiedCount} car(s) was/were updated.`);
        }
        finally {
            await this.client.close();
        }
    }


    // CRUD pour les carsitters
    // Pour les carsitters
    // carsitter: { _id: string, lastname: string, firstname: string, age: number }

    // Ajouter un carsitter
    async carsitterAdd(carsitter: Carsitter) {
        try {
            await this.client.connect();
            const database = this.client.db(this.databaseName);
            const carsitters = database.collection('carsitters');

            // on vérifie que le carsitter n'existe pas déjà
            const searchedCarsitter = await carsitters.findOne({ _id: new mongodb.ObjectID(carsitter["_id"]) });
            if (searchedCarsitter != undefined) {
                throw new Error("Carsitter already exists");
            }

            // create a document to be inserted
            const insertedCarsitter = {
                lastname: carsitter.lastname,
                firstname: carsitter.firstname,
                age: carsitter.age
            };

            const result = await carsitters.insertOne(insertedCarsitter);
            console.log(
                `${result.insertedCount} carsitter(s) were inserted with the _id: ${result.insertedId}`,
            );
        }
        finally {
            await this.client.close();
        }
    }

    // Récupérer tous les carsitters
    async carsitterGetAll() {
        try {
            await this.client.connect();
            const database = this.client.db(this.databaseName);
            const carsitters = database.collection('carsitters');

            const result = await carsitters.find({}).toArray();
            return result;
        }
        finally {
            await this.client.close();
        }
    }

    // Récupérer un carsitter par son ID

    // Supprimer un carsitter
    async carsitterDelete(carsitterID: Carsitter["_id"]) {
        try {
            await this.client.connect();
            const database = this.client.db('tp_ansible_docker');
            const carsitters = database.collection('carsitters');

            // On récupère le carsitter et verifie qu'il existe dans la base de données
            const carsitter = await carsitters.findOne({ _id: new mongodb.ObjectID(carsitterID) });

            if (carsitter == undefined) {
                throw new Error("Carsitter not found");
            }

            const result = await carsitters.deleteOne({ _id: new mongodb.ObjectID(carsitterID) });
            console.log(`${result.deletedCount} carsitter(s) was/were deleted.`);
        }
        finally {
            await this.client.close();
        }
    }

    // Modifier un carsitter
    async carsitterUpdate(carsitterID: Carsitter["_id"], lastname?: Carsitter["lastname"], firstname?: Carsitter["firstname"], age?: Carsitter["age"]) {
        try {
            await this.client.connect();
            const database = this.client.db('tp_ansible_docker');
            const carsitters = database.collection('carsitters');

            // On récupère le carsitter et verifie qu'il existe dans la base de données
            const carsitter = await carsitters.findOne({ _id: new mongodb.ObjectID(carsitterID) });

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

            const result = await carsitters.updateOne(
                { _id: new mongodb.ObjectID(carsitterID) },
                {  $set: { lastname: lastname, firstname: firstname, age: age, cars: cars } }
            );
            console.log(`${result.modifiedCount} carsitter(s) was/were updated.`);
        }
        finally {
            await this.client.close();
        }
    }

    // CRUD pour les plannings

    // Ajouter un planning
    async planningAdd(vehiculeID: Vehicule["_id"], date: Planning["date"], time: Date, duration: Number) {
        try {
            await this.client.connect();
            const database = this.client.db(this.databaseName);
            const plannings = database.collection('plannings');
            const carsitters = database.collection('carsitters');
            const vehicules = database.collection('vehicules');

            // On vérifie que le carsitter et la voiture existent dans la base de données
            const searchedCarsitter = await carsitters.findOne({ _id: new mongodb.ObjectID(carsitterID) });
            const searchedVehicule = await vehicules.findOne({ _id: new mongodb.ObjectID(vehiculeID) });

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

            const result = await plannings.insertOne(insertedPlanning);
            console.log(
                `${result.insertedCount} planning(s) were inserted with the _id: ${result.insertedId}`,
            );
        } finally {
            this.client.close();
        }
    }

    // Récupérer tous les plannings
    async planningGetAll() {
        try {
            await this.client.connect();
            const database = this.client.db(this.databaseName);
            const plannings = database.collection('plannings');

            const result = await plannings.find({}).toArray();
            return result;
        }
        finally {
            await this.client.close();
        }
    }

    // Supprimer un planning
    async planningDelete(planningID: Planning["_id"]) {
        try {
            await this.client.connect();
            const database = this.client.db('tp_ansible_docker');
            const plannings = database.collection('plannings');

            // On récupère le planning et verifie qu'il existe dans la base de données
            const planning = await plannings.findOne({ _id: new mongodb.ObjectID(planningID) });

            if (planning == undefined) {
                throw new Error("Planning not found");
            }

            const result = await plannings.deleteOne({ _id: new mongodb.ObjectID(planningID) });
            console.log(`${result.deletedCount} planning(s) was/were deleted.`);
        }
        finally {
            await this.client.close();
        }
    }

    // Modifier un planning
    async planningUpdate(planningID: Planning["_id"], carsitterID?: Carsitter["_id"], vehiculeID?: Vehicule["_id"], date?: Planning["date"], time?: Planning["time"], duration?: Planning["duration"]) {
        try {
            await this.client.connect();
            const database = this.client.db('tp_ansible_docker');
            const plannings = database.collection('plannings');

            // On récupère le planning et verifie qu'il existe dans la base de données
            const planning = await plannings.findOne({ _id: new mongodb.ObjectID(planningID) });

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

            const result = await plannings.updateOne(
                { _id: new mongodb.ObjectID(planningID) },
                { $set: { carsitter_: carsitterID, vehicule_: vehiculeID, date: date, time: time, duration: duration } }
            );
            console.log(`${result.modifiedCount} planning(s) was/were updated.`);
        }
        finally {
            await this.client.close();
        }
    }

    // CRUD pour les clients
    async clientAdd(lastname: Client["lastname"], firstname: Client["firstname"], password: Client["password"], email: Client["email"], age: Client["age"], vehiculeID: Vehicule["_id"]) {
        try {
            await this.client.connect();
            const database = this.client.db(this.databaseName);
            const clients = database.collection('clients');

            // create a document to be inserted
            const insertedClient = {
                lastname: lastname,
                firstname: firstname,
                password: password,
                email: email,
                age: age,
                vehicule: vehiculeID
            };

            const result = await clients.insertOne(insertedClient);
            console.log(
                `${result.insertedCount} client(s) were inserted with the _id: ${result.insertedId}`,
            );
        } finally {
            this.client.close();
        }
    }

    // Récupérer tous les clients
    async clientGetAll() {
        try {
            await this.client.connect();
            const database = this.client.db(this.databaseName);
            const clients = database.collection('clients');

            const result = await clients.find({}).toArray();
            return result;
        }
        finally {
            await this.client.close();
        }
    }

    // Supprimer un client
    async clientDelete(clientID: Client['_id']) {
        try {
            await this.client.connect();
            const database = this.client.db('tp_ansible_docker');
            const clients = database.collection('clients');

            // On récupère le client et verifie qu'il existe dans la base de données
            const client = await clients.findOne({ _id: new mongodb.ObjectID(clientID) });

            if (client == undefined) {
                throw new Error("Client not found");
            }

            const result = await clients.deleteOne({ _id: new mongodb.ObjectID(clientID) });
            console.log(`${result.deletedCount} client(s) was/were deleted.`);
        }
        finally {
            await this.client.close();
        }
    }

    // Modifier un client
    async clientUpdate(clientID: Client["_id"], lastname?: Client["lastname"], firstname?: Client["firstname"], password?: Client["password"], email?: Client["email"], age?: Client["age"], cars?: Vehicule) {
        try {
            await this.client.connect();
            const database = this.client.db('tp_ansible_docker');
            const clients = database.collection('clients');

            // On récupère le client et verifie qu'il existe dans la base de données
            const client = await clients.findOne({ _id: new mongodb.ObjectID(clientID) });

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

            const result = await clients.updateOne(
                { _id: new mongodb.ObjectID(clientID) },
                { $set: { lastname: lastname, firstname: firstname, password: password, email: email, age: age, cars: cars } }
            );
            console.log(`${result.modifiedCount} client(s) was/were updated.`);
        }
        finally {
            await this.client.close();
        }
    }


    // CRUD pour les plannings

    



}

export default MongoDBConnector;