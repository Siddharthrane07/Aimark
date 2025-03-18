import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, LayoutDashboard, LogIn, Menu, X } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const user = useAuthStore((state) => state.user);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold">AIBrand</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/portfolio">Portfolio</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>
            <NavLink to="/ai-assistant">AI Assistant</NavLink>
            <NavLink to="/market-research">Market Research</NavLink>
            <NavLink to="/TrendsPage">Trends</NavLink>
            {user ? (
              <Link 
                to="/dashboard" 
                className="flex items-center space-x-1 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-1 px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary/80 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background border-b border-border"
        >
          <div className="px-4 pt-2 pb-4 space-y-2">
            <MobileNavLink to="/services" onClick={() => setIsMenuOpen(false)}>
              Services
            </MobileNavLink>
            <MobileNavLink to="/portfolio" onClick={() => setIsMenuOpen(false)}>
              Portfolio
            </MobileNavLink>
            <MobileNavLink to="/pricing" onClick={() => setIsMenuOpen(false)}>
              Pricing
            </MobileNavLink>
            <MobileNavLink to="/ai-assistant" onClick={() => setIsMenuOpen(false)}>
              AI Assistant
            </MobileNavLink>
            <MobileNavLink to="/market-research" onClick={() => setIsMenuOpen(false)}>
              Market Research
            </MobileNavLink>
            {user ? (
              <MobileNavLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </MobileNavLink>
            ) : (
              <MobileNavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                Login
              </MobileNavLink>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="text-foreground/80 hover:text-foreground transition-colors"
  >
    {children}
  </Link>
);

const MobileNavLink = ({
  to,
  onClick,
  children
}: {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="block py-2 text-foreground/80 hover:text-foreground transition-colors"
  >
    {children}
  </Link>
);

export default Navbar;