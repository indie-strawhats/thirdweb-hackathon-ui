import Link from 'next/link';
import React from 'react';
import ConnectButton from '../connect-button';

const Header = () => {
  return (
    <div>
      <div>
        <Link href="/" passHref>
          <h4
            style={{
              cursor: 'pointer',
            }}
          >
            Awesome Audiobooks
          </h4>
        </Link>
      </div>
      <div>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Header;
