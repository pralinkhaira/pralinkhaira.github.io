import { useState, useRef } from 'react';
import { motion }from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    const name = form.user_name.value.trim();
    const email = form.user_email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
      setStatus('error');
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('sending');

    emailjs
      .send(
        'service_q4a91tt',
        'template_ojloafw',
        {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message,
        },
        'fq5lMDraFRHP_Mhvc'
      )
      .then(() => {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus(null), 5000);
      })
      .catch(() => {
        setStatus('error');
        setErrorMessage('Failed to send message. Please try again later.');
        setTimeout(() => setStatus(null), 5000);
      });
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center py-20 px-4 lg:px-8 border-b-2 dark:border-white/5 border-gray-200"
    >
      <div className="max-w-3xl mx-auto w-full text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h6 className="text-brand font-bold text-sm uppercase tracking-widest mb-2">Contact</h6>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold dark:text-white text-gray-900">
            Let's talk
          </h1>
        </motion.div>

        {/* Form */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="user_name"
              placeholder="Enter your name"
              className="w-full px-5 py-3 rounded-xl dark:bg-gray-900/50 bg-white/70 border dark:border-white/10 border-gray-300 dark:text-white text-gray-900 dark:placeholder-gray-500 placeholder-gray-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/25 transition-all font-sans text-sm"
            />
            <input
              type="email"
              name="user_email"
              placeholder="Enter your email"
              className="w-full px-5 py-3 rounded-xl dark:bg-gray-900/50 bg-white/70 border dark:border-white/10 border-gray-300 dark:text-white text-gray-900 dark:placeholder-gray-500 placeholder-gray-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/25 transition-all font-sans text-sm"
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Enter subject"
            className="w-full px-5 py-3 rounded-xl dark:bg-gray-900/50 bg-white/70 border dark:border-white/10 border-gray-300 dark:text-white text-gray-900 dark:placeholder-gray-500 placeholder-gray-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/25 transition-all font-sans text-sm"
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Enter your message"
            className="w-full px-5 py-3 rounded-xl dark:bg-gray-900/50 bg-white/70 border dark:border-white/10 border-gray-300 dark:text-white text-gray-900 dark:placeholder-gray-500 placeholder-gray-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/25 transition-all font-sans text-sm resize-none"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full px-8 py-3.5 rounded-xl bg-brand text-white font-bold text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/30 hover:bg-brand-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            {status === 'sending' ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={16} />
                Contact me!
              </>
            )}
          </button>
        </motion.form>

        {/* Status Toast */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold"
          >
            <CheckCircle size={18} />
            Your message was sent successfully!
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold"
          >
            <AlertCircle size={18} />
            {errorMessage}
          </motion.div>
        )}
      </div>
    </section>
  );
}
