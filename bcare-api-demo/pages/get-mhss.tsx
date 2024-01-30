// pages/get-mhss.tsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import ItemsListMHSS from '../components/ItemsListMHSS';
import { getAuthToken } from '../utils/authToken';

const GetMHSS: React.FC = () => {
    const authToken = getAuthToken();
    
    const [response, setResponse] = useState(authToken ? '... waiting for user to make request' : 'Please go to main page to refresh access token.');
    const [items, setItems] = useState({});
    const [loading, setLoading] = useState(false);
    
    const [code, setCode] = useState('');
    const [fromDate, setFromDate] = useState('');
    
    const handleGetMHSS = async () => {
        setLoading(true);
        setResponse('Loading MHSS for ' + code);
        setItems({});
                
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/mhss' || '', {
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json',
                    'X-API-Key': process.env.NEXT_PUBLIC_API_KEY,
                    'Token': authToken
                },
                'body': JSON.stringify({
                    'Code': code,
                    'From': fromDate
                }),
            });
            
            setLoading(false);
            
            const data = await response.json();
            if (response.ok) {
                setResponse('OK: Got MHSS for ' + data.Amount + ' dates');
                setItems(data.Items);
            }
            else {
                // Handle login error
                setResponse('ERROR: ' + data.Amount + ': ' + data.Error);
            }
        } catch (error) {
            console.error('Request error:', error);
            setResponse(error);
            setLoading(false);
        }
    };
    
    return (
            <div>
              {loading && <Loader />}
                <Layout>
                    <h1>Get MHSS for Patient Code</h1>
                    <div className="input-form">
                      <label htmlFor="code">Code</label>
                      <input
                        name="code"
                        type="text"
                        placeholder="Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                      <label htmlFor="fromDate">From Date</label>
                      <input
                        name="fromDate"
                        type="text"
                        placeholder="From Date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                      <button onClick={handleGetMHSS}>Get MHSS for Code</button>
                    </div>
                    <div>
                        <h2>API Response</h2>
                        <p>{response}</p>
                        <ItemsListMHSS mhss={items} />
                    </div>
                </Layout>
            </div>
          );
};

export default GetMHSS;

