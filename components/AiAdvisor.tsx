import React, { useState, useRef, useEffect } from 'react';
import { AiMessage } from '../types';
import { askAiAdvisor } from '../services/geminiService';

export const AiAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<AiMessage[]>([
    { sender: 'ai', text: 'שלום! אני יועץ המשכנתאות הוירטואלי. שאלו אותי שאלות כלליות על עולם המשכנתאות (לדוגמה: "מה זה ריבית פריים?"). שימו לב, אני לא מספק ייעוץ אישי.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: AiMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiResponseText = await askAiAdvisor(input);
    const aiMessage: AiMessage = { sender: 'ai', text: aiResponseText };
    
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <section className="py-20 bg-slate-100 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">שאל את יועץ ה-AI</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">קבלו תשובות מהירות לשאלות נפוצות 24/7</p>
        </div>
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden">
          <div className="h-96 p-4 overflow-y-auto rtl-scroll">
            {messages.map((msg, index) => (
              <div key={index} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg px-4 py-2 max-w-xs lg:max-w-md ${msg.sender === 'user' ? 'bg-teal-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                  <div className="rounded-lg px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800">
                      <div className="flex items-center space-x-2 space-x-reverse">
                          <div className="w-2 h-2 bg-slate-500 dark:bg-slate-400 rounded-full animate-pulse delay-75"></div>
                          <div className="w-2 h-2 bg-slate-500 dark:bg-slate-400 rounded-full animate-pulse delay-150"></div>
                          <div className="w-2 h-2 bg-slate-500 dark:bg-slate-400 rounded-full animate-pulse delay-300"></div>
                      </div>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="כתבו את שאלתכם כאן..."
              className="flex-grow p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-slate-200 rounded-s-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
              disabled={isLoading}
            />
            <button 
              onClick={handleSend}
              className="bg-teal-500 text-white px-4 rounded-e-md hover:bg-teal-600 dark:hover:bg-teal-500 disabled:bg-slate-400 dark:disabled:bg-slate-500"
              disabled={isLoading}
            >
              שלח
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};