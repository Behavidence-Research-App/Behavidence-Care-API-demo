// components/ItemListCodes.tsx
import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import styles from '../styles/ItemList.module.css';

interface ItemListProps {
  items: {
      Code: string;
      Link: string;
  }[];
}

const ItemListCodes: React.FC<ItemListProps> = ({ items }) => {
    const [copyMessage, setCopyMessage] = useState<string | null>(null);
    const [messageActive, setMessageActive] = useState(false);
    
    const handleCopyToClipboard = async (link: string) => {
        try {
            await copy(link);
            setCopyMessage('Link copied to clipboard!');
            setMessageActive(true);
        } catch (error) {
            console.error('Error copying to clipboard:', error);
            setCopyMessage('Error copying to clipboard');
            setMessageActive(true);
        }
    };
    
    useEffect(() => {
        let timer: NodeJS.Timeout;
        
        if (copyMessage) {
            timer = setTimeout(() => {
                setCopyMessage(null);
            }, 1000);
        }
        
        if (messageActive) {
            timer = setTimeout(() => {
                setMessageActive(false);
            }, 500);
        }
        
        return () => clearTimeout(timer);
    }, [copyMessage, messageActive]);
    
  return (
    <div>
          {copyMessage && <div className={`${styles.copyMessage} ${messageActive ? styles.active : ''}`}>{copyMessage}</div>}
          <ul className={styles.itemsList}>
          {items.map((item) => (
            <li key={item.Code}>
              <div><strong>Code:</strong> {item.Code}</div>
              <div><strong>Link:</strong> {item.Link}</div>
              <button onClick={() => handleCopyToClipboard(item.Link)}>Copy link to Clipboard</button>
            </li>
          ))}
        </ul>
    </div>
  );
};

export default ItemListCodes;

