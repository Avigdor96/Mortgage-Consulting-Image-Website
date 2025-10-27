import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 dark:bg-black/50 text-slate-300 py-8">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} יועץ המשכנתאות שלך. כל הזכויות שמורות.</p>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">
            האתר נבנה להדגמה בלבד. התכנים והחישובים להמחשה ואינם מהווים ייעוץ פיננסי.
        </p>
      </div>
    </footer>
  );
};