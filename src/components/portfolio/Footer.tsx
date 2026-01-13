import React from 'react';
import { Heart, Github, Linkedin, Twitter, Instagram, MessageCircle, Code2 } from 'lucide-react';
import portfolioData from '@/data/portfolioData';

const Footer: React.FC = () => {
  const { personal } = portfolioData;

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-6 border-t border-border bg-card/30 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Logo/Name */}
          <button
            onClick={scrollToTop}
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            {personal.name}
          </button>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {personal.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center
                           text-muted-foreground hover:bg-primary hover:text-primary-foreground
                           transition-all duration-300"
                aria-label={link.platform}
              >
                {getIcon(link.platform)}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            {/* Copyright */}
            <p className="flex items-center gap-1">
              © {new Date().getFullYear()} {personal.name}. Made with
              <Heart className="w-4 h-4 text-red-500 fill-red-500 inline mx-1" />
              and lots of coffee.
            </p>

            {/* Easter Egg Hint */}
            <p className="text-xs text-muted-foreground/60 italic">
              P.S: Did you find all the secrets? 🎮
            </p>
          </div>
        </div>

        {/* Back to Top Button (Mobile) */}
        <div className="flex justify-center mt-8 md:hidden">
          <button
            onClick={scrollToTop}
            className="px-6 py-2 bg-muted/50 text-muted-foreground rounded-full text-sm
                       hover:bg-primary/10 hover:text-primary transition-colors"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
