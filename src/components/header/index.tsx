import { ConnectWallet } from '@3rdweb/react';
import Link from 'next/link';
import React from 'react';
import Button from '../button';

const Header = () => (
  <div className="h-16 border-b border-gray-300 shadow-sm bg-gray-50">
    <div className="flex items-center justify-between w-full h-full px-8 m-auto max-w-7xl">
      <div>
        <Link href="/" passHref>
          <a className="text-4xl font-bold glowing-text" style={{ fontFamily: 'Cookie, cursive' }}>
            Audiobooks
          </a>
        </Link>
      </div>
      <div className="flex items-center">
        <Link href="/explore" passHref>
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
  </div>
);

export default Header;
