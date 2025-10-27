import React from 'react';

const services = [
  {
    icon: <svg className="w-12 h-12 mb-4 text-teal-500 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    title: 'משכנתא חדשה',
    description: 'ליווי מלא לרכישת דירה ראשונה או למשפרי דיור. החל מבניית תמהיל אופטימלי ועד לחתימה בבנק.',
  },
  {
    icon: <svg className="w-12 h-12 mb-4 text-teal-500 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 20L20 4" /></svg>,
    title: 'מיחזור משכנתא',
    description: 'בדיקת כדאיות למיחזור המשכנתא הקיימת שלכם במטרה לשפר תנאים, להקטין את ההחזר החודשי ולקצר את התקופה.',
  },
  {
    icon: <svg className="w-12 h-12 mb-4 text-teal-500 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>,
    title: 'משכנתא למשקיעים',
    description: 'פתרונות מימון מותאמים למשקיעי נדל"ן, תוך מיקסום התשואה והתחשבות בהיבטי מס.',
  },
  {
    icon: <svg className="w-12 h-12 mb-4 text-teal-500 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 13v-1m-4.5-6.5H6m12 0h-1.5M12 18.5A6.5 6.5 0 1112 5.5a6.5 6.5 0 010 13z" /></svg>,
    title: 'משכנתא לכל מטרה',
    description: 'קבלת הלוואה בתנאי משכנתא כנגד נכס קיים, לטובת שיפוץ, סגירת חובות, עזרה לילדים ועוד.',
  },
];

export const Services: React.FC = () => {
  return (
    <section className="py-20 bg-slate-100 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">השירותים שלנו</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">פתרונות מותאמים אישית לכל צורך פיננסי</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:-translate-y-2">
              {service.icon}
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};