import Link from 'next/link';
import React from 'react';
import Button from '../button';
import ConnectButton from '../connect-button';

const Header = () => {
  return (
    <div className="h-16 bg-gray-50 flex items-center justify-between px-8 border-b border-gray-300 shadow-sm">
      <div>
        <Link href="/" passHref>
          <a className="font-semibold text-xl text-gray-600 hover:text-gray-800">
            Awesome Audiobooks
          </a>
        </Link>
      </div>
      <div>
        <Link href="/owned" passHref>
          <Button>My Audiobooks</Button>
        </Link>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Header;
