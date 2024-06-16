import './App.css';
import React, { Suspense, lazy } from 'react';
const HomePage = lazy(() => import('./pages/HomePage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePage />
    </Suspense>
  );
}

export default App;
