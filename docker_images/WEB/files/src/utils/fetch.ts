export interface postVehicleProps {
  vehicleType: 'car' | 'moto' | '';
  type: 'essence' | 'diesel' | 'electrique' | 'hybride' | '';
  model: string;
  mode: 'auto' | 'manual' | '';
  brand: string;
  duration: number;
  price: number;
}

export async function postVehicle(vehicle: postVehicleProps) {
  console.log('vehicule info :', vehicle);
  const response = await fetch(`${'http://localhost:3002'}/vehicules`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vehicle),
  });
  return response.json();
}
