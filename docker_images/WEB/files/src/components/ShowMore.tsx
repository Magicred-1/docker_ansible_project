'use client';

import { useRouter } from 'next/navigation';

import { ShowMoreProps } from '@/utils';
import { CustomButton } from '@/components';

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  return (
    <div className='w-full flex-center gap-5 mt-10'>
      {!isNext && (
        <CustomButton
          btnType='button'
          title='Show More'
          containerStyles='bg-primary-blue rounded-full text-white'
        />
      )}
    </div>
  );
};

export default ShowMore;
