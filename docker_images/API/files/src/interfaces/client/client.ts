import { Vehicule } from "../vehicule/vehicule";

interface Client {
    _id?: string;
    lastname?: string;
    firstname?: string;
    email?: string;
    age?: number;
    password?: string;
    vehicule?: Vehicule;
}

export { Client };