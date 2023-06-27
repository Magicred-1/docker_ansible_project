'use client';

import { useAtom } from 'jotai';
import { userAtom } from '@/utils/store';

const page = () => {
  const [user] = useAtom(userAtom);
  return (
    <div className='flex-1 pt-36 padding-x'>
      <div className='home__text-container'>
        <h1 className='text-4xl font-extrabold'>Compte</h1>
        <p>
          <span className='font-bold'>
            {user.prenom} {user.nom}
          </span>
          , {user.email} vous êtes connecté
        </p>
      </div>

      <div className='mt-12 flex flex-col md:flex-row gap-24'>
        <div
          className='flex shadow-xl rounded-xl border border-black justify-center items-center w-[240px] md:w-auto
            py-2 px-8 gap-8 h-[200px]'
        >
          <div className='flex flex-col items-center justify-center'>
            <div className='rounded-full bg-gray-900 text-white font-bold text-2xl py-4 px-6'>
              {user.prenom.slice(0, 1)}
            </div>
            <h4 className='font-bold text-xl mt-4'>{user.prenom}</h4>
            <span className='text-sm italic'>Carsitters</span>
          </div>

          <div>
            <div className='flex flex-col'>
              3 <br />
              <span className='text-sm italic'>évaluations</span>
              <div className='border border-black w-full my-2' />
              2 <br />
              <span className='text-sm italic'>mois sur CarHub</span>
            </div>
          </div>
        </div>

        <div>
          <div className='border border-slate-200 w-full mb-12' />
          <h2 className='font-bold text-xl'>
            Il est temps de créer votre profil
          </h2>
          <p className='mt-4 text-gray-500 text-sm'>
            Votre profil CarHub joue un rôle important dans toutes les
            réservations. Créez le vôtre pour aider les utilisateurs à mieux
            vous connaître.
          </p>
          <button className='px-4 py-2 border border-black rounded-lg hover:bg-slate-600 hover:text-white mt-6'>
            Créer un profil
          </button>
          <div className='border border-slate-200 w-full my-12' />
          <h2 className='font-bold text-xl'>
            Commentaires et évaluations reçus
          </h2>
          <p className='mt-4 text-gray-500 text-sm'>
            Aucune évalution pour le moment !
          </p>
          <div className='border border-slate-200 w-full my-12' />
          <h2 className='font-bold text-xl'>
            Réservations en cours et passées
          </h2>
          <p className='mt-4 text-gray-500 text-sm'>
            Aucune réservation pour le moment !
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
