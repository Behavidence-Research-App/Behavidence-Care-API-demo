// pages/index.tsx
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import { setAuthToken } from '../utils/authToken';

const Page: React.FC = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [attemptLogin, setAttemptLogin] = useState(true);
    const [loading, setLoading] = useState(true);
    
    const handleLogin = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/auth' || '', {
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json',
                    'X-API-Key': process.env.NEXT_PUBLIC_API_KEY
                },
                'body': JSON.stringify({
                    'Username': process.env.NEXT_PUBLIC_DEFAULT_USERNAME || '',
                    'Password': process.env.NEXT_PUBLIC_DEFAULT_PASSWORD || ''
                }),
            });
            
            setLoading(false);
            
            if (response.ok) {
                const data = await response.json();
                setAuthToken(data.Token);
                onLogin(data.Token);
            } else {
                // Handle login error
                console.error('Login error:', 'Unknown');
                setAttemptLogin(false);
            }
        } catch (error) {
            console.error('Login error:', error);
            setAttemptLogin(false);
            setLoading(false);
        }
    };
    
    const onLogin = (token: string) => {
        // Handle successful login
        setAccessToken(token);
        setAttemptLogin(false);
    };
    
    useEffect(() => {
        // Automatically attempt login on component mount
        handleLogin();
    }, []);
    
    return (
            <div>
              {loading && <Loader />}
              <Layout><h1>Welcome to Behavidence Care API</h1>
                  {accessToken? (<div>Access Token - OK</div>) : (
                                           attemptLogin ? <div>Attempting Login...</div> :
                                           <div>Check your credentials.</div>
                                           )}</Layout>
            </div>
          );
    
};

export default Page;
