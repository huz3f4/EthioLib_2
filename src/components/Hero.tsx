import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Search, GraduationCap, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative pt-20 pb-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-[#F0E8D5] rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[50%] bg-[#C9AA71]/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-[#F0E8D5] text-[#1E4035] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-[#C9AA71]/20"
          >
            <GraduationCap size={14} />
            <span>Empowering Ethiopian Students</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight mb-6"
          >
            Your Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E4035] to-[#2E6B55]">Library</span> for Every Grade.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 leading-relaxed mb-10 px-4"
          >
            Access the complete new Ethiopian curriculum textbooks, teacher guides, 
            and a curated selection of world-class fiction. From Grade 1 to 12.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <form onSubmit={handleSearch} className="relative w-full sm:w-auto min-w-[320px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for subjects, grades or books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-xl shadow-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1E4035] transition-all"
              />
            </form>
            <Link
              to="/educational"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#1E4035] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#2E6B55] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#1E4035]/20"
            >
              <span>Explore Curriculum</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
