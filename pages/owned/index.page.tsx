import { ThirdwebSDK } from '@3rdweb/sdk';
import { useEthers } from '@usedapp/core';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import Button from '../../src/components/button';
import PlayCard from '../../src/components/play-card';
import { AppWeb3Context } from '../../src/providers/app-web3';

const OwnedPage: NextPage = () => {
  const [purchasedAudiobooks, setPurchasedAudiobooks] = useState<any[]>([]);

  const { account } = useEthers();
  const { dropBundleModule } = useContext(AppWeb3Context);

  useEffect(() => {
    (async () => {
      const ownedABResponse = await dropBundleModule?.getOwned();

      let claimed = ownedABResponse?.map((item) => ({
        id: item.metadata.id,
        name: item.metadata.name,
        desc: item.metadata.description,
        properties: item.metadata.properties,
        image: item.metadata.image,
        uri: item.metadata.animation_url,
      }));

      const audiobookUrlsResponse = await fetch('/api/get-audiobooks', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          tokenIds: claimed?.map((item) => item.id),
        }),
      });

      const audiobookUrls = await audiobookUrlsResponse.json();

      claimed = claimed?.map((item) => ({
        ...item,
        fileUrl: audiobookUrls[item.id],
      }));

      if (claimed) {
        setPurchasedAudiobooks(claimed);
      }
    })();
  }, [dropBundleModule, account]);

  const renderPurchasedAudiobooks = () => {
    return (
      <div className="grid grid-cols-1-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
