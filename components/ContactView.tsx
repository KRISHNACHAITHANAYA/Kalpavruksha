import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

interface ContactViewProps {
  t: (key: string) => string;
}

const ContactView: React.FC<ContactViewProps> = ({ t }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // EmailJS configuration - Get these from https://www.emailjs.com/
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message,
          to_email: 'nbyashwanth084@gmail.com', // Replace with your email
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      );

      console.log('Email sent successfully:', result);
      setIsSent(true);
    } catch (err) {
      console.error('Email send failed:', err);
      setError(t('contactErrorMessage'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSent(false);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setError('');
  };

  if (isSent) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-green-400 mb-4">{t('contactSuccessTitle')}</h2>
        <p className="text-gray-300 mb-6">{t('contactSuccessMessage')}</p>
        <button
          onClick={handleReset}
          className="text-green-400 hover:text-green-300 underline transition-colors"
        >
          {t('sendAnotherMessage')}
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-2 text-center">{t('contactTitle')}</h2>
      <p className="text-gray-400 mb-8 text-center">{t('contactIntro')}</p>
      
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 glass-card p-8">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">{t('contactNameLabel')}</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-white/10 border-gray-600 text-white rounded-md p-3 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">{t('contactEmailLabel')}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-white/10 border-gray-600 text-white rounded-md p-3 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">{t('contactSubjectLabel')}</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full bg-white/10 border-gray-600 text-white rounded-md p-3 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">{t('contactMessageLabel')}</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="w-full bg-white/10 border-gray-600 text-white rounded-md p-3 focus:ring-green-500 focus:border-green-500"
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? t('sending') : t('contactSendButton')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactView;
