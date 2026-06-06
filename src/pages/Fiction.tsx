import { useState } from 'react';
import { FICTION_BOOKS, FICTION_GENRES } from '@/src/constants';
import BookCard from '@/src/components/BookCard';
import { motion } from 'motion/react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Fiction() {
  const [selectedGenre, setSelectedGenre] = useState<string | 'all'>('all');

  const filteredBooks = FICTION_BOOKS.filter(book => 
    selectedGenre === 'all' || book.genre === selectedGenre
  );

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-20">
      {/* Header */}
      <section className="bg-gray-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-600 skew-x-[-15deg] translate-x-1/4 opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold mb-4">
              <Sparkles size={20} />
              <span className="uppercase tracking-widest text-xs">Cultural Collection</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
              Fiction & Literature
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Discover the rich tapestry of Ethiopian storytelling. From historical epics to 
              modern drama, explore books that define our culture and imagination.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 py-12">
        {/* Sidebar Filter */}
        <aside className="w-full md:w-64 space-y-8">
          <div>
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Genres</h3>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedGenre('all')}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all",
                  selectedGenre === 'all' 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" 
                    : "text-gray-600 hover:bg-white hover:text-indigo-600"
                )}
              >
                <span>All Genres</span>
                <ChevronRight size={14} className={selectedGenre === 'all' ? "opacity-100" : "opacity-0"} />
              </button>
              {FICTION_GENRES.map(genre => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all",
                    selectedGenre === genre
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" 
                      : "text-gray-600 hover:bg-white hover:text-indigo-600"
                  )}
                >
                  <span>{genre}</span>
                  <ChevronRight size={14} className={selectedGenre === genre ? "opacity-100" : "opacity-0"} />
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
            <h4 className="text-indigo-900 font-black text-sm mb-2">Request a Book</h4>
            <p className="text-indigo-600 text-xs mb-4">Can't find a specific title? Let us know and we'll try to find it.</p>
            <button className="w-full bg-indigo-600 text-white text-xs font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors">
              Submit Request
            </button>
          </div>
        </aside>

        {/* Results */}
        <main className="flex-grow">
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredBooks.map((book, idx) => (
                <BookCard key={book.id} book={book} index={idx} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-gray-100">
              <p className="text-gray-500 font-medium">Coming soon to this category!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
