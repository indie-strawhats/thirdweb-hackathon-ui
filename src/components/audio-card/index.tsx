import React from 'react';
import Image from 'next/image';

interface AudioCardProps {
  id: string;
  name: string;
  nameHandle?: (data: any) => void;
  desc?: string;
  image: string;
  buttonName: string;
  buttonHandle: (data: any) => void;
}

export const AudioCard = (props: AudioCardProps) => {
  const { id, name, nameHandle, desc, image, buttonName, buttonHandle } = props;
  return (
    <div className='block bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl'>
      <div className='rounded-t-lg aspect-square'>
        <Image
          src={image}
          alt='audio card picture'
          width={'100%'}
          height={'100%'}
          layout='responsive'
        />
      </div>
      <div className='px-4 pt-4'>
        <span className='inline-block px-2 py-1 text-xs font-semibold leading-none tracking-wide text-gray-600 uppercase bg-gray-200 rounded-full'>
          #{id}
        </span>
        <h2
          className='mt-2 mb-2 font-bold text-gray-600 hover:cursor-pointer'
          onClick={() => nameHandle(id)}
        >
          {name}
        </h2>
        <p className='block mb-2 overflow-hidden text-sm text-gray-600'>
          {desc}
        </p>
      </div>
      <div className='p-2 px-6 text-sm border-t'>
        <button
          className='mr-2 font-bold text-white hover:text-gray-600'
          onClick={() => buttonHandle(Number(id))}
        >
          {buttonName}
        </button>
      </div>
    </div>
  );
};
