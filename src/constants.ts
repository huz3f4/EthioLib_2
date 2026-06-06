export interface Book {
  id: string;
  title: string;
  author: string;
  cover_url: string;
  category: 'curriculum' | 'fiction' | 'non-fiction' | 'reference' | 'biography';
  genre?: string;
  grade_level?: number;
  is_teachers_guide?: boolean;
  download_url: string;
  description: string;
}

export const CATEGORIES = [
  { id: 'curriculum', name: 'Curriculum', icon: 'BookOpen' },
  { id: 'fiction', name: 'Fiction', icon: 'Sparkles' },
  { id: 'non-fiction', name: 'Non-Fiction', icon: 'Info' },
  { id: 'reference', name: 'Reference', icon: 'Search' },
  { id: 'biography', name: 'Biography', icon: 'User' },
];

export const FICTION_GENRES = [
  'Historical',
  'Mystery',
  'Drama',
  'Folklore',
  'Romance',
];

export const CURRICULUM_BOOKS: Book[] = [
  {
    id: 'c1',
    title: 'Amharic Student Textbook - Grade 9',
    author: 'Ministry of Education',
    cover_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    category: 'curriculum',
    grade_level: 9,
    download_url: 'https://kehulum.com/textbook',
    description: 'New curriculum Amharic textbook for Grade 9 students in Ethiopia.'
  },
  {
    id: 'c2',
    title: 'Mathematics Teacher Guide - Grade 11',
    author: 'Ministry of Education',
    cover_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400',
    category: 'curriculum',
    grade_level: 11,
    is_teachers_guide: true,
    download_url: 'https://kehulum.com/textbook',
    description: 'Complete teaching guide for Grade 11 Mathematics following the new curriculum.'
  },
  {
    id: 'c3',
    title: 'Biology Student Textbook - Grade 12',
    author: 'Ministry of Education',
    cover_url: 'https://images.unsplash.com/photo-1532187863486-abf9d39d9992?auto=format&fit=crop&q=80&w=400',
    category: 'curriculum',
    grade_level: 12,
    download_url: 'https://kehulum.com/textbook',
    description: 'Grade 12 Biology student textbook aligned with MOE standards.'
  },
  {
    id: 'c4',
    title: 'Physics Student Textbook - Grade 10',
    author: 'Ministry of Education',
    cover_url: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=400',
    category: 'curriculum',
    grade_level: 10,
    download_url: 'https://kehulum.com/textbook',
    description: 'Foundational Physics concepts for Grade 10 students.'
  }
];

export const FICTION_BOOKS: Book[] = [
  {
    id: 'f1',
    title: 'Oromay',
    author: 'Bealu Girma',
    cover_url: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400',
    category: 'fiction',
    genre: 'Historical',
    download_url: '#',
    description: 'A classic Ethiopian novel exploring complexity and human nature.'
  },
  {
    id: 'f2',
    title: 'Fikir Eske Mekabir',
    author: 'Haddis Alemayehu',
    cover_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
    category: 'fiction',
    genre: 'Drama',
    download_url: '#',
    description: 'One of the greatest love stories in Ethiopian literature.'
  }
];

export const books = [...CURRICULUM_BOOKS, ...FICTION_BOOKS];
