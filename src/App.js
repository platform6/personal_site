import './App.css';
import React, { Suspense, lazy } from 'react';
import Footer from './components/Footer';
const HomePage = lazy(() => import('./pages/HomePage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePage />
      <Footer />
    </Suspense>
  );
}

export default App;
