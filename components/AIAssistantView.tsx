import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { getAIAssistantResponse } from '../services/analysisService';
import Spinner from './Spinner';

interface AIAssistantViewProps {
  t: (key: string) => string;
  language: Language;
}

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const AIAssistantView: React.FC<AIAssistantViewProps> = ({ t, language }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getAIAssistantResponse(input, language);
      const aiMessage: Message = { text: aiResponse, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Assistant Error:', error);
      const errorMessage: Message = { text: t('errorAIAssistant'), sender: 'ai' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto h-full flex flex-col">
      <h2 className="text-3xl font-bold text-white mb-2 text-center">{t('aiAssistantTitle')}</h2>
      <p className="text-gray-300 mb-6 text-center">{t('aiAssistantSubtitle')}</p>

      <div className="flex-grow glass-card flex flex-col overflow-hidden" style={{ minHeight: '60vh' }}>
        <div className="flex-grow p-6 space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-lg p-3 rounded-lg shadow-md ${msg.sender === 'user' ? 'bg-green-600 text-white' : 'bg-gray-800/50 text-gray-100'}`}
                dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }}
              >
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-gray-800/50 text-gray-100 p-3 rounded-lg">
                  <Spinner />
               </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="p-4 bg-black/30 border-t border-white/20 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('aiAssistantPlaceholder')}
            className="flex-grow px-4 py-2 bg-transparent border border-white/30 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-r-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
          >
            {t('sendButton')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantView;