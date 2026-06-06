import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookCard from '@/src/components/BookCard';
import { books as allBooks } from '@/src/constants';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [results, setResults] = useState<typeof allBooks>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate a small delay for better UX
    const timer = setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const filtered = allBooks.filter((book) => 
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery) ||
        book.description?.toLowerCase().includes(lowerQuery)
      );
      setResults(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="min-h-screen bg-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors mb-8">
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-4">
            <SearchIcon size={28} className="text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Search Results
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            {query ? `Results for "${query}"` : 'Enter a search query'}
          </p>
        </motion.div>

        {/* Results */}
        {isSearching ? (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
            <p className="text-gray-600 mt-4">Searching...</p>
          </div>
        ) : results.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {results.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </motion.div>
        ) : query ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <SearchIcon size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No results found</h2>
            <p className="text-gray-600">
              We couldn't find any books matching "{query}". Try a different search term.
            </p>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Start searching for your favorite books</p>
          </div>
        )}

        {/* Result Count */}
        {results.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-600 mt-8 text-center"
          >
            Found <span className="font-bold text-indigo-600">{results.length}</span> book{results.length !== 1 ? 's' : ''}
          </motion.p>
        )}
      </div>
    </div>
  );
}
