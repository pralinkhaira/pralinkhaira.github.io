import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Mail, MapPin, Phone } from 'lucide-react';
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
      className="relative min-h-screen flex flex-col justify-center py-24 px-4 lg:px-8 border-b dark:border-white/5 border-gray-200 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-2/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-brand/10 text-brand border border-brand/20 rounded-full"
          >
            Get in touch
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-8xl font-black dark:text-white text-gray-900 mb-8 tracking-tight leading-tight">
            Let's build something <span className="gradient-text">great.</span>
          </h2>
          <p className="mx-auto text-lg dark:text-gray-400 text-gray-600 leading-relaxed max-w-2xl">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              {[
                { icon: Mail, label: 'Email Me', value: 'pralin.khaira.1903@gmail.com', href: 'mailto:pralin.khaira.1903@gmail.com' },
                { icon: Phone, label: 'Call Me', value: '+91 7780831020', href: 'tel:+917780831020' },
                { icon: MapPin, label: 'Location', value: 'Jammu, India', href: '#' },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-brand/50 transition-all duration-300 group-hover:scale-110">
                    <item.icon className="text-brand" size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{item.label}</p>
                    <p className="text-lg font-bold dark:text-white text-gray-900 group-hover:text-brand transition-colors">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Form Glow */}
            <div className="absolute -inset-4 bg-brand/5 blur-3xl rounded-full opacity-50 pointer-events-none" />

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative p-8 md:p-10 dark:bg-gray-900/50 bg-white rounded-[32px] border dark:border-white/10 border-gray-200 backdrop-blur-xl shadow-2xl space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="user_name"
                    placeholder="John Doe"
                    className="w-full px-6 py-4 rounded-2xl dark:bg-white/5 bg-gray-50 border dark:border-white/10 border-gray-200 dark:text-white text-gray-900 dark:placeholder-gray-600 placeholder-gray-400 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all font-sans text-sm font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="user_email"
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 rounded-2xl dark:bg-white/5 bg-gray-50 border dark:border-white/10 border-gray-200 dark:text-white text-gray-900 dark:placeholder-gray-600 placeholder-gray-400 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all font-sans text-sm font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="How can I help you?"
                  className="w-full px-6 py-4 rounded-2xl dark:bg-white/5 bg-gray-50 border dark:border-white/10 border-gray-200 dark:text-white text-gray-900 dark:placeholder-gray-600 placeholder-gray-400 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all font-sans text-sm font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Tell me about your project..."
                  className="w-full px-6 py-4 rounded-2xl dark:bg-white/5 bg-gray-50 border dark:border-white/10 border-gray-200 dark:text-white text-gray-900 dark:placeholder-gray-600 placeholder-gray-400 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all font-sans text-sm font-medium resize-none"
                />
              </div>
              
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full group relative px-8 py-5 rounded-2xl bg-brand text-white font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:shadow-2xl hover:shadow-brand/40 overflow-hidden disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand to-brand-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {status === 'sending' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Dispatching...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </span>
              </button>

              {/* Status Notifications */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-bold"
                  >
                    <CheckCircle size={20} />
                    Message sent! I'll get back to you soon.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold"
                  >
                    <AlertCircle size={20} />
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
