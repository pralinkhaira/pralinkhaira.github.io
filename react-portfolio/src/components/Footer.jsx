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
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <p className="text-base font-medium dark:text-gray-300 text-gray-700">
            Copyright © 2026 By{' '}
            <a href="#" className="font-extrabold dark:text-white text-gray-900 hover:text-brand transition-colors">
              Pralin Khaira
            </a>
          </p>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-bold opacity-60">All Rights Reserved.</p>
        </div>

        <div className="scale-90 sm:scale-100">
          <SocialCard />
        </div>
      </div>
    </footer>
  );
}
