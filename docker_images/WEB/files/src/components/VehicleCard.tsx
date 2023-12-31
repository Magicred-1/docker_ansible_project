'use client';

import { useState } from 'react';
import Image from 'next/image';
import CustomButton from './CustomButton';
import CarDetails from './VehicleDetails';

export interface VehicleProps {
  _id?: string;
  vehicleType: 'Car' | 'Moto';
  type: 'Essence' | 'Diesel' | 'Hybrid' | 'Electric';
  mode: 'Automatic' | 'Manual';
  price: number;
  brand: string;
  model: string;
  date: string;
  duration: string;
  imgPath?: string;
}
interface VehicleCardProps {
  vehicle: VehicleProps;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const { model, imgPath, type, price, mode } = vehicle;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='car-card group'>
      <div className='car-card__content'>
        <h2 className='car-card__content-title'>{model}</h2>
      </div>

      <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
        {price}€
      </p>

      <div className='relative w-full h-40 my-3 object-contain'>
        <Image
          src={imgPath || '/audi-RS3.jpeg'}
          alt='car model'
          fill
          priority
          className='object-contain'
        />
      </div>

      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible w-full justify-between text-grey'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image
              src='/steering-wheel.svg'
              width={20}
              height={20}
              alt='steering wheel'
            />
            <p className='text-[14px] leading-[17px]'>{mode}</p>
          </div>
          <div className='car-card__icon'>
            <Image src='/tire.svg' width={20} height={20} alt='seat' />
            <p className='car-card__icon-text'>{model}</p>
          </div>
          <div className='car-card__icon'>
            <Image src='/gas.svg' width={20} height={20} alt='seat' />
            <p className='car-card__icon-text'>{type}</p>
          </div>
        </div>

        <div className='car-card__btn-container'>
          <CustomButton
            title='View More'
            containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
            textStyles='text-white text-[14px] leading-[17px] font-bold'
            rightIcon='/right-arrow.svg'
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        vehicle={vehicle}
      />
    </div>
  );
};

export default VehicleCard;
