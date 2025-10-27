
import React from 'react';

interface HeroProps {
  scrollToRef: () => void;
}

export const Hero: React.FC<HeroProps> = ({ scrollToRef }) => {
  return (
    <section className="relative min-h-[80vh] md:min-h-screen flex items-center bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')"}}>
      <div className="absolute inset-0 bg-slate-900 bg-opacity-50"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4">
          הדרך למשכנתא החלומית שלכם מתחילה כאן
        </h1>
        <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto mb-8">
          ליווי מקצועי, אישי ואמין לקראת אחד הצעדים החשובים בחייכם. אני כאן כדי להבטיח שתקבלו את התנאים הטובים ביותר, בשקט נפשי מלא.
        </p>
        <button 
          onClick={scrollToRef}
          className="bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-600 transition-transform transform hover:scale-105 shadow-lg text-lg">
          בואו נדבר
        </button>
      </div>
    </section>
  );
};
