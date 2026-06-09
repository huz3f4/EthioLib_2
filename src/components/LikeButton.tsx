import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '@/src/contexts/AuthContext';
import { getSupabase } from '@/src/lib/supabase';
import { cn } from '@/src/lib/utils';

interface LikeButtonProps {
  bookId: string;
  className?: string;
}

export default function LikeButton({ bookId, className }: LikeButtonProps) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    
    const checkLikedStatus = async () => {
      const supabase = getSupabase();
      if (!supabase) return;

      const { data } = await supabase
        .from('profiles')
        .select('favorite_books')
        .eq('id', user.id)
        .single();

      if (data?.favorite_books) {
        setIsLiked((data.favorite_books as string[]).includes(bookId));
      }
    };

    checkLikedStatus();
  }, [user, bookId]);

  const toggleLike = async (e: React.MouseEvent) => {
    // Prevent navigation if the button is inside a Link
    e.preventDefault();
    e.stopPropagation();
    
    if (!user || loading) return;

    const supabase = getSupabase();
    if (!supabase) return;

    const wasLiked = isLiked;
    setIsLiked(!wasLiked);
    setLoading(true);

    try {
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('favorite_books')
        .eq('id', user.id)
        .single();

      if (fetchError) throw fetchError;

      const currentFavorites = (data?.favorite_books as string[]) || [];
      
      const updatedFavorites = wasLiked
        ? currentFavorites.filter((id) => id !== bookId)
        : currentFavorites.includes(bookId) ? currentFavorites : [...currentFavorites, bookId];

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ favorite_books: updatedFavorites })
        .eq('id', user.id);

      if (updateError) throw updateError;
    } catch (err) {
      console.error('Error toggling favorite:', err);
      setIsLiked(wasLiked); // Rollback on error
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleLike}
      disabled={loading}
      className={cn(
        "p-2 transition-all group",
        className
      )}
      aria-label={isLiked ? "Remove from library" : "Add to library"}
    >
      <motion.div
        animate={isLiked ? { scale: [1, 1.4, 1] } : { scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Heart
          size={20}
          className={cn(
            "transition-colors duration-300",
            isLiked 
              ? "fill-red-500 text-red-500 filter drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]" 
            : "text-white/80 group-hover:text-white filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          )}
        />
      </motion.div>
    </motion.button>
  );
}