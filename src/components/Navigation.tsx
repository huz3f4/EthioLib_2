import { Link, useLocation } from 'react-router-dom';
import { Book as BookIcon, Library, GraduationCap, Sparkles, User, Search, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
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
  const location = useLocation();
  const { user, logout } = useAuth();

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
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg shadow-indigo-200">
                <BookIcon size={24} />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
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
                  "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-indigo-600",
                  location.pathname === item.path ? "text-indigo-600" : "text-gray-500"
                )}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="h-6 w-px bg-gray-200 mx-2" />
            <button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors">
              <Search size={20} />
            </button>
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium">
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
              <Link to="/auth" className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-gray-200">
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
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-3 rounded-xl text-base font-medium transition-colors",
                    location.pathname === item.path 
                      ? "bg-indigo-50 text-indigo-600" 
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100">
                {user ? (
                  <>
                    <div className="px-3 py-3 text-sm font-medium text-gray-600 flex items-center space-x-2">
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
                    className="flex items-center space-x-3 px-3 py-3 rounded-xl text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100"
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
