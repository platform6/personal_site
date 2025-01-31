import './App.css';
import React, { Suspense, lazy } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Progress } from '@chakra-ui/react';
const Elden = lazy(() => import('./pages/Elden'));
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutMe = lazy(() => import('./pages/AboutMe'));
const Toddler = lazy(() => import('./pages/Toddler'));
const Battle = lazy(() => import('./pages/JobBattle'));
const GameList = lazy(() => import('./pages/GameList'));

function App() {
  return (
    <div className="app-container">
      <Router>
        <Suspense fallback={<Progress size="xs" isIndeterminate />}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/elden" element={<Elden />} />
              <Route path="/about-me" element={<AboutMe />} />
              <Route path="/toddlertodo" element={<Toddler />} />
              <Route path="/battle" element={<Battle />} />
              <Route path="/gamelist" element={<GameList />} />
            </Routes>
          </div>
          <Footer />
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
