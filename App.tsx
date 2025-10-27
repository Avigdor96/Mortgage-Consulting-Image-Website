import React, { useState, useRef, useEffect } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { MortgageCalculator } from './components/MortgageCalculator';
import { AiAdvisor } from './components/AiAdvisor';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

// Custom hook for observing intersection to trigger animations
const useAnimateOnScroll = (ref: React.RefObject<HTMLDivElement>) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Animate when 10% of the component is visible
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref]);

  return isVisible;
};


const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') === 'dark';
    }
    // Check for prefers-color-scheme if no localStorage is set
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };
  
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const aiAdvisorRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'ראשי', ref: heroRef },
    { name: 'אודות', ref: aboutRef },
    { name: 'שירותים', ref: servicesRef },
    { name: 'מחשבון', ref: calculatorRef },
    { name: 'יועץ AI', ref: aiAdvisorRef },
    { name: 'המלצות', ref: testimonialsRef },
    { name: 'יצירת קשר', ref: contactRef },
  ];
  
  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Use the hook for each section to control its visibility for animation
  const isAboutVisible = useAnimateOnScroll(aboutRef);
  const isServicesVisible = useAnimateOnScroll(servicesRef);
  const isCalculatorVisible = useAnimateOnScroll(calculatorRef);
  const isAiAdvisorVisible = useAnimateOnScroll(aiAdvisorRef);
  const isTestimonialsVisible = useAnimateOnScroll(testimonialsRef);
  const isContactVisible = useAnimateOnScroll(contactRef);


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header navLinks={navLinks} scrollToRef={scrollToRef} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main>
        <div ref={heroRef}><Hero scrollToRef={() => scrollToRef(contactRef)} /></div>
        
        <div ref={aboutRef} className={`transition-all duration-700 ease-out ${isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <About />
        </div>
        
        <div ref={servicesRef} className={`transition-all duration-700 ease-out ${isServicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <Services />
        </div>
        
        <div ref={calculatorRef} className={`transition-all duration-700 ease-out ${isCalculatorVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {/* FIX: Pass isDarkMode prop to MortgageCalculator to be used for styling the chart tooltip. */}
          <MortgageCalculator isDarkMode={isDarkMode} />
        </div>
        
        <div ref={aiAdvisorRef} className={`transition-all duration-700 ease-out ${isAiAdvisorVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <AiAdvisor />
        </div>
        
        <div ref={testimonialsRef} className={`transition-all duration-700 ease-out ${isTestimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <Testimonials />
        </div>
        
        <div ref={contactRef} className={`transition-all duration-700 ease-out ${isContactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <Contact />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;