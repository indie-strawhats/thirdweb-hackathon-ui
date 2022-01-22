import { formatEther } from '@ethersproject/units';
import { Button } from '@mui/material';
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
        <Button>My Audiobooks</Button>
      </Link>
      <Button
        variant="outlined"
        onClick={() => (account ? deactivate() : activateBrowserWallet())}
      >
        {account ? 'DisConnect' : 'Connect'}
      </Button>
    </>
  );
};

export default ConnectButton;
