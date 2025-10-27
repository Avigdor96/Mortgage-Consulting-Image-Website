import React, { useState } from 'react';

export const Contact: React.FC = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('תודה על פנייתך! ניצור קשר בהקדם.');
        // In a real app, you would handle form submission here (e.g., API call)
        e.currentTarget.reset();
        setTimeout(() => setStatus(''), 5000);
    };

  return (
    <section className="py-20 bg-slate-100 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">מוכנים להתחיל?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">השאירו פרטים ונתאם שיחת ייעוץ ראשונית ללא עלות וללא התחייבות.</p>
        </div>
        <div className="max-w-xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-slate-700 dark:text-slate-200 font-medium mb-2">שם מלא</label>
              <input type="text" id="name" name="name" required className="w-full p-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400" />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-slate-700 dark:text-slate-200 font-medium mb-2">טלפון</label>
              <input type="tel" id="phone" name="phone" required className="w-full p-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400" />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-slate-700 dark:text-slate-200 font-medium mb-2">הודעה (אופציונלי)</label>
              <textarea id="message" name="message" rows={4} className="w-full p-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-600 transition-colors shadow-lg text-lg w-full">
                שליחת פניה
              </button>
            </div>
            {status && <p className="text-center text-teal-600 dark:text-teal-400 mt-4">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};