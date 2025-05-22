import React, { useEffect, useState } from 'react';
import { useClient } from 'sanity';

const SanityTest = () => {
  const [testResult, setTestResult] = useState({
    connection: 'pending',
    auth: 'pending',
    error: null,
  });

  // Get the authenticated client from Sanity context
  const client = useClient({ apiVersion: '2025-05-22' });

  useEffect(() => {
    const runTests = async () => {
      try {
        // Test 1: Basic Connection
        const connectionTest = await client.fetch('*[_type == "post"][0...1]');
        setTestResult((prev) => ({
          ...prev,
          connection: connectionTest ? 'success' : 'failed',
        }));

        // Test 2: Authentication Required Operation
        try {
          // First try to delete any existing test documents
          const existingDocs = await client.fetch('*[_type == "test"]');
          await Promise.all(existingDocs.map((doc) => client.delete(doc._id)));

          // Create a new test document
          const doc = await client.create({
            _type: 'test',
            title: 'Test Document ' + new Date().toISOString(),
          });

          // Clean up - delete the test document
          await client.delete(doc._id);

          setTestResult((prev) => ({
            ...prev,
            auth: 'success',
          }));
        } catch (authError) {
          setTestResult((prev) => ({
            ...prev,
            auth: 'failed',
            error: authError.message,
          }));
        }
      } catch (error) {
        setTestResult((prev) => ({
          ...prev,
          connection: 'failed',
          error: error.message,
        }));
      }
    };

    runTests();
  }, [client]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Sanity CORS Test Results</h2>
      <div style={{ marginTop: '10px' }}>
        <p>
          <strong>Basic Connection:</strong>{' '}
          <span
            style={{
              color:
                testResult.connection === 'success'
                  ? 'green'
                  : testResult.connection === 'pending'
                    ? 'orange'
                    : 'red',
            }}
          >
            {testResult.connection}
          </span>
        </p>
        <p>
          <strong>Authentication Test:</strong>{' '}
          <span
            style={{
              color:
                testResult.auth === 'success'
                  ? 'green'
                  : testResult.auth === 'pending'
                    ? 'orange'
                    : 'red',
            }}
          >
            {testResult.auth}
          </span>
        </p>
        {testResult.error && (
          <div style={{ marginTop: '10px', color: 'red' }}>
            <strong>Error:</strong>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{testResult.error}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default SanityTest;
