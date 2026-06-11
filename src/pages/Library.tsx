import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '@/src/contexts/AuthContext';
import { getSupabase } from '../lib/supabase';
import BookCard from '@/src/components/BookCard';
import Footer from '@/src/components/Footer';
import { Book } from '@/src/constants';

interface Profile {
  favorite_books: string[] | null;
}

export default function Library() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetchFavorites();
  }, [user, navigate]);

  const fetchFavorites = async () => {
    try {
      const supabase = getSupabase();
      if (!supabase || !user) return;

      // Get user profile with favorite book IDs
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('favorite_books')
        .eq('id', user.id)
        .single();

      if (error || !profile) {
        console.error('Error fetching profile:', error);
        setLoading(false);
        return;
      }

      const favoriteIds = (profile as Profile).favorite_books || [];

      if (favoriteIds.length === 0) {
        setFavorites([]);
        return;
      }

      // Fetch the actual book details from the books table
      const { data: books, error: booksError } = await supabase
        .from('books')
        .select('*')
        .in('id', favoriteIds);

      if (booksError) {
        console.error('Error fetching books:', booksError);
      } else {
        setFavorites((books as Book[]) || []);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (bookId: string) => {
    try {
      const supabase = getSupabase();
      if (!supabase || !user) return;

      // Optimization: Filter from the existing local state instead of re-fetching from DB
      const updatedFavorites = favorites
        .filter((book) => book.id !== bookId)
        .map((book) => book.id);

      const { error } = await supabase
        .from('profiles')
        .update({ favorite_books: updatedFavorites })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating favorites:', error);
      } else {
        setFavorites(favorites.filter((book) => book.id !== bookId));
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-surface flex items-center justify-center">
        <div className="text-on-surface-variant font-bold">Loading your library...</div>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-[calc(100vh-64px)] pb-20">
      {/* Header */}
      <section className="bg-surface-bright border-b border-outline-variant py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-black text-on-surface mb-2">My Library</h1>
            <p className="text-on-surface-variant">
              {favorites.length} favorite {favorites.length === 1 ? 'book' : 'books'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Favorites Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-surface-container rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart size={40} className="text-outline" />
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-2">
              Your library is empty
            </h3>
            <p className="text-on-surface-variant mb-8 max-w-md mx-auto">
              Start adding your favorite books from the Educational and Fiction sections.
              Tap the heart icon on any book to add it to your library.
            </p>
            <a
              href="/educational"
              className="inline-flex items-center space-x-2 bg-primary text-on-primary px-6 py-3 rounded-2xl font-bold hover:bg-primary-dim transition-all shadow-xl shadow-primary/20"
            >
              <span>Explore Books</span>
            </a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {favorites.map((book, idx) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="relative group"
              >
                <BookCard
                  book={book}
                  index={idx}
                  onLikeToggle={(isLiked) => {
                    if (!isLiked) removeFavorite(book.id);
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
