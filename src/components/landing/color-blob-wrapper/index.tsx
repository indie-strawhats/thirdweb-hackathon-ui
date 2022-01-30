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
            <div className="absolute top-0 w-64 h-64 bg-purple-200 rounded-full -left-2 mix4nd-multiply filter blur-xl opacity-60 animate-blob"></div>
            <div className="absolute top-0 w-64 h-64 bg-yellow-200 rounded-full -right-2 mix4nd-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
            <div className="absolute w-64 h-64 bg-pink-200 rounded-full -bottom-8 left-14 mix4nd-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
          </>
        );
      case 'large':
      default:
        return (
          <>
            <div className="absolute top-0 bg-purple-200 rounded-full w-96 h-96 -left-2 mix4nd-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 bg-yellow-200 rounded-full w-96 h-96 -right-2 mix4nd-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bg-pink-200 rounded-full w-96 h-96 -bottom-8 left-14 mix4nd-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </>
        );
    }
  };

  return (
    <div className="w-full h-full">
      <div className="relative w-full">
        {returnBlobVariant()}
        <div className="relative w-full">{children}</div>
      </div>
    </div>
  );
};

export default ColorBlobWrapper;
