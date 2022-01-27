import { useEthers } from '@usedapp/core';
import Link from 'next/link';
import React from 'react';
import Button from '../button';
import ConnectButton from '../connect-button';

const Header = () => {
  const { account } = useEthers();

  console.log(account, process.env.NEXT_PUBLIC_ADMIN_ACCOUNT_ADDRESS);

  return (
    <div className="flex items-center justify-between h-16 px-8 border-b border-gray-300 shadow-sm bg-gray-50">
      <div>
        <Link href="/" passHref>
          <a className="text-xl font-semibold text-gray-600 hover:text-gray-800">
            Awesome Audiobooks
          </a>
        </Link>
      </div>
      <div className="flex items-center">
        <Link href="/owned" passHref>
          <Button className="mr-2" variant="primary">
            My Audiobooks
          </Button>
        </Link>
        {account === process.env.NEXT_PUBLIC_ADMIN_ACCOUNT_ADDRESS && (
          <Link href="/dashboard" passHref>
            <Button className="mr-2" variant="primary">
              Dashboard
            </Button>
          </Link>
        )}
        <ConnectButton />
      </div>
    </div>
  );
};

export default Header;
