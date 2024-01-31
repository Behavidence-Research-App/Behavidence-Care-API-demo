// pages/get-status-report.tsx

import React, { useState } from 'react';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import ItemListCodesStatus from '../components/ItemsListCodesStatus';
import { getAuthToken } from '../utils/authToken';

const GetStatusReport: React.FC = () => {
    const authToken = getAuthToken();
    
    const [detailed, setDetailed] = useState(false);
    
    const [response, setResponse] = useState(authToken ? '... waiting for user to make request' : 'Please go to main page to refresh access token.');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCheckboxChange = () => {
        setDetailed(!detailed);
    };
    
    const handleGetStatusReport = async () => {
        setLoading(true);
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/status', {
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json',
                    'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || '',
                    'Token': authToken || ''
                },
                'body': JSON.stringify({
                    'Detailed': detailed
                }),
            });
            
            setLoading(false);
            
            const data = await response.json();
            if (response.ok) {
                setResponse('OK. Free: ' + data.Free + ',  Invited: ' + data.Invited + ',  Used: ' + data.Used);
                setItems(data.Codes || []);
            }
            else {
                // Handle login error
                setResponse('ERROR: ' + data.Error);
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
                    <h1>Get Status Report for Codes</h1>
                    <div className="input-form">
                      <label htmlFor="detailed">Get detailed report - per code status</label>
                      <input name="detailed" type="checkbox" checked={detailed} onChange={handleCheckboxChange} />
                      <button onClick={handleGetStatusReport}>Get Status Report</button>
                    </div>
                    <div>
                        <h2>API Response</h2>
                        <p>{response}</p>
                        {items.length > 0 && <ItemListCodesStatus items={items} />}
                    </div>
                </Layout>
            </div>
          );
};

export default GetStatusReport;

