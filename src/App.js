import './App.css';
import React, { Suspense, lazy } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const Elden = lazy(() => import('./pages/Elden'));
const HomePage = lazy(() => import('./pages/HomePage'));
const Resume = lazy(() => import('./pages/Resume'));

function App() {
  return (
    <div className="app-container">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/elden" element={<Elden />} />
              <Route path="/resume" element={<Resume />} />
            </Routes>
          </div>
          <Footer />
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
