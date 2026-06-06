import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Book as BookIcon, Library, GraduationCap, Sparkles, User, Search, Menu, X, LogOut, Moon, Sun } from 'lucide-react';
import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/contexts/AuthContext';

const navItems = [
  { name: 'Educational', path: '/educational', icon: GraduationCap },
  { name: 'Fiction', path: '/fiction', icon: Sparkles },
  { name: 'My Library', path: '/library', icon: Library },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  const getUserDisplay = () => {
    if (user?.email) {
      return user.email.split('@')[0]; // Show just the email prefix
    }
    return 'User';
  };

  return (
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-[#1E4035] rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg shadow-[#1E4035]/20">
                <BookIcon size={24} />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-on-surface to-on-surface-variant">
                EthioLib
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-[#2E6B55]",
                  location.pathname === item.path ? "text-primary" : "text-on-surface-variant"
                )}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="h-6 w-px bg-outline-variant mx-2" />
            
            <button
              onClick={toggleTheme}
              className="p-2 text-on-surface-variant hover:text-primary transition-colors"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-l-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm w-40 text-on-surface"
              />
              <button
                type="submit"
                className="p-2 bg-[#1E4035] text-white rounded-r-lg hover:bg-[#2E6B55] transition-colors"
              >
                <Search size={18} />
              </button>
            </form>
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 bg-[#F0E8D5] text-[#1E4035] px-4 py-2 rounded-full text-sm font-medium">
                  <User size={18} />
                  <span>{getUserDisplay()}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/10">
                <User size={18} />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-outline-variant overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm text-on-surface"
                />
                <button
                  type="submit"
                  className="p-2 bg-[#1E4035] text-white rounded-lg hover:bg-[#2E6B55] transition-colors"
                >
                  <Search size={18} />
                </button>
              </form>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-3 rounded-xl text-base font-medium transition-colors",
                    location.pathname === item.path 
                      ? "bg-surface-container text-primary" 
                      : "text-on-surface-variant hover:bg-surface-container"
                  )}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-outline-variant">
                {user ? (
                  <>
                    <div className="px-3 py-3 text-sm font-medium text-on-surface-variant flex items-center space-x-2">
                      <User size={18} />
                      <span>{getUserDisplay()}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-3 py-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={20} />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-3 py-3 rounded-xl text-base font-medium text-white bg-[#1E4035] hover:bg-[#2E6B55] shadow-lg shadow-[#1E4035]/10"
                  >
                    <User size={20} />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
