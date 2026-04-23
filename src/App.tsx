import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import BackgroundMusic from './components/BackgroundMusic';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import EtheriaPage from './pages/EtheriaPage';
import ArcanumPage from './pages/ArcanumPage';
import MasteringCardsPage from './pages/MasteringCardsPage';
import DeadSpeakPage from './pages/DeadSpeakPage';
import QuantumAIPage from './pages/QuantumAIPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DonatePage from './pages/DonatePage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import PricingPage from './pages/PricingPage';
import ContestRulesPage from './pages/ContestRulesPage';
import CreditsPage from './pages/CreditsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0a0b] text-[#f5f5f5]">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/etheria" element={<EtheriaPage />} />
            <Route path="/arcanum-liberatus" element={<ArcanumPage />} />
            <Route path="/mastering-the-cards" element={<MasteringCardsPage />} />
            <Route path="/dead-speak" element={<DeadSpeakPage />} />
            <Route path="/quantum-ai" element={<QuantumAIPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contest-rules" element={<ContestRulesPage />} />
            <Route path="/credits" element={<CreditsPage />} />
          </Routes>
        </main>
        {/* Footer is inline on each page */}
        <BackgroundMusic />
      </div>
    </BrowserRouter>
  );
}

export default App;
