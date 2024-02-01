// components/Loader.tsx
import React from 'react';
import styles from '../styles/Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.loader}>
          &nbsp;
      </div>
    </div>
  );
};

export default Loader;

