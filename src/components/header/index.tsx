import Link from 'next/link';
import React from 'react';
import Button from '../button';
import ConnectButton from '../connect-button';

const Header = () => {
  return (
    <div className='flex items-center justify-between h-16 px-8 border-b border-gray-300 shadow-sm bg-gray-50'>
      <div>
        <Link href='/' passHref>
          <a className='text-xl font-semibold text-gray-600 hover:text-gray-800'>
            Awesome Audiobooks
          </a>
        </Link>
      </div>
      <div>
        <Link href='/owned' passHref>
          <Button variant='ghost'>My Audiobooks</Button>
        </Link>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Header;
