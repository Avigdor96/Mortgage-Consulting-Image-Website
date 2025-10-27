import React from 'react';
import { Testimonial } from '../types';

const testimonialsData: Testimonial[] = [
  {
    name: 'משפחת כהן',
    location: 'תל אביב',
    quote: 'הגענו מבולבלים וחסרי ידע, ויצאנו עם משכנתא מעולה ושקט נפשי. התהליך היה פשוט וברור בזכות הליווי הצמוד. ממליצים בחום!',
    avatar: 'https://picsum.photos/100/100?random=2',
  },
  {
    name: 'דניאל לוי',
    location: 'חיפה',
    quote: 'חשבתי שאני משלם ריביות טובות, אבל מיחזור המשכנתא חסך לי מעל 150,000 ש"ח! החלטה הכי טובה שעשיתי. תודה רבה!',
    avatar: 'https://picsum.photos/100/100?random=3',
  },
  {
    name: 'ירדן ואביתר',
    location: 'ירושלים',
    quote: 'כזוג צעיר, פחדנו מאוד מהתהליך. הליווי המקצועי והסבלנות האינסופית הפכו את החלום למציאות. לא היינו מצליחים בלעדיך.',
    avatar: 'https://picsum.photos/100/100?random=4',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">לקוחות ממליצים</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">ההצלחה שלכם היא ההצלחה שלי</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="bg-slate-50 dark:bg-slate-700/50 p-8 rounded-lg shadow-lg relative">
              <svg className="absolute top-4 right-4 w-10 h-10 text-slate-200 dark:text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.43 2.58a1 1 0 00-1.413.238l-4.5 7.5a1 1 0 00-.213.626V16a1 1 0 001 1h8a1 1 0 001-1v-5.056a1 1 0 00-.213-.626l-4.5-7.5a1 1 0 00-.66-.238zM12 14H6v-3.333l4-6.667 4 6.667V14z" clipRule="evenodd" fillRule="evenodd" />
              </svg>
              <p className="text-slate-600 dark:text-slate-300 italic mb-6 relative z-10">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full me-4" />
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};