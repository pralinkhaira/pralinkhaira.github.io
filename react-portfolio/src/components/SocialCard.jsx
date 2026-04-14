import React from 'react';
import styled from 'styled-components';
import { FaLinkedinIn, FaGithub, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { socialLinks } from '../data/portfolioData';

// Helper to map icon names to icons
const getIcon = (name) => {
  switch (name) {
    case 'Linkedin': return <FaLinkedinIn />;
    case 'Github': return <FaGithub />;
    case 'Mail': return <MdEmail />;
    case 'Facebook': return <FaFacebookF />;
    case 'Instagram': return <FaInstagram />;
    default: return null;
  }
};

const SocialCard = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <span>Connect</span>
        {socialLinks.map((social, index) => (
          <a 
            key={index} 
            className="social-link" 
            href={social.url} 
            target="_blank" 
            rel="noopener noreferrer"
            title={social.icon}
          >
            {getIcon(social.icon)}
          </a>
        ))}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* Center the card relative to its container */
  display: flex;
  margin-top: 2rem;

  .card svg {
    height: 25px;
    width: 25px;
  }

  .card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e7e7e7;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    overflow: hidden;
    height: 60px;
    width: 280px;
    border-radius: 12px;
  }

  /* Dark mode support */
  [data-theme='dark'] & .card {
    background: #1a1a1a;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  }

  .card::before, .card::after {
    position: absolute;
    display: flex;
    align-items: center;
    width: 50%;
    height: 100%;
    transition: 0.25s linear;
    z-index: 1;
  }

  .card::before {
    content: "";
    left: 0;
    justify-content: flex-end;
    background-color: var(--color-brand, #3b82f6);
  }

  .card::after {
    content: "";
    right: 0;
    justify-content: flex-start;
    background-color: var(--color-brand2, #1d4ed8);
  }

  .card:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }

  .card:hover span {
    opacity: 0;
    z-index: -3;
  }

  .card:hover::before {
    opacity: 0.5;
    transform: translateY(-100%);
  }

  .card:hover::after {
    opacity: 0.5;
    transform: translateY(100%);
  }

  .card span {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: whitesmoke;
    font-family: 'Inter', sans-serif;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    opacity: 1;
    transition: opacity 0.25s;
    z-index: 2;
  }

  .card .social-link {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
    color: whitesmoke;
    font-size: 24px;
    text-decoration: none;
    transition: 0.25s;
  }

  .card .social-link svg {
    text-shadow: 1px 1px rgba(31, 74, 121, 0.7);
    transform: scale(1);
    color: #fff;
  }

  .card .social-link:hover {
    background-color: rgba(255, 255, 255, 0.2);
    animation: bounce_613 0.4s linear;
  }

  @keyframes bounce_613 {
    40% {
      transform: scale(1.4);
    }

    60% {
      transform: scale(0.8);
    }

    80% {
      transform: scale(1.2);
    }

    100% {
      transform: scale(1);
    }
  }`;

export default SocialCard;
