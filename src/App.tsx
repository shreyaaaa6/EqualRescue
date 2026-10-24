import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WebNavbar } from './components/common/WebNavbar';
import { EmergencyCallBar } from './components/common/EmergencyCallBar';
import { SafetyBanner } from './components/common/SafetyBanner';
import { WebFooter } from './components/common/WebFooter';
import { LandingPage } from './pages/LandingPage';
import { DecisionPage } from './pages/DecisionPage';
import { CprScreen } from './pages/CprScreen';
import { LearnPage } from './pages/LearnPage';
import { SourcesPage } from './pages/SourcesPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-shell">
        {/* Pinned Call 112 Bar at the very top */}
        <EmergencyCallBar />

        {/* Global Navigation */}
        <WebNavbar />

        {/* Safety Disclaimer Banner */}
        <SafetyBanner />

        {/* Main Content Viewport */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/decide" element={<DecisionPage />} />
            <Route path="/cpr" element={<CprScreen />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/sources" element={<SourcesPage />} />
          </Routes>
        </main>

        {/* Global Web Footer */}
        <WebFooter />
      </div>
    </BrowserRouter>
  );
};

export default App;
