import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './components/layout/Footer';
import { MobileCallBar } from './components/layout/MobileCallBar';
import { Navbar } from './components/layout/Navbar';
import { CustomCursor } from './components/ui/CustomCursor';
import { TransitionProvider } from './context/TransitionContext';
import { AboutPage } from './pages/AboutPage';
import { CareTipsPage } from './pages/CareTipsPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProcessPage } from './pages/ProcessPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { WorkPage } from './pages/WorkPage';

export default function App() {
  return (
    <BrowserRouter>
      <TransitionProvider>
        <div className="relative min-h-[100svh] flex flex-col bg-[#05060A] text-white selection:bg-[#1F6BFF]/40 selection:text-white">
          {/* Subtle studio film grain */}
          <div
            aria-hidden="true"
            className="studio-grain pointer-events-none fixed inset-0 z-[50] opacity-60"
          />

          <CustomCursor />
          <Navbar />

          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/care-tips" element={<CareTipsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
          <MobileCallBar />
        </div>
      </TransitionProvider>
    </BrowserRouter>
  );
}
