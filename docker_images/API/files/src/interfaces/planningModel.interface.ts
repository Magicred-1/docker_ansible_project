import { Carsitter } from './carsitterModel.interface';
import { Vehicule } from './vehiculeModel.interface';

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
