import React, { useState, useEffect } from 'react';

interface NavLink {
  name: string;
  ref: React.RefObject<HTMLDivElement>;
}

interface HeaderProps {
  navLinks: NavLink[];
  scrollToRef: (ref: React.RefObject<HTMLDivElement>) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<{ isDarkMode: boolean; toggleTheme: () => void; }> = ({ isDarkMode, toggleTheme }) => {
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            aria-label="Toggle theme"
        >
            {isDarkMode ? (
                // Sun icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ) : (
                // Moon icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            )}
        </button>
    );
};

export const Header: React.FC<HeaderProps> = ({ navLinks, scrollToRef, isDarkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
             <svg className="h-8 w-8 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xl font-bold text-teal-700 dark:text-teal-300 ms-2">יועץ המשכנתאות שלך</span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-4 space-x-reverse">
            {navLinks.map((link) => (
              <button key={link.name} onClick={() => scrollToRef(link.ref)} className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors">
                {link.name}
              </button>
            ))}
             <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          </nav>
          
          {/* Mobile Menu Button & Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-300 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => {
                    scrollToRef(link.ref);
                    setIsOpen(false);
                  }} 
                  className="text-right text-slate-600 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 bg-slate-100 dark:bg-slate-800 p-3 rounded-md font-medium transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};