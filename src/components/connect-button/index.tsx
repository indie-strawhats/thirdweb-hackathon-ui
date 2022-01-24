import { useEtherBalance, useEthers } from '@usedapp/core';
import Link from 'next/link';
import React from 'react';

const ConnectButton = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const accountBalance = useEtherBalance(account);

  return (
    <>
      {/* <p>
        Balance -{' '}
        {accountBalance && formatEther(accountBalance).substring(0, 8) + ' ETH'}
      </p> */}
      <Link href="/owned" passHref>
        <button>My Audiobooks</button>
      </Link>
      <button
        onClick={() => (account ? deactivate() : activateBrowserWallet())}
      >
        {account ? 'DisConnect' : 'Connect'}
      </button>
    </>
  );
};

export default ConnectButton;
