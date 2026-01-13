import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Gamepad2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
}

interface TopNavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

const TopNavbar: React.FC<TopNavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = navItems.map(item => item.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-lg'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="text-xl font-bold text-foreground hover:text-primary transition-colors"
            >
              <span className="hidden sm:inline">Murali Vennapusa</span>
              <span className="sm:hidden">MV</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    'hover:bg-primary/10 hover:text-primary',
                    activeSection === item.href.substring(1)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Game Link */}
              <a
                href="#game"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#game');
                }}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  'hover:bg-accent/20 hover:text-accent flex items-center gap-2',
                  activeSection === 'game'
                    ? 'text-accent bg-accent/10'
                    : 'text-muted-foreground'
                )}
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Game</span>
              </a>
            </div>

            {/* Right side - Theme toggle & Mobile menu */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className={cn(
                  'p-2.5 rounded-lg transition-all duration-200',
                  'hover:bg-primary/10 hover:scale-105',
                  'focus:outline-none focus:ring-2 focus:ring-primary/50'
                )}
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <Moon className="w-5 h-5 text-primary" />
                ) : (
                  <Sun className="w-5 h-5 text-amber-500" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'md:hidden p-2.5 rounded-lg transition-all duration-200',
                  'hover:bg-primary/10',
                  'focus:outline-none focus:ring-2 focus:ring-primary/50'
                )}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-foreground" />
                ) : (
                  <Menu className="w-5 h-5 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden transition-all duration-300',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <nav
          className={cn(
            'absolute top-16 left-4 right-4 p-4 rounded-2xl',
            'bg-card border border-border shadow-xl',
            'transform transition-all duration-300',
            isMobileMenuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-4 opacity-0'
          )}
        >
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={cn(
                  'px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
                  'hover:bg-primary/10 hover:text-primary',
                  activeSection === item.href.substring(1)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </a>
            ))}
            
            {/* Game Link */}
            <a
              href="#game"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#game');
              }}
              className={cn(
                'px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
                'hover:bg-accent/20 hover:text-accent flex items-center gap-2',
                'text-muted-foreground'
              )}
            >
              <Gamepad2 className="w-5 h-5" />
              <span>Play Game</span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default TopNavbar;
