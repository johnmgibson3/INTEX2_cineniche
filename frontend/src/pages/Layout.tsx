import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';

const Layout: React.FC = () => {
  const location = useLocation();
  const showNav = location.pathname !== '/Login' && location.pathname !== '/Login2';

  return (
    <div style={{ paddingBottom: showNav ? '65px' : '0px' }}>
      <Outlet />
      {showNav && <BottomNavigation />}
    </div>
  );
};

export default Layout;
