import { Carsitter } from '../carsitter/carsitter';
import { Vehicule } from '../vehicule/vehicule';

interface Planning {
    _id?: string;
    clientID?: string;
    carsitterID?: Carsitter['_id'];
    vehiculeID?: Vehicule['_id'];
    date?: Date;
    time?: Date;
    duration?: number;
}

export { Planning };

