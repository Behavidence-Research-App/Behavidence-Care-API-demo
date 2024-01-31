// components/ItemsListCodesStatus.tsx
import React from 'react';
import CodeStatusItem from '../utils/types';
import styles from '../styles/ItemList.module.css';

interface ItemStatusListProps {
  items: {
      Code: string;
      Label: string;
      Invited: number;
      Used: number;
  }[];
}

const ItemListCodesStatus: React.FC<ItemStatusListProps> = ({ items }) => {
    
   return (
     <div>
     <h2>Status Report per Code</h2>
           <ul className={styles.itemsList}>
     {items.map((item, index) => (
                                  <li key={item.Code}>
                                      <div><strong>Code:</strong> {item.Code}</div>
                                      <div><strong>Department ID:</strong> {item.Label}</div>
                                      <div><strong>Invited At:</strong> {item.Invited > 0 ? item.Invited : 'N/A'}</div>
                                      <div><strong>Used At:</strong> {item.Used > 0 ? item.Used : 'N/A'}</div>
                                  </li>
                                  ))}
           </ul>
     </div>
     );
};

export default ItemListCodesStatus;
