import { useEtherBalance, useEthers } from '@usedapp/core';
import Link from 'next/link';
import React from 'react';
import Button from '../button';

const ConnectButton = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const accountBalance = useEtherBalance(account);

  return (
    <>
      <Button
        variant="primary"
        onClick={() => (account ? deactivate() : activateBrowserWallet())}
      >
        {account ? 'Disconnect' : 'Connect'}
      </Button>
    </>
  );
};

export default ConnectButton;
