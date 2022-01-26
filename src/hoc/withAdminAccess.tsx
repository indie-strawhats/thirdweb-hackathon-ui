import { useEthers } from '@usedapp/core';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { isNotNullAndUndefined } from '../helpers/utils';

// eslint-disable-next-line react/display-name
const withAdminAccess = (WrappedComponent: FC) => (props: any) => {
  const router = useRouter();
  const { account } = useEthers();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (isNotNullAndUndefined(account)) {
      if (account === '0x9ea3F80FC96f67CE06b2f4439625C4257c685aA8') {
        setHasAccess(true);
      } else {
        router.replace('/');
      }
    }
  }, [account, router]);

  if (hasAccess) {
    return <WrappedComponent {...props} />;
  } else {
    return null;
  }
};

export default withAdminAccess;
