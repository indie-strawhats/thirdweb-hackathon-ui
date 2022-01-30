import { ConnectWallet } from '@3rdweb/react';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Button from '../src/components/button';
import Section from '../src/components/landing/section';
import { NewYear } from '../src/icons/landing/newyear';

import styles from './styles.module.scss'

const LandingPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Awesome Audiobooks</title>
        <meta name="description" content="Awesome Audiobooks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-between h-20 px-8 bg-white">
        <Link href="/" passHref>
          <a className="text-xl font-semibold text-gray-600 hover:text-gray-800">
            Awesome Audiobooks
          </a>
        </Link>
        <div className="flex items-center">
          <ConnectWallet />
        </div>
      </div>
      <div className="w-full py-24 mb-24">
        <div className='flex flex-col items-start max-w-4xl m-auto'>
        <p className={`flex flex-col mb-16 items-start font-extrabold text-8xl ${styles['landing-text']} tracking-tighter`}>
          <span>Experience</span>
          <span>Premium</span>
          <span>Story-telling</span>
        </p>
        <Link href="/explore" passHref>
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 bg-white border-pink-500 border-2 hover:scale-105 transition-transform">
          <span className={`relative px-10 py-4 text-xl font-semibold transition-all duration-75 ease-in bg-white group-hover:bg-opacity-0 ${styles['landing-text']} tracking-normal`}>
            Explore
          </span>
        </button>
        </Link>
        </div>
      </div>
      <div className="flex flex-col w-full h-full">
        <Section
          image={'/images/happy-music.svg'}
          sectionHeading="Play your favorites."
          textContent="Listen to the stories you love, and discover new stories."
        />
        <Section
        image={'/images/yoga.svg'}
        sectionHeading="Stories to expand our horizons & enrich our souls."
        textContent="Stories open a door for us … We can travel to places we would never go, live in times we would never know, and feel joys we would have never found."
          imagePosition="right"
      />
        <Section
          image={'/images/gift-to-love.svg'}
          sectionHeading="Spread the love"
          textContent="Gift your favorite storybook to the someone you love most."
          
        />
      </div>
      <div className="grid w-full h-32 mt-16 text-xl text-gray-800 place-content-center">
      <p>Powered by ThirdWeb 🚀 </p>
      </div>
    </>
  );
};

export default LandingPage;
