import { ThirdwebSDK } from '@3rdweb/sdk';
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';

// Get the Membership NFT info from your dashboard. (thirdweb.com/dashboard)
const MEMBERSHIP_NFT_CONTRACT_ADDRESS = '0x9dba0b76852c23176FaAc6082491e2138FfF2EDa';
const MEMBERSHIP_NFT_TOKEN_ID = '3';

export const useWalletMembershipAccess = (tokenId: string = MEMBERSHIP_NFT_TOKEN_ID) => {
  // react states for chechking if user can access or not
  const [access, setAccess] = useState(false);
  const { account, library } = useWeb3React();

  async function checkWalletMembership() {
    // Get the connected wallet Signer
    const signer = library.getSigner(account);

    /*
    Our SDK takes in a valid Signer or Provider.
    A signer can perform READ and WRITE calls on the blockchain.
    A provider can only perform READ calls on the blockchain.
    read more: <https://docs.ethers.io/v5/api/signer>
    */
    const module = new ThirdwebSDK(signer).getBundleDropModule(MEMBERSHIP_NFT_CONTRACT_ADDRESS);
    const balance = await module.balance(tokenId);

    return balance.toNumber() >= 1;
  }

  // check wallet when account is connected
  if (library && account) {
    checkWalletMembership().then(setAccess);
  } else if (access) {
    // reset the state if wallet is disconnected
    setAccess(false);
  }

  return access;
};
