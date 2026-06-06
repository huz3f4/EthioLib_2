import Hero from '@/src/components/Hero';
import BookCard from '@/src/components/BookCard';
import { CURRICULUM_BOOKS, FICTION_BOOKS, CATEGORIES } from '@/src/constants';
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
    <div className="bg-[#FAFAFA] min-h-screen">
      <Hero />

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, idx) => {
            const Icon = iconMap[cat.icon as keyof typeof iconMap] || Info;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-sm text-gray-900">{cat.name}</h3>
                <p className="text-[10px] text-gray-500 mt-1">200+ Books</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Educational */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">New Curriculum</h2>
            <p className="text-gray-500 text-sm">Latest textbooks and teacher guides for all grades.</p>
          </div>
          <Link to="/educational" className="flex items-center space-x-1 text-indigo-600 font-bold text-sm hover:underline">
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
        <div className="bg-indigo-600 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-indigo-200">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-[-20deg] translate-x-1/2 pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
              Organize your studies with your own digital library.
            </h2>
            <p className="text-indigo-100 text-lg mb-10">
              Save your favorite books, track your progress, and get personalized recommendations based on your grade level.
            </p>
            <Link to="/auth" className="inline-flex items-center space-x-3 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all shadow-xl">
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
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Featured Fiction</h2>
            <p className="text-gray-500 text-sm">Classic and modern Ethiopian storytelling.</p>
          </div>
          <Link to="/fiction" className="flex items-center space-x-1 text-indigo-600 font-bold text-sm hover:underline">
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
