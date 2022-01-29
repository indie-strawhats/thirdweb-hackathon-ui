import { ThirdwebSDK } from '@3rdweb/sdk';
import { ethers } from 'ethers';
import { NextApiRequest, NextApiResponse } from 'next';

// This depend on your HTTP Server setup. In this example, we're using next.js
// api handlers.
export default function purchaseAudiobook(req: NextApiRequest, res: NextApiResponse): Promise<any> {
  // the RPC URL to the blockchain that the NFT contract is deployed on.
  // "rinkeby" = rinkeby testnet,
  // "https://rpc-mumbai.maticvigil.com" = mumbai testnet.
  const rpcUrl = 'rinkeby';

  // setup a wallet using private key for the SDK.
  // the wallet must have MINTER role to mint the NFT.
  // you can assign MINTER role to the wallet through the NFT collection dashboard.
  const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY as string,
    ethers.getDefaultProvider(rpcUrl),
  );

  // initialize the SDK and get the NFT Collection module
  // get the contract address (0x...) from your dashboard!
  const nft = new ThirdwebSDK(wallet).getNFTModule('0x68BC0Bf7784D28Efb7346587dfb796B20710C67D');

  // returning the HTTP response. This depends on the HTTP server framework.
  return new Promise<void>((resolve) => {
    // get the wallet address that's sent in from the request body.
    const { account, fileData } = req.body;

    // mint "My Sword" NFT to the wallet address that was requested.
    // note: async / await works too.
    nft
      .mintTo(account, {
        name: 'My Sword 1',
        description: 'My Sword NFT description',
        image: fileData,
      })
      .then((metadata) => {
        // Returning the NFT metadata to the client requested.
        // This depends on the HTTP server framework
        res.status(200).json(metadata);
        resolve();
      });
  });
}
