import { Carsitter } from '../carsitter/carsitter';
import { Vehicule } from '../vehicule/vehicule';

interface Planning {
    _id: string;
    carsitter: Carsitter;
    vehicule?: Vehicule;
    date: Date;
    time: Date;
    duration: number;
}

export { Planning };

