'use client';

import { Fragment, useRef, useState } from 'react';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';

import { Dialog, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { userAtom } from '@/utils/store';
import { postVehicle, postVehicleProps } from '@/utils/fetch';

interface CarDepotProps {
  isOpen: boolean;
  closeModal: () => void;
}

const CarDepot = ({ isOpen, closeModal }: CarDepotProps) => {
  const [form, setForm] = useState<postVehicleProps>({
    vehicleType: '',
    type: '',
    model: '',
    mode: '',
    brand: '',
    duration: 0,
    price: 0,
  });
  const formRef = useRef<HTMLFormElement>(null);
  const [user, setUser] = useAtom(userAtom);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    inputName:
      | 'vehicleType'
      | 'type'
      | 'model'
      | 'mode'
      | 'brand'
      | 'duration'
      | 'price'
  ) => {
    setForm({
      ...form,
      [inputName]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !form.vehicleType ||
      !form.type ||
      !form.model ||
      !form.mode ||
      !form.brand ||
      !form.duration ||
      !form.price
    ) {
      toast.error('Please fill all the fields');
      return;
    }

    const notification = toast.loading('Wait for the AI to respond...');

    postVehicle(form)
      .then((res) => {
        console.log('vehicule', res);
        toast.success('Votre véhicule a été ajouté avec succès', {
          id: notification,
        });
      })
      .catch((err) => {
        toast.error('Une erreur est survenue', { id: notification });
      })
      .finally(() => {
        /* setForm({
          vehicleType: '',
          type: '',
          model: '',
          mode: '',
          brand: '',
          date: '',
          duration: '',
          price: 0,
        }); */

        closeModal();
      });
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-out duration-300'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5'>
                  <button
                    type='button'
                    className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
                    onClick={closeModal}
                  >
                    <Image
                      src='/close.svg'
                      alt='close'
                      width={20}
                      height={20}
                      className='object-contain'
                    />
                  </button>

                  <div
                    className='flex-1 flex flex-col gap-3'
                    data-theme='light'
                  >
                    <Toaster />
                    <div className='flex lg:flex-row flex-col justify-center items-center'>
                      <form
                        ref={formRef}
                        onSubmit={(e) => handleSubmit(e)}
                        className='w-fit rounded-2xl'
                      >
                        <div className='form-control max-w-xs w-[350px] sm:w-[400px]'>
                          <label className='label'>
                            <span className='label-text'>
                              Type de véhicule :
                            </span>
                          </label>
                          <input
                            type='text'
                            placeholder='Voiture | Moto | Vélo | Trottinette'
                            onChange={(e) => handleChange(e, 'vehicleType')}
                            value={form.vehicleType}
                            className='input input-bordered max-w-xs bg-white text-black'
                          />
                        </div>
                        <div className='form-control max-w-xs w-[350px] sm:w-[400px]'>
                          <label className='label'>
                            <span className='label-text'>
                              Boite de vitesse :
                            </span>
                          </label>
                          <input
                            type='text'
                            placeholder='manual | automatic'
                            onChange={(e) => handleChange(e, 'mode')}
                            value={form.mode}
                            className='input input-bordered max-w-xs bg-white text-black'
                          />
                        </div>
                        <div className='form-control max-w-xs w-[350px] sm:w-[400px]'>
                          <label className='label'>
                            <span className='label-text'>Modèle :</span>
                          </label>
                          <input
                            type='text'
                            placeholder='audi RS3 | audi A4 | ...'
                            onChange={(e) => handleChange(e, 'model')}
                            value={form.model}
                            className='input input-bordered max-w-xs bg-white text-black'
                          />
                        </div>
                        <div className='form-control max-w-xs w-[350px] sm:w-[400px]'>
                          <label className='label'>
                            <span className='label-text'>Carburant :</span>
                          </label>
                          <input
                            type='text'
                            placeholder='Essence | Diesel | ...'
                            onChange={(e) => handleChange(e, 'type')}
                            value={form.type}
                            className='input input-bordered max-w-xs bg-white text-black'
                          />
                        </div>
                        <div className='form-control max-w-xs w-[350px] sm:w-[400px]'>
                          <label className='label'>
                            <span className='label-text'>Marque :</span>
                          </label>
                          <input
                            type='text'
                            placeholder='audi | bmw | ...'
                            onChange={(e) => handleChange(e, 'brand')}
                            value={form.brand}
                            className='input input-bordered max-w-xs bg-white text-black'
                          />
                        </div>
                        <div className='form-control max-w-xs w-[350px] sm:w-[400px]'>
                          <label className='label'>
                            <span className='label-text'>Durée du dépot :</span>
                          </label>
                          <input
                            type='text'
                            placeholder='1 an | 2 ans | ...'
                            onChange={(e) => handleChange(e, 'duration')}
                            value={form.duration}
                            className='input input-bordered max-w-xs bg-white text-black'
                          />
                        </div>
                        <div className='form-control max-w-xs w-[350px] sm:w-[400px]'>
                          <label className='label'>
                            <span className='label-text'>
                              Prix location / jour :
                            </span>
                          </label>
                          <input
                            type='text'
                            placeholder='200'
                            onChange={(e) => handleChange(e, 'price')}
                            value={form.price}
                            className='input input-bordered max-w-xs bg-white text-black'
                          />
                        </div>

                        <button
                          type='submit'
                          className='btn bg-green-600 hover:bg-green-800 mt-6'
                        >
                          Envoyer
                        </button>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CarDepot;
