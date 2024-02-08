// components/ItemsListCodesStatus.tsx
import React from 'react';
import styles from '../styles/ItemList.module.css';

interface ItemStatusListProps {
  items: {
      Code: string;
      DepartmentId: string;
      Invited: number;
      Used: number;
      Disconnected: number;
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
                                      <div><strong>Department ID:</strong> {item.DepartmentId}</div>
                                      <div><strong>Invited At:</strong> {item.Invited != -1 ? item.Invited : 'N/A'}</div>
                                      <div><strong>Used At:</strong> {item.Used != -1 ? item.Used : 'N/A'}</div>
                                      <div><strong>Disconnected At:</strong> {item.Disconnected != -1 ? item.Disconnected : 'N/A'}</div>
                                  </li>
                                  ))}
           </ul>
     </div>
     );
};

export default ItemListCodesStatus;
