import React from 'react';

const LoadingAudioCard = () => {
  return (
    <div className="block bg-white rounded-lg shadow-md hover:shadow-xl">
      <div className="grid aspect-square place-content-center">
        <div className="w-56 h-56 bg-gray-200 animate-pulse rounded-xl" />
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex justify-between h-8">
          <div className="w-16 h-full bg-gray-200 rounded-lg animate-pulse" />
          <div className="w-16 h-full bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="w-full h-8 bg-gray-200 rounded-lg animate-pulse" />
        <div className="w-full h-8 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  );
};

export default LoadingAudioCard;
