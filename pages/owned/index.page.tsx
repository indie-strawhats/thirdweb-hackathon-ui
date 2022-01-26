import { ThirdwebSDK } from '@3rdweb/sdk';
import { useEthers } from '@usedapp/core';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import Button from '../../src/components/button';
import PlayCard from '../../src/components/play-card';
import { AppWeb3Context } from '../../src/providers/app-web3';
import { BigNumber } from '@3rdweb/sdk/node_modules/ethers';
import { getClaimedAudiobooks } from '../../src/services/web3';

const OwnedPage: NextPage = () => {
  const [purchasedAudiobooks, setPurchasedAudiobooks] = useState<any[]>([]);

  const { account } = useEthers();
  const { dropBundleModule } = useContext(AppWeb3Context);

  useEffect(() => {
    (async () => {
      if (!dropBundleModule) return;

      const claimedNFTs = await getClaimedAudiobooks(dropBundleModule);

      if (claimedNFTs) {
        setPurchasedAudiobooks(claimedNFTs);
      }
    })();
  }, [dropBundleModule, account]);

  const renderPurchasedAudiobooks = () => {
    return (
      <div className="grid gap-4 grid-cols-1-1 sm:grid-cols-2 lg:grid-cols-4">
        {purchasedAudiobooks.map((ab) => (
          <PlayCard key={ab.id} data={ab} onPurchase={(id: number) => {}} />
        ))}
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Awesome Audiobooks - Owned</title>
        <meta name="description" content="Awesome Audiobooks - Owned" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h5 style={{ marginBottom: 10 }}>Collection</h5>
      <br />
      <br />

      {purchasedAudiobooks.length > 0 && renderPurchasedAudiobooks()}

      <br />
      <br />
    </>
  );
};

export default OwnedPage;
