// src/components/TestSupabase.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/supabaseclient';

export default function TestSupabase() {
  const [status, setStatus] = useState('Testing connection...');
  const [connectionDetails, setConnectionDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    testConnection();
  }, []);

  async function testConnection() {
    try {
      // Test 1: Check if client is initialized
      setStatus('✓ Supabase client initialized');

      // Test 2: Try to get session
      const { data, error } = await supabase.auth.getSession();

      if (error) throw error;

      setConnectionDetails({
        url: supabase.supabaseUrl,
        isConnected: true,
        session: data.session
          ? 'Active session found'
          : 'No active session (this is normal)',
      });

      setStatus('✅ Connection successful!');
    } catch (err) {
      setError(err.message);
      setStatus('❌ Connection failed');
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>Supabase Connection Test</h1>

      <div style={{ marginTop: '2rem' }}>
        <h2>Status: {status}</h2>

        {error && (
          <div
            style={{
              color: 'red',
              background: '#ffe6e6',
              padding: '1rem',
              marginTop: '1rem',
              borderRadius: '4px',
            }}
          >
            <strong>Error:</strong> {error}
          </div>
        )}

        {connectionDetails && (
          <div
            style={{
              background: '#e6f7e6',
              padding: '1rem',
              marginTop: '1rem',
              borderRadius: '4px',
            }}
          >
            <h3>Connection Details:</h3>
            <pre>{JSON.stringify(connectionDetails, null, 2)}</pre>
          </div>
        )}

        <div style={{ marginTop: '2rem' }}>
          <h3>Environment Variables Check:</h3>
          <ul>
            <li>
              REACT_APP_PUBLIC_SUPABASE_URL:{' '}
              {process.env.REACT_APP_PUBLIC_SUPABASE_URL
                ? '✓ Set'
                : '❌ Missing'}
            </li>
            <li>
              REACT_APP_PUBLIC_SUPABASE_ANON_KEY:{' '}
              {process.env.REACT_APP_PUBLIC_SUPABASE_ANON_KEY
                ? '✓ Set'
                : '❌ Missing'}
            </li>
          </ul>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <button onClick={testConnection}>Retry Connection</button>
        </div>
      </div>
    </div>
  );
}
