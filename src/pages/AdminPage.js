// src/pages/AdminPage.js
import { useState, useEffect } from 'react';
import { getSession, signOut, onAuthStateChange } from '../lib/supabase/auth';
import LoginForm from '../components/LoginForm';
import GameManager from '../components/GameManager';

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    checkSession();

    // Listen for auth changes
    const subscription = onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function checkSession() {
    try {
      const currentSession = await getSession();
      setSession(currentSession);
    } catch (error) {
      console.error('Error checking session:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await signOut();
      setSession(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
    );
  }

  // Show login form if not authenticated
  if (!session) {
    return <LoginForm onSuccess={checkSession} />;
  }

  // Show admin panel if authenticated
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          borderBottom: '2px solid #ddd',
          paddingBottom: '1rem',
        }}
      >
        <h1>Game Admin Panel</h1>
        <div>
          <span style={{ marginRight: '1rem' }}>
            Logged in as: <strong>{session.user.email}</strong>
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Game management component */}
      <GameManager />
    </div>
  );
}
