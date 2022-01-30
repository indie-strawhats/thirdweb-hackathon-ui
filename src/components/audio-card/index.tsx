import React from 'react';
import Image from 'next/image';

export interface AudioCardProps {
  id: string;
  name: string;
  writtenBy: string;
  currencyUnit: string;
  price: string;
  balance: number;
  nameHandle: (data: any) => void;
  desc?: string;
  image: string;
  buttonName: string;
  buttonHandle: (name: string, tokenId: string) => void;
  className: string;
}

export const AudioCard = (props: AudioCardProps) => {
  const {
    id,
    name,
    writtenBy,
    nameHandle,
    desc,
    image,
    buttonName,
    buttonHandle,
    balance,
    price,
    currencyUnit,
    className,
  } = props;

  const renderBalance = () => {
    return `owned : ${balance}`;
  };

  return (
    <div className={`block bg-white rounded-lg shadow-md hover:shadow-xl ${className}`}>
      <div className="aspect-square">
        <Image
          src={image}
          alt="audio card picture"
          width={'100%'}
          height={'100%'}
          layout="responsive"
          className="rounded-t-lg"
        />
      </div>
      <div className="flex flex-row justify-between px-4 pt-4 ">
        <span className="px-2 py-1 text-xs font-semibold leading-none tracking-wide text-gray-600 uppercase bg-gray-200 rounded-full ">
          #{id}
        </span>
        {balance > 0 && (
          <span className="py-1 text-xs font-semibold leading-none tracking-wide text-gray-600 uppercas">
            {renderBalance()}
          </span>
        )}
      </div>
      <div className="flex flex-col px-4 pt-3 mb-2">
        <h1
          className="mb-2 font-bold text-gray-600 hover:cursor-pointer line-clamp-1"
          onClick={() => nameHandle(id)}
        >
          {name}
        </h1>
        <p className="mb-2 text-sm text-gray-600 line-clamp-1">{desc}</p>
        <p className="self-end text-sm italic text-gray-600">{`- ${writtenBy}`}</p>
      </div>
      <div className="h-10 border-t hover:border-transparent">
        <div
          className="grid w-full h-full mr-2 text-sm rounded-bl-lg rounded-br-lg hover:font-bold place-content-center group hover:cursor-pointer hover:text-white hover:bg-indigo-500"
          onClick={() => buttonHandle(name, id)}
        >
          <span className="font-semibold group-hover:hidden">{`${price} ${currencyUnit}`}</span>
          <span className="hidden group-hover:block">{buttonName}</span>
        </div>
      </div>
    </div>
  );
};
