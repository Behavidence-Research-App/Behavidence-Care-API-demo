// components/Menu.tsx
import React from 'react';
import Link from 'next/link';

const Menu = () => {
  return (
    <div className="main-menu">
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>
            <Link href="/">Refresh Access Token</Link>
          </li>
          <li>
            <Link href="/get-code-link">Get Code and Link</Link>
          </li>
          <li>
            <Link href="/get-mhss">Get MHSS for Code</Link>
          </li>
          <li>
            <Link href="/get-batch-mhss">Get Batch MHSS for Codes</Link>
          </li>
          <li>
            <Link href="/get-status-report">Get Status Report</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
