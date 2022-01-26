import React from 'react';
import Image from 'next/image';

interface AudioCardProps {
  id: string;
  name: string;
  desc?: string;
  image: string;
  onClick: (data: any) => void;
}

export const AudioCard = (props: AudioCardProps) => {
  const { id, name, desc, image, onClick } = props;
  return (
    <div className='bg-white border border-gray-200 rounded-lg shadow-m'>
      <div className='rounded-t-lg aspect-square'>
        <Image
          src={image}
          alt='audio card picture'
          width={'100%'}
          height={'100%'}
          layout='responsive'
        />
      </div>
      <div className='px-6 pt-4 pb-2'>
        <span className='inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full'>
          #{id}
        </span>
      </div>
      <div className='p-5'>
        <a href='#'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
            {name}
          </h5>
        </a>
        <p className='mb-3 font-normal text-gray-700'>{desc}</p>
        <button onClick={() => onClick(Number(id))}>Purchase</button>
      </div>
    </div>
  );
};
