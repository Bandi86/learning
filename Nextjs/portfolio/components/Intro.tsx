import Image from 'next/image';
import React from 'react';

const Intro = () => {
  return (
    <section>
      <div className='flex items-center justify-center'>
        <div className='relative'>
          <Image
            src='https://images.unsplash.com/photo-1617196701537-7329482cc9fe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='me'
            width={200}
            height={200}
            quality={95}
            priority={true}
            className='h-24 w-24 rounded-full border-[0.35rem] object-cover border-white shadow-xl'
          />
          <span className='absolute text-4xl bottom-0 right-0'>
            👏
          </span>
        </div>
      </div>
    </section>
  );
};

export default Intro;
