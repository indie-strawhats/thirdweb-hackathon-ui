import { ConnectWallet } from '@3rdweb/react';
import Link from 'next/link';
import React from 'react';
import Button from '../button';

const Header = () => (
  <div className="flex items-center justify-between h-16 px-8 border-b border-gray-300 shadow-sm bg-gray-50">
    <div>
      <Link href="/landing" passHref>
        <a className="text-xl font-semibold text-gray-600 hover:text-gray-800">
          Awesome Audiobooks
        </a>
      </Link>
    </div>
    <div className="flex items-center">
      <Link href="/" passHref>
        <Button className="mr-4" variant="ghost">
          Explore
        </Button>
      </Link>
      <Link href="/owned" passHref>
        <Button className="mr-4" variant="ghost">
          My Audiobooks
        </Button>
      </Link>
      <ConnectWallet className="" />
    </div>
  </div>
);

export default Header;
