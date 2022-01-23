import { Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import ConnectButton from '../connect-button';
import { StyledHeader } from './styled';

const Header = () => {
  return (
    <StyledHeader>
      <div>
        <Link href="/" passHref>
          <Typography
            variant="h4"
            style={{
              cursor: 'pointer',
            }}
          >
            Awesome Audiobooks
          </Typography>
        </Link>
      </div>
      <div>
        <ConnectButton />
      </div>
    </StyledHeader>
  );
};

export default Header;
