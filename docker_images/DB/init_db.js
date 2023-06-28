/*
    Ce fichier est exécuté au démarrage du container MongoDB
    Il permet de créer la base de données et d'insérer des données de démonstration
*/

let connection = new Mongo();

// Sélection de la base de données
let db = connection.getDB("tp_ansible_docker");

/* 
    Création d'une collection et 
    insertion de données de démonstration motos & voitures.

    #_id: ObjectId;
    # type: string;
    # brand: string;
    # model: string;
    # price: number;
    # mode: string;
    # vehiculeType: string;
*/

db.createCollection("vehicules");
db.vehicules.insertMany([
    { _id: ObjectId("5f9b0b4b9b0b4b9b0b4b9b0b"), type: "Hydrid", brand: "Toyota", model: "Camry", price: "4000", mode: "automatic", vehiculeType: "car" },
    { _id: ObjectId("5f9b0b4b9b0b4b9b0b4b9b0c"), type: "Hydrid", brand: "Toyota", model: "Prius", price: "3000", mode: "automatic", vehiculeType: "car" },
    { _id: ObjectId("5f9b0b4b9b0b4b9b0b4b9b0d"), type: "Essence", brand: "Toyota", model: "Yaris", price: "2000", mode: "automatic", vehiculeType: "car" },
    { _id: ObjectId("5f9b0b4b9b0b4b9b0b4b9b8r"), type: "Essence", brand: "Yamaha", model: "MT-10", price: "3000", mode: "manual", vehiculeType: "moto" },
    { _id: ObjectId("5f9b0b4b9b0b4b9b0b4b9b0e"), type: "Essence", brand: "Yamaha", model: "MT-09", price: "2000", mode: "manual", vehiculeType: "moto" },
    { _id: ObjectId("5f9b0b4b9b0b4b9b0b4b9b0f"), type: "Essence", brand: "Yamaha", model: "MT-07", price: "1000", mode: "manual", vehiculeType: "moto" },
]);

// Création d'une collection pour les carsitters
/*
    #_id: ObjectId;
    # lastname: string;
    # firstname: string;
    # age: number;
*/

db.createCollection("carsitters");
db.carsitters.insertMany([
    {
        _id: ObjectId("5f9b0b4b9b0b4b9b0b4b9u4d"),
        lastname: "Dupont",
        firstname: "Jean",
        age: 25
    },
    {
        _id: ObjectId("5f9b0b4b9b0b4b9b0b4b9u4e"),
        lastname: "Jonathan",
        firstname: "Mallia",
        age: 23
    },
    {
        _id: ObjectId("5f9b0b4b9b0b4b9b0b4b9u4f"),
        lastname: "Adolpho",
        firstname: "Ramirez",
        age: 45
    },
]);

// Création d'une collection pour le planning
/*
    #_id: ObjectId;
    # carsitterID: Carsitter;
    # vehiculeID: Vehicule;
    # clientID: Client;
    date: Date;
    time: Date;
    duration: number;
*/

db.createCollection("plannings");
db.planning.insertMany([
    { 
        carsitterID: ObjectId("5f9b0b4b9b0b4b9b0b4b9b0b"), vehiculeID: ObjectId("5f9b0b4b9b0b4b9b0b4b9b0b"), 
        clientID: ObjectId("5f9b0b4b9b0b4b9b0b4b9b0b"), date: "2020-11-01", 
        time: "10:00", duration: 1 
    },
    { 
        carsitterID: ObjectId("5f9b0b4b9b0b4b9b0b4b9b0b"), vehiculeID: ObjectId("5f9b0b4b9b0b4b9b0b4b9b0e"),
        clientID: ObjectId("5f9b0b4b9b0b4b9b0b4b9b0b"), date: "2020-11-01",
        time: "11:00", duration: 1 
    },
]);

// Création d'une collection pour les clients
/*
    #_id: ObjectId;
    # lastname: string;
    # firstname: string;
    # email: string;
    # password: string;
    # age: number;
*/
db.createCollection("clients");
db.clients.insertMany([
    { 
        lastname: "Dupont", firstname: "Jean", 
        email:"dupont.jean@hotmail.fr", password:"esrdt$FDE343434yguhiklmnjvghjyiuojlkjv", 
        age: 25
    },
]);