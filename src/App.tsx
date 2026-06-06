/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from '@/src/components/Navigation';
import Home from '@/src/pages/Home';
import Education from '@/src/pages/Education';
import Fiction from '@/src/pages/Fiction';
import Auth from '@/src/pages/Auth';
import Library from '@/src/pages/Library';
import Search from '@/src/pages/Search';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider } from '@/src/contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
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
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </main>
        
        {/* Simple Footer */}
        <footer className="bg-surface border-t border-outline-variant py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <span className="font-bold text-lg">E</span>
              </div>
              <span className="text-lg font-bold text-on-surface">EthioLib</span>
            </div>
            <div className="flex space-x-8 text-sm font-medium text-on-surface-variant">
              <a href="#" className="hover:text-[#2E6B55] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#2E6B55] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#2E6B55] transition-colors">Contact</a>
            </div>
            <p className="text-sm text-on-surface-variant">
              © {new Date().getFullYear()} EthioLib. Empowering Ethiopia's future.
            </p>
          </div>
        </footer>
      </div>
    </Router>
    </AuthProvider>
  );
}
