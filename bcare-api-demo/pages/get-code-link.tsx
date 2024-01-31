// pages/get-code-link.tsx

import React, { useState } from 'react';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import ItemListCodes from '../components/ItemsListCodes';
import { getAuthToken } from '../utils/authToken';

const GetCodeLink: React.FC = () => {
    const authToken = getAuthToken();
    
    const [subscriptionId, setSubscriptionId] = useState(process.env.NEXT_PUBLIC_DEFAULT_SUBSCRIPTION_ID || '');
    const [departmentId, setDepartmentId] = useState('');
    const [amount, setAmount] = useState(1);
    
    const [response, setResponse] = useState(authToken ? '... waiting for user to make request' : 'Please go to main page to refresh access token.');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGetCodeLink = async () => {
        setLoading(true);
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/code', {
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json',
                    'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || '',
                    'Token': authToken || ''
                },
                'body': JSON.stringify({
                    'SubscriptionId': subscriptionId,
                    'DepartmentId': departmentId,
                    'Amount': amount
                }),
            });
            
            setLoading(false);
            
            const data = await response.json();
            if (response.ok) {
                setResponse('OK: Generated ' + data.Amount + ' Codes/Links');
                setItems(data.Items);
            }
            else {
                // Handle login error
                setResponse('ERROR: ' + data.Amount + ': ' + data.Error);
            }
        } catch (error: any) {
            console.error('Request error:', error);
            setResponse(String(error));
            setLoading(false);
        }
    };

  return (
            <div>
              {loading && <Loader />}
                <Layout>
                    <h1>Get Code and Link for Patient</h1>
                    <div className="input-form">
                      <label htmlFor="subscriptionId">Subscription ID</label>
                      <input
                        name="subscriptionId"
                        type="text"
                        placeholder="Subscription ID"
                        value={subscriptionId}
                        onChange={(e) => setSubscriptionId(e.target.value)}
                      />
                      <label htmlFor="departmentId">Department ID</label>
                      <input
                        name="departmentId"
                        type="text"
                        placeholder="Department ID"
                        value={departmentId}
                        onChange={(e) => setDepartmentId(e.target.value)}
                      />
                      <label htmlFor="amount">Amount</label>
                      <input
                        name="amount"
                        type="text"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(parseInt(e.target.value, 10))}
                      />
                      <button onClick={handleGetCodeLink}>Get Code and Link</button>
                    </div>
                    <div>
                        <h2>API Response</h2>
                        <p>{response}</p>
                        <ItemListCodes items={items} />
                    </div>
                </Layout>
            </div>
          );
};

export default GetCodeLink;

