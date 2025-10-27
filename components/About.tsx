import React from 'react';

export const About: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img 
              src="https://picsum.photos/600/400?random=1" 
              alt="יועץ משכנתאות בפגישה" 
              className="rounded-lg shadow-2xl w-full"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              נעים להכיר, שמי ישראל ישראלי
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              עם ניסיון של שנים במערכת הבנקאית ובתחום הפיננסים, החלטתי לעבור צד ולעמוד לצדכם - הלקוחות. אני מבין את המורכבות, את החששות ואת הצורך במישהו שילחם עבורכם וידאג לאינטרסים שלכם בלבד.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              השליחות שלי היא להפוך את תהליך לקיחת המשכנתא לפשוט, שקוף ומשתלם. אני מאמין שעם התכנון הנכון, כל אחד יכול להגיע לדירה משלו בתנאים אופטימליים.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg className="w-6 h-6 text-teal-500 dark:text-teal-400 me-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-slate-700 dark:text-slate-200">שקיפות מלאה לאורך כל הדרך</span>
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 text-teal-500 dark:text-teal-400 me-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-slate-700 dark:text-slate-200">חיסכון של עשרות עד מאות אלפי שקלים</span>
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 text-teal-500 dark:text-teal-400 me-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-slate-700 dark:text-slate-200">ליווי אישי וזמינות גבוהה</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};