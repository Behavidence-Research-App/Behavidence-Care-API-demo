// components/ItemsListMHSS.tsx
import React from 'react';
import styles from '../styles/ItemList.module.css';

interface JsonListProps {
  json: Record<string, any>;
}

const ItemsListMHSS: React.FC<JsonListProps> = ({ mhss }) => {
    const renderValue = (value: any): React.ReactNode => {
        if (typeof value === 'object' && value !== null) {
            return <ItemsListMHSS mhss={value} />;
        } else {
            return value;
        }
    };
    
  return (
    <ul className={styles.itemsList}>
      {Object.entries(mhss).reverse().map(([key, value]) => (
        <li key={key}>
           <strong>{key}:</strong> {renderValue(value)}
        </li>
      ))}
    </ul>
  );
};

export default ItemsListMHSS;
