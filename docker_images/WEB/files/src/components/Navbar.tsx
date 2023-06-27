'use client';

import Link from 'next/link';
import Image from 'next/image';

import CustomButton from './CustomButton';
import { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { useAtom } from 'jotai';
import { userAtom } from '@/utils/store';
import { AiOutlineUser } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const [isOpenSignUp, setIsOpenSignUp] = useState<boolean>(false);
  const [isOpenSignIn, setIsOpenSignIn] = useState<boolean>(false);
  const [user] = useAtom(userAtom);
  const rooter = useRouter();

  return (
    <header className='w-full  absolute z-10'>
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent'>
        <Link href='/' className='flex justify-center items-center'>
          <Image
            src='/logo.svg'
            alt='logo'
            width={118}
            height={18}
            className='object-contain'
          />
        </Link>

        {user.prenom === '' && (
          <div className='flex flex-row'>
            <CustomButton
              title='Sign In'
              btnType='button'
              containerStyles='text-primary-blue rounded-full bg-white min-w-[130px]'
              handleClick={() => setIsOpenSignIn(true)}
            />
            <CustomButton
              title='Sign Up'
              btnType='button'
              containerStyles='text-primary-blue rounded-full bg-white min-w-[130px]'
              handleClick={() => setIsOpenSignUp(true)}
            />
          </div>
        )}

        <SignUp
          isOpen={isOpenSignUp}
          closeModal={() => setIsOpenSignUp(false)}
        />
        <SignIn
          isOpen={isOpenSignIn}
          closeModal={() => setIsOpenSignIn(false)}
        />

        {user.prenom !== '' && (
          <div
            className='flex flex-row justify-between items-center gap-2 p-2 border border-black rounded-lg cursor-pointer'
            onClick={() => rooter.push('/profile')}
          >
            <AiOutlineUser color='black' size='1.5rem' />
            <h3 className='text-black font-semibold text-lg'>Profile</h3>
          </div>
        )}
      </nav>
    </header>
  );
};
export default NavBar;
