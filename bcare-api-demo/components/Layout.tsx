// components/Layout.tsx
import React, { ReactNode } from 'react';
import Menu from './Menu'

import '../styles/styles.css';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="main-page">
      <Menu />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
