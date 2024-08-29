// pages/get-mhss.tsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import ItemsListMHSS from '../components/ItemsListMHSS';
import { getAuthToken, getRefToken } from '../utils/authToken';

const GetMHSS: React.FC = () => {
  const authToken = getAuthToken();
  const refToken = getRefToken();

  const [response, setResponse] = useState(authToken ? '... waiting for user to make request' : 'Please go to main page to refresh access token.');
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(false);

  const [code, setCode] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [average, setAverage] = useState(0)

  const [directLink, setDirectLink] = useState("");
  const [questStats, setQuestStats] = useState({
    sent: 0,
    answered: 0
  })

  const handleGetMHSS = async () => {
    setLoading(true);
    setResponse('Loading MHSS for ' + code);
    setItems({});

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/mhss', {
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || '',
          'Token': authToken || ''
        },
        'body': JSON.stringify({
          'Code': code,
          'From': fromDate,
          'Average': average
        }),
      });

      setLoading(false);

      const data = await response.json();
      if (response.ok) {
        setResponse('OK: Got MHSS for ' + data.Amount + ' dates. Code status = ' + data.Status);
        setItems(data.Items);
        setQuestStats(data.QuestStats)

        const userID = data.UserID;
        setDirectLink(`https://care.behavidence.com/similarity-scores/redirect/?userId=${userID}&userCode=${code}&refreshtoken=${refToken}`);
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
          <label htmlFor='getAvgMHSS'>Average MHSS for # of days</label>
          <input
            name="getAvgMHSS"
            type="text"
            placeholder="Average of days"
            value={average}
            onChange={(e) => setAverage(Number(e.target.value))}
          />
          <button onClick={handleGetMHSS}>Get MHSS for Code</button>
        </div>
        <div>
          <h2>API Response</h2>
          <p>{response}</p>
          <p>Questionnaires: patient answered on {questStats.answered} out of {questStats.sent} sent.</p>
          <a href={directLink} target='_blank'>{directLink}</a>
          <ItemsListMHSS mhss={items} />
        </div>
      </Layout>
    </div>
  );
};

export default GetMHSS;

