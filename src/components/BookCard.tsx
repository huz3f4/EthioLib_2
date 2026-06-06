import { motion } from 'motion/react';
import { Download, Heart, GraduationCap, ChevronRight } from 'lucide-react';
import { Book } from '@/src/constants';
import { cn } from '@/src/lib/utils';
import { useState } from 'react';

interface BookCardProps {
  book: Book;
  index: number;
  key?: string | number;
}

export default function BookCard({ book, index }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all hover:shadow-2xl hover:shadow-indigo-100 flex flex-col h-full"
    >
      {/* Badge for Curriculum/Teacher Guide */}
      {book.category === 'curriculum' && (
        <div className="absolute top-3 left-3 z-10">
          <span className={cn(
            "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm",
            book.is_teachers_guide 
              ? "bg-amber-100 text-amber-700" 
              : "bg-indigo-100 text-indigo-700"
          )}>
            {book.is_teachers_guide ? "Teacher Guide" : `Grade ${book.grade_level}`}
          </span>
        </div>
      )}

      {/* Favorite Button */}
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className={cn(
          "absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all",
          isFavorite ? "bg-red-50 text-red-500" : "bg-black/5 text-white hover:bg-black/20"
        )}
      >
        <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
      </button>

      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={book.cover_url}
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
            href={book.download_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold shadow-xl hover:bg-indigo-600 hover:text-white transition-colors"
          >
            <span>Read Now</span>
            <ChevronRight size={16} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">
            {book.genre || book.category}
          </p>
          <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight mb-1 group-hover:text-indigo-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-xs text-gray-500 mb-2">{book.author}</p>
        </div>
        
        <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center space-x-1 text-gray-400">
            <GraduationCap size={14} />
            <span className="text-[10px] font-medium">Curriculum Authored</span>
          </div>
          <button className="text-gray-400 hover:text-indigo-600 transition-colors">
            <Download size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
