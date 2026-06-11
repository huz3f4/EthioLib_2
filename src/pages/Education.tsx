import { useState } from 'react';
import { CURRICULUM_BOOKS } from '@/src/constants';
import BookCard from '@/src/components/BookCard';
import Footer from '@/src/components/Footer';
import { motion } from 'motion/react';
import { GraduationCap, Filter } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Education() {
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [showGuides, setShowGuides] = useState(false);

  const filteredBooks = CURRICULUM_BOOKS.filter(book => {
    const gradeMatch = selectedGrade === 'all' || book.grade_level === selectedGrade;
    const guideMatch = !showGuides || book.is_teachers_guide;
    return gradeMatch && guideMatch;
  });

  const grades = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="bg-surface min-h-screen pb-20">
      {/* Header */}
      <section className="bg-surface-bright border-b border-outline-variant py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-2 text-primary font-bold mb-4">
                <GraduationCap size={20} />
                <span className="uppercase tracking-widest text-xs">Academic Resources</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-on-surface tracking-tight mb-4">
                Educational Content
              </h1>
              <p className="text-on-surface-variant leading-relaxed">
                Access all textbooks and teacher guides for the new Ethiopian curriculum. 
                Filter by grade to find the specific resources you need for your studies.
              </p>
            </div>
            
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2 bg-surface-container p-1 rounded-xl w-fit">
                <button
                  onClick={() => setShowGuides(false)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                    !showGuides ? "bg-surface-bright text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
                  )}
                >
                  Student Textbooks
                </button>
                <button
                  onClick={() => setShowGuides(true)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                    showGuides ? "bg-surface-bright text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
                  )}
                >
                  Teacher Guides
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grade Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-surface-bright p-4 rounded-2xl shadow-xl shadow-primary/5 border border-outline-variant overflow-x-auto">
          <div className="flex items-center space-x-2 min-w-max">
            <div className="flex items-center space-x-2 px-3 pr-6 border-r border-outline-variant">
              <Filter size={16} className="text-on-surface-variant" />
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Grade</span>
            </div>
            <button
              onClick={() => setSelectedGrade('all')}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                selectedGrade === 'all' ? "bg-primary text-white" : "text-on-surface-variant hover:bg-surface-container"
              )}
            >
              All
            </button>
            {grades.map(grade => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                  selectedGrade === grade ? "bg-primary text-white" : "text-on-surface-variant hover:bg-surface-container"
                )}
              >
                Grade {grade}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredBooks.map((book, idx) => (
              <BookCard key={book.id} book={book} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface-bright rounded-3xl border border-dashed border-outline">
            <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="text-on-surface-variant/40" size={32} />
            </div>
            <h3 className="text-lg font-bold text-on-surface">No books found</h3>
            <p className="text-on-surface-variant max-w-xs mx-auto">
              We couldn't find any resources for Grade {selectedGrade} matching your filters.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
