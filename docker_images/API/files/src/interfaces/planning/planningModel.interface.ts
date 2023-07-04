import { Carsitter } from '../carsitter/carsitterModel.interface';
import { Vehicule } from '../vehicule/vehiculeModel.interface';

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

