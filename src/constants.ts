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
    download_url: 'https://kehulum.com/books_asset/books_91/collection/grade-9-amharic-new-curriculum--student-textbook-kehulumcom1759933673b3a1.pdf',
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
    download_url: 'https://kehulum.com/bfile_asset/books_98/collection/grade-11-mathematics-new-curriculum--student-textbook-kehulumcom1759919088fbdb.pdf',
    description: 'Complete teaching guide for Grade 11 Mathematics following the new curriculum.'
  },
  {
    id: 'c3',
    title: 'Biology Student Textbook - Grade 12',
    author: 'Ministry of Education',
    cover_url: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=400',
    category: 'curriculum',
    grade_level: 12,
    download_url: 'https://kehulum.com/bfile_asset/books_99/collection/grade-12-biology-new-curriculum--student-textbook-kehulumcom17599148324a02.pdf',
    description: 'Grade 12 Biology student textbook aligned with MOE standards.'
  },
  {
    id: 'c4',
    title: 'Physics Student Textbook - Grade 10',
    author: 'Ministry of Education',
    cover_url: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=400',
    category: 'curriculum',
    grade_level: 10,
    download_url: 'https://kehulum.com/bfile_asset/books_92/collection/grade-10-physics-new-curriculum--student-textbook-kehulumcom17599255229e06.pdf',
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
    download_url: 'https://typicalethiopian.com/wp-content/uploads/2022/03/Oromay.pdf',
    description: 'A classic Ethiopian novel exploring complexity and human nature.'
  },
  {
    id: 'f2',
    title: 'Fikir Eske Mekabir',
    author: 'Haddis Alemayehu',
    cover_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
    category: 'fiction',
    genre: 'Drama',
    download_url: 'https://typicalethiopian.com/wp-content/uploads/2022/02/%E1%8D%8D%E1%89%85%E1%88%AD-%E1%8A%A5%E1%88%B5%E1%8A%A8-%E1%88%98%E1%89%83%E1%89%A5%E1%88%AD-.pdf',
    description: 'One of the greatest love stories in Ethiopian literature.'
  },
  {
    id: 'f3',
    title: 'Kadmas Bashager',
    author: 'Tsegaye Gebre-Medhin',
    cover_url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=400',
    category: 'fiction',
    genre: 'Drama',
    download_url: 'https://typicalethiopian.com/wp-content/uploads/2022/02/%E1%89%A0%E1%8B%93%E1%88%89-%E1%8C%8D%E1%88%AD%E1%88%9B_%E1%8A%A8%E1%8A%A0%E1%8B%B5%E1%88%9B%E1%88%B5-%E1%89%A3%E1%88%BB%E1%8C%88%E1%88%AD.pdf',
    description: 'A celebrated play by Ethiopia\'s poet laureate exploring themes of identity, heritage, and resistance.'
  },
];

export const NEW_ARRIVALS: Book[] = [
  {
    id: 'n1',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    cover_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400',
    category: 'non-fiction',
    genre: 'History',
    download_url: 'https://typicalethiopian.com/wp-content/uploads/2022/03/Sapiens.pdf',
    description: 'Explores the history of humankind from the evolution of archaic human species in the Stone Age up to the twenty-first century.'
  }
];

export const books = [...CURRICULUM_BOOKS, ...FICTION_BOOKS, ...NEW_ARRIVALS];
