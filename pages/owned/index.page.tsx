import { ThirdwebSDK } from '@3rdweb/sdk';
import { useEthers } from '@usedapp/core';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useMemo, useState } from 'react';
import PlayCard from '../../src/components/play-card';

const OwnedPage: NextPage = () => {
  const [purchasedAudiobooks, setPurchasedAudiobooks] = useState<any[]>([]);
  const { library } = useEthers();

  const sdk = useMemo(
    () => (library ? new ThirdwebSDK(library.getSigner()) : undefined),
    [library]
  );

  const dropBundleModule = useMemo(
    () =>
      sdk
        ? sdk.getBundleDropModule('0x9dba0b76852c23176FaAc6082491e2138FfF2EDa')
        : undefined,
    [sdk]
  );

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
  }, [dropBundleModule]);

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/get-audiobooks', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          tokenIds: '0',
        }),
      });
    })();
  }, []);

  const renderPurchasedAudiobooks = () => {
    return (
      <div>
        {purchasedAudiobooks.map((ab) => (
          <div key={ab.id}>
            <PlayCard data={ab} onPurchase={(id: number) => {}} />
          </div>
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
