import './App.css';
import React, { Suspense, lazy } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Progress } from '@chakra-ui/react';
import { TestSupabasePage } from './pages/TestSupabasePage';
import AdminPage from './pages/AdminPage';

const Elden = lazy(() => import('./pages/Elden'));
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutMe = lazy(() => import('./pages/AboutMe'));
const GameList = lazy(() => import('./pages/GameList'));
const TimeTrackingDashboard = lazy(
  () => import('./pages/TimeTrackingDashboard')
);

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
              <Route path="/gamelist" element={<GameList />} />
              <Route
                path="/time-tracking"
                element={<TimeTrackingDashboard />}
              />
              <Route path="/test" element={<TestSupabasePage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </div>
          <Footer />
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
