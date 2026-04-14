import { Mail } from 'lucide-react';
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';
import { socialLinks } from '../data/portfolioData';

const iconMap = {
  Linkedin: FaLinkedin,
  Mail,
  Github: FaGithub,
  Facebook: FaFacebook,
  Instagram: FaInstagram,
};

export default function Footer() {
  return (
    <footer className="py-10 px-4 lg:px-8 border-t dark:border-white/5 border-gray-200">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="text-sm dark:text-gray-400 text-gray-600">
            Copyright © 2026 By{' '}
            <a href="#" className="font-bold dark:text-white text-gray-900 hover:text-brand transition-colors">
              Pralin Khaira
            </a>
          </p>
          <p className="text-xs text-gray-500 mt-1">All Rights Reserved.</p>
        </div>

        <div className="flex items-center gap-3">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.icon}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full dark:bg-gray-900/50 bg-white/70 border dark:border-white/5 border-gray-200 flex items-center justify-center dark:text-gray-400 text-gray-600 hover:text-brand hover:border-brand/30 hover:bg-brand/10 transition-all duration-300"
              >
                {Icon && <Icon size={18} />}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
