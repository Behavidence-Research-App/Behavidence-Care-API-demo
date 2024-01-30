// components/Layout.tsx
import React from 'react';
import Menu from './Menu'

import '../styles/styles.css';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="main-page">
      <Menu />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
