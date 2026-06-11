import { motion } from 'motion/react';
import { Download, GraduationCap, ChevronRight } from 'lucide-react';
import { Book } from '@/src/constants';
import { cn } from '@/src/lib/utils';
import { useState } from 'react';
import LikeButton from './LikeButton';

interface BookCardProps {
  book: Book;
  index: number;
  key?: string | number;
  onLikeToggle?: (isLiked: boolean) => void;
}

export default function BookCard({ book, index, onLikeToggle }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const fallbackImage = "https://images.unsplash.com/photo-1543005124-8198f56709a1?auto=format&fit=crop&q=80&w=400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-surface-bright rounded-2xl overflow-hidden border border-outline-variant transition-all hover:shadow-2xl hover:shadow-primary/10 flex flex-col h-full"
    >
      {/* Badge for Curriculum/Teacher Guide */}
      {book.category === 'curriculum' && (
        <div className="absolute top-3 left-3 z-10">
          <span className={cn(
            "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm",
            book.is_teachers_guide 
              ? "bg-accent text-white" 
              : "bg-surface-container text-primary"
          )}>
            {book.is_teachers_guide ? "Teacher Guide" : `Grade ${book.grade_level}`}
          </span>
        </div>
      )}

    {/* Like Button */}
    <div className="absolute top-3 right-3 z-10">
      <LikeButton bookId={book.id} onToggle={onLikeToggle} />
    </div>

      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={book.cover_url || fallbackImage}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )} />
        
        {/* Quick View Overlay */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-300 transform",
          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          <a
            href={book.download_url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-surface-bright text-on-surface px-4 py-2 rounded-full text-sm font-semibold shadow-xl hover:bg-primary hover:text-white transition-colors"
          >
            <span>Read Now</span>
            <ChevronRight size={16} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">
            {book.genre || book.category}
          </p>
          <h3 className="text-sm font-bold text-on-surface line-clamp-2 leading-tight mb-1 group-hover:text-secondary transition-colors">
            {book.title}
          </h3>
          <p className="text-xs text-on-surface-variant mb-2">{book.author}</p>
        </div>
        
        <div className="pt-3 border-t border-outline-variant flex items-center justify-between">
          <div className="flex items-center space-x-1 text-on-surface-variant">
            <GraduationCap size={14} />
            <span className="text-[10px] font-medium">Curriculum Authored</span>
          </div>
          <button className="text-on-surface-variant hover:text-secondary transition-colors">
            <Download size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
