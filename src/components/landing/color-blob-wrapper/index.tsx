import React, { FC } from 'react';

type BlobSize = 'small' | 'large';

interface ColorBlobWrapperProps {
  blobSize?: BlobSize;
  children: React.ReactNode | string;
}

const ColorBlobWrapper: FC<ColorBlobWrapperProps> = ({ children, blobSize = 'small' }) => {
  const returnBlobVariant = () => {
    switch (blobSize) {
      case 'small':
        return (
          <>
            <div className="absolute top-0 w-64 h-64 bg-purple-300 rounded-full -left-2 mix4nd-multiply filter blur-xl opacity-60 animate-blob"></div>
            <div className="absolute top-0 w-64 h-64 bg-yellow-300 rounded-full -right-2 mix4nd-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
            <div className="absolute w-64 h-64 bg-pink-300 rounded-full -bottom-8 left-14 mix4nd-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
          </>
        );
      case 'large':
      default:
        return (
          <>
            <div className="absolute top-0 bg-purple-300 rounded-full w-72 h-72 -left-2 mix4nd-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 bg-yellow-300 rounded-full w-72 h-72 -right-2 mix4nd-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bg-pink-300 rounded-full w-72 h-72 -bottom-8 left-14 mix4nd-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </>
        );
    }
  };

  return (
    <div className="w-full h-full">
      <div className="relative w-full max-w-lg">
        {returnBlobVariant()}
        <div className="relative m-8">{children}</div>
      </div>
    </div>
  );
};

export default ColorBlobWrapper;
