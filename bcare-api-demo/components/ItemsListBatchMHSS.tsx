// components/ItemsListBatchMHSS.tsx
import React from 'react';
import styles from '../styles/ItemList.module.css';
import ItemsListMHSS from './ItemsListMHSS';

interface MHSSListProps {
    items: { key: string; value: any }[];
    codes: string[];
}

const ItemsListBatchMHSS: React.FC<MHSSListProps> = ({ items, codes }) => {
    const renderValue = (value: any): React.ReactNode => {
        if (typeof value === 'object' && value !== null) {
            return <ItemsListMHSS mhss={value} />;
        } else {
            return value;
        }
    };
    
  return (
          <ul className={styles.itemsList}>
          {items.map((item, index) => (
                <li key={index}>
                     <h3>codes[index]</h3>
                     {Object.entries(item).reverse().map(([key, value]) => (
                       <li key={key}>
                       <strong>{key}:</strong> {renderValue(value)}
                       </li>
                       ))}
                </li>
            ))}
          </ul>
  );
};

export default ItemsListBatchMHSS;

