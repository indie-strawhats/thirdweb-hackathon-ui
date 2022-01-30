import { ConnectWallet } from '@3rdweb/react';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Button from '../../src/components/button';
import Section from '../../src/components/landing/section';
import { NewYear } from '../../src/icons/landing/newyear';

const LandingPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Awesome Audiobooks</title>
        <meta name="description" content="Awesome Audiobooks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-between h-16 px-8 border-b border-gray-300 shadow-sm bg-gray-50">
        <Link href="/landing" passHref>
          <a className="text-xl font-semibold text-gray-600 hover:text-gray-800">
            Awesome Audiobooks
          </a>
        </Link>
        <div className="flex items-center">
          <ConnectWallet />
        </div>
      </div>
      {/* <div className="flex flex-row items-center justify-between w-screen h-auto bg-gray-200">
        <div className="ml-48">
          <Link href="/" passHref>
            <Button className="h-16 mr-4 " variant="primary">
              Explore
            </Button>
          </Link>
        </div>
        <NewYear />
      </div> */}
      <div className="flex flex-col w-full h-full overflow-hidden">
        <Section
          image={''}
          sectionHeading="Before they sold"
          textContent="Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
            plant cold-pressed tacos poke beard tote bag. Heirloom echo park
            mlkshk tote bag selvage."
        />
        <Section
          image={''}
          sectionHeading="Before outreadymade gluten"
          textContent="Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
            plant cold-pressed tacos poke beard tote bag. Heirloom echo park
            mlkshk tote bag selvage."
          imagePosition="right"
        />
        <Section
          image={''}
          sectionHeading="old outreadymade gluten"
          textContent="Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
            plant hot chicken authentic tumeric truffaut
            hexagon try-hard chambray."
        />
      </div>
      <div className="grid w-screen text-4xl text-white bg-indigo-500 h-72 Block place-content-center">
        Footer Goes here
      </div>
    </>
  );
};

export default LandingPage;
