// pages/get-batch-mhss.tsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import ItemsListBatchMHSS from '../components/ItemsListBatchMHSS';
import { getAuthToken } from '../utils/authToken';

const GetBatchMHSS: React.FC = () => {
    const authToken = getAuthToken();
    
    const [response, setResponse] = useState(authToken ? '... waiting for user to make request' : 'Please go to main page to refresh access token.');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [codes, setCodes] = useState('');
    const [fromDate, setFromDate] = useState('');
    
    const handleGetMHSS = async () => {
        setLoading(true);
        setResponse('Loading MHSS for ' + codes);
        setItems([]);
                
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/mhss-batch', {
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json',
                    'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || '',
                    'Token': authToken || ''
                },
                'body': JSON.stringify({
                    'Codes': codes.split(','),
                    'From': fromDate
                }),
            });
            
            setLoading(false);
            
            const data = await response.json();
            if (response.ok) {
                setResponse('OK: Got MHSS for ' + data.Amount + ' codes');
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
                    <h1>Get Batch MHSS for Patient Codes</h1>
                    <div className="input-form">
                      <label htmlFor="code">Codes (comma separated)</label>
                      <input
                        name="code"
                        type="text"
                        placeholder="Codes"
                        value={codes}
                        onChange={(e) => setCodes(e.target.value)}
                      />
                      <label htmlFor="fromDate">From Date</label>
                      <input
                        name="fromDate"
                        type="text"
                        placeholder="From Date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                      <button onClick={handleGetMHSS}>Get (batch) MHSS for Codes</button>
                    </div>
                    <div>
                        <h2>API Response</h2>
                        <p>{response}</p>
                        <ItemsListBatchMHSS items={items} codes={codes.split(',')} />
                    </div>
                </Layout>
            </div>
          );
};

export default GetBatchMHSS;

