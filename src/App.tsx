/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from '@/src/components/Navigation';
import Footer from '@/src/components/Footer';
import Home from '@/src/pages/Home';
import Education from '@/src/pages/Education';
import Fiction from '@/src/pages/Fiction';
import Auth from '@/src/pages/Auth';
import Library from '@/src/pages/Library';
import Search from '@/src/pages/Search';
import Terms from '@/src/pages/Terms';
import Privacy from '@/src/pages/Privacy';
import ScrollToTop from '@/src/components/ScrollToTop';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider } from '@/src/contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen font-sans bg-surface text-on-surface transition-colors duration-300 selection:bg-accent/30 selection:text-primary">
          <Navigation />
          <main>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/educational" element={<Education />} />
                <Route path="/fiction" element={<Fiction />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/library" element={<Library />} />
                <Route path="/search" element={<Search />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </main>
        
          <Footer />
        </div>
    </Router>
    </AuthProvider>
  );
}
