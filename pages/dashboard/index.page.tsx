import React from 'react';
import withAdminAccess from '../../src/hoc/withAdminAccess';

const DashboardPage = () => {
  return <div>I am admin</div>;
};

export default withAdminAccess(DashboardPage);
