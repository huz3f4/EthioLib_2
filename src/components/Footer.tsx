import { Link } from 'react-router-dom';
import { Book as BookIcon, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-bright border-t border-outline-variant pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6 group">
              <div className="w-8 h-8 bg-[#1E4035] rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <BookIcon size={18} />
              </div>
              <span className="text-lg font-bold text-on-surface">EthioLib</span>
            </Link>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
              Empowering Ethiopian students with free access to the national curriculum and world-class literature.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-on-surface mb-6 text-sm uppercase tracking-wider">Library</h4>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li><Link to="/educational" className="hover:text-primary transition-colors">Curriculum</Link></li>
              <li><Link to="/fiction" className="hover:text-primary transition-colors">Fiction</Link></li>
              <li><Link to="/library" className="hover:text-primary transition-colors">My Collection</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-on-surface mb-6 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li><a href="#" className="hover:text-primary transition-colors">How to use</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Request a Book</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-on-surface mb-6 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li><Link to="/terms" className="hover:text-primary transition-colors font-semibold">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><span className="text-xs opacity-60">Resources provided by MOE Ethiopia & Kehulum</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-on-surface-variant">
            © {currentYear} EthioLib. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-xs text-on-surface-variant font-medium">
            <Globe size={14} />
            <span>Made for Ethiopia 🇪🇹</span>
          </div>
        </div>
      </div>
    </footer>
  );
}