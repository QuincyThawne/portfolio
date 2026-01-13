import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, ArrowDown, Instagram, MessageCircle, Code2 } from 'lucide-react';
import portfolioData from '@/data/portfolioData';
import profileImage from '@/assets/profile.jpg';

// Simple Typewriter component
const Typewriter: React.FC<{
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delaySpeed?: number;
}> = ({ words, typeSpeed = 70, deleteSpeed = 50, delaySpeed = 1500 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), delaySpeed);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, typeSpeed, deleteSpeed, delaySpeed]);

  return (
    <span>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const HeroSection: React.FC = () => {
  const { personal, about } = portfolioData;

  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'discord':
        return <MessageCircle className="w-5 h-5" />;
      case 'leetcode':
        return <Code2 className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 pt-16 md:pt-20">
      {/* Desktop: Side by side layout like old portfolio */}
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        
        {/* Profile Image - Left side on desktop, top on mobile */}
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              src={profileImage}
              alt="Murali Vennapusa"
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 
                         rounded-full object-cover shadow-2xl 
                         border-4 border-primary/20"
            />
            {/* Status indicator */}
            <div className="absolute bottom-4 right-4 w-5 h-5 bg-green-500 rounded-full border-3 border-background animate-pulse" />
          </div>
        </div>

        {/* Text Content - Right side on desktop */}
        <div className="flex-1 text-center md:text-left max-w-xl">
          {/* Name */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground mb-3 md:mb-4 tracking-tight">
            {personal.name}
          </h1>

          {/* Typewriter Effect */}
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary font-medium mb-4 md:mb-6 h-8 sm:h-10 font-mono">
            <Typewriter
              words={about.highlights}
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </h3>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed font-serif">
            {personal.tagline}
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4 mb-6 md:mb-8">
            {personal.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card/50 backdrop-blur-sm border border-border
                           flex items-center justify-center text-muted-foreground
                           hover:bg-primary hover:text-primary-foreground hover:border-primary
                           hover:scale-110 transition-all duration-300 shadow-lg"
                aria-label={link.platform}
              >
                {getIcon(link.platform)}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium
                         hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg text-center"
            >
              View My Work
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-card/50 backdrop-blur-sm text-foreground border border-border rounded-xl font-medium
                         hover:bg-card hover:border-primary transition-all duration-300 shadow-lg text-center"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 
                   text-muted-foreground hover:text-primary transition-colors
                   animate-bounce"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </section>
  );
};

export default HeroSection;
