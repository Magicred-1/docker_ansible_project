// Ce fichier est exécuté au démarrage du container MongoDB
// Il permet de créer la base de données et d'insérer des données de démonstration

conn = new Mongo();

// Sélection de la base de données
db = conn.getDB("tp_ansible_docker");

// Création d'une collection et insertion de données de démonstration
db.createCollection("vehicules");
db.vehicules.insertMany([
    { type: "voiture", brand: "Toyota", model: "Camry" },
    { type: "moto", brand: "Honda", model: "CBR600RR" },
]);

// Création d'une collection pour les carsitters
db.createCollection("carsitters");
db.carsitters.insertMany([
    { lastname: "Dupont", firstname: "Jean", age: 25, vehicule: "voiture" },
    { lastname: "Durand", firstname: "Pierre", age: 30, vehicule: "moto" },
]);

// Création d'une collection pour le planning
db.createCollection("planning");
db.planning.insertMany([
    { carsitter_: ObjectId("5f9b0b4b9b0b4b9b0b4b9b0b"), date: "2020-11-01", heure: "08:00", duree: 2 },
    { carsitter_: ObjectId("5f9b0b4b9b0b4b9b0b4b9b0b"), date: "2020-11-01", heure: "10:00", duree: 1 }
]);