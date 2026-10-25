import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EmergencyCallBar } from './components/common/EmergencyCallBar';
import { SafetyBanner } from './components/common/SafetyBanner';
import { WebFooter } from './components/common/WebFooter';
import { LandingPage } from './pages/LandingPage';
import { DecisionPage } from './pages/DecisionPage';
import { CprScreen } from './pages/CprScreen';
import { LearnPage } from './pages/LearnPage';
import { SourcesPage } from './pages/SourcesPage';

const AppContent: React.FC = () => {
  const [safetyNoticeDismissed, setSafetyNoticeDismissed] = useState(false);

  return (
    <div className="app-shell">
      {/* Pinned Top Bar with Brand & Call 112 */}
      <EmergencyCallBar />

      {/* Dismissible Safety Disclaimer Banner */}
      {!safetyNoticeDismissed && (
        <SafetyBanner onDismiss={() => setSafetyNoticeDismissed(true)} />
      )}

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
  );
};


export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;

