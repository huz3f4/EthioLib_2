import Hero from '@/src/components/Hero';
import BookCard from '@/src/components/BookCard';
import { CURRICULUM_BOOKS, FICTION_BOOKS, CATEGORIES, NEW_ARRIVALS } from '@/src/constants';
import { motion } from 'motion/react';
import { ChevronRight, ArrowUpRight, BookOpen, Sparkles, Info, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap = {
  BookOpen,
  Sparkles,
  Info,
  Search,
  User,
};

export default function Home() {
  const featuredEducational = CURRICULUM_BOOKS.slice(0, 4);
  const featuredFiction = FICTION_BOOKS.slice(0, 4);

  return (
    <div className="bg-surface min-h-screen">
      <Hero />

      {/* New Arrival Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-surface-container rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between border border-outline-variant">
          <div className="mb-6 md:mb-0">
            <span className="inline-block bg-[#1E4035] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              New Arrival
            </span>
            <h2 className="text-3xl font-black text-[#1E4035] mb-2">{NEW_ARRIVALS[0].title}</h2>
            <p className="text-[#1E4035]/70 font-medium mb-6">{NEW_ARRIVALS[0].author} • History</p>
            <Link 
              to="/fiction" 
              className="inline-flex items-center space-x-2 text-[#1E4035] font-bold border-b-2 border-[#1E4035] pb-1 hover:opacity-70 transition-opacity"
            >
              <span>Explore</span>
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="w-40 h-56 rotate-6 shadow-2xl rounded-lg overflow-hidden border-4 border-white">
            <img src={NEW_ARRIVALS[0].cover_url} alt="Sapiens" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Browse by genre</h2>
          <p className="text-gray-500 text-sm">Fiction · Science · History</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, idx) => {
            const Icon = iconMap[cat.icon as keyof typeof iconMap] || Info;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-surface-bright p-6 rounded-2xl border border-outline-variant hover:border-accent/40 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center text-on-surface-variant group-hover:bg-surface-dim group-hover:text-primary transition-colors mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-sm text-on-surface">{cat.name}</h3>
                <p className="text-[10px] text-on-surface-variant mt-1">200+ Books</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Educational */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-on-surface tracking-tight mb-2">New Curriculum</h2>
            <p className="text-on-surface-variant text-sm">Latest textbooks and teacher guides for all grades.</p>
          </div>
          <Link to="/educational" className="flex items-center space-x-1 text-secondary font-bold text-sm hover:underline">
            <span>View All</span>
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredEducational.map((book, idx) => (
            <BookCard key={book.id} book={book} index={idx} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-primary rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-on-primary/5 skew-x-[-20deg] translate-x-1/2 pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
              Organize your studies with your own digital library.
            </h2>
            <p className="text-[#F0E8D5] text-lg mb-10">
              Save your favorite books, track your progress, and get personalized recommendations based on your grade level.
            </p>
            <Link to="/auth" className="inline-flex items-center space-x-3 bg-surface-bright text-primary px-8 py-4 rounded-2xl font-bold hover:bg-surface-container hover:scale-105 active:scale-95 transition-all shadow-xl">
              <span>Join EthioLib for FREE</span>
              <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Fiction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-on-surface tracking-tight mb-2">Featured Fiction</h2>
            <p className="text-on-surface-variant text-sm">Classic and modern Ethiopian storytelling.</p>
          </div>
          <Link to="/fiction" className="flex items-center space-x-1 text-secondary font-bold text-sm hover:underline">
            <span>Explore Genres</span>
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredFiction.map((book, idx) => (
            <BookCard key={book.id} book={book} index={idx} />
          ))}
        </div>
      </section>
    </div>
  );
}
