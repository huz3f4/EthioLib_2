import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '@/src/contexts/AuthContext';
import { getSupabase } from '@/src/lib/supabase';
import BookCard from '@/src/components/BookCard';
import { books as staticBooks } from '@/src/constants';

interface Book {
  id: string;
  title: string;
  author?: string;
  cover_url?: string;
  category?: string;
  download_url?: string;
  description?: string;
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
      if (!supabase) return;

      // Get user profile with favorite book IDs
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('favorite_books')
        .eq('id', user?.id)
        .single();

      if (error || !profile) {
        console.error('Error fetching profile:', error);
        setLoading(false);
        return;
      }

      // Get the favorite book IDs
      const favoriteIds = (profile.favorite_books as string[]) || [];

      // Fetch the actual book details from the books table
      if (favoriteIds.length > 0) {
        const { data: books, error: booksError } = await supabase
          .from('books')
          .select('*')
          .in('id', favoriteIds);

        if (booksError) {
          console.error('Error fetching books:', booksError);
        } else {
          setFavorites(books || []);
        }
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
      if (!supabase) return;

      // Get current favorite books
      const { data: profile } = await supabase
        .from('profiles')
        .select('favorite_books')
        .eq('id', user?.id)
        .single();

      if (!profile) return;

      const updatedFavorites = ((profile.favorite_books as string[]) || []).filter(
        (id: string) => id !== bookId
      );

      // Update the profile
      const { error } = await supabase
        .from('profiles')
        .update({ favorite_books: updatedFavorites } as Record<string, unknown>)
        .eq('id', user?.id);

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
      <div className="min-h-[calc(100vh-64px)] bg-[#FAFAF7] flex items-center justify-center">
        <div className="text-gray-500 font-bold">Loading your library...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAF7] min-h-[calc(100vh-64px)] pb-20">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-black text-gray-900 mb-2">My Library</h1>
            <p className="text-gray-500">
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
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart size={40} className="text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Your library is empty
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Start adding your favorite books from the Educational and Fiction sections.
              Tap the heart icon on any book to add it to your library.
            </p>
            <a
              href="/educational"
              className="inline-flex items-center space-x-2 bg-[#1E4035] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#2E6B55] transition-all shadow-xl shadow-[#1E4035]/20"
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
                  book={{
                    id: book.id,
                    title: book.title || 'Untitled',
                    author: book.author || 'Unknown',
                    cover_url: book.cover_url || '',
                    category: book.category || '',
                    download_url: book.download_url || '',
                    description: book.description || '',
                  } as any}
                  index={idx}
                />
                <button
                  onClick={() => removeFavorite(book.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove from library"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
