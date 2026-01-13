// ============================================
// TRADITIONAL PORTFOLIO DATA
// Personal information, projects, skills, achievements, contact
// Used by: TraditionalPortfolio and its section components
// ============================================

// Import project images
import aetherImg from '@/assets/portfolio/aether.jpeg';
import oleoImg from '@/assets/portfolio/oleo.png';
import unifiedLearningImg from '@/assets/portfolio/Unified Learning.png';
import unilangImg from '@/assets/portfolio/unilang.jpeg';
import mirusImg from '@/assets/portfolio/mirus.png';
import mangagariImg from '@/assets/portfolio/mangagari.jpeg';
import citizenImg from '@/assets/portfolio/citizen.jpg';
import onepieceImg from '@/assets/portfolio/onepiece.jpeg';
import emoImg from '@/assets/portfolio/emo.png';
import portfolioImg from '@/assets/portfolio/portfolio.png';
import favCharsImg from '@/assets/portfolio/favChars.png';
import nptelImg from '@/assets/portfolio/achievements/nptel.png';
import typeracerImg from '@/assets/portfolio/achievements/typeracer.png';
import sihImg from '@/assets/portfolio/achievements/soloSIH.jpg';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'soft';
  level: number; // 1-100
  icon?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'award' | 'certification' | 'milestone' | 'publication';
  imageUrl?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    tagline: string;
    email: string;
    location: string;
    avatarUrl?: string;
    resumeUrl?: string;
    socialLinks: SocialLink[];
  };
  about: {
    short: string;
    long: string;
    highlights: string[];
  };
  projects: Project[];
  skills: Skill[];
  achievements: Achievement[];
  contact: {
    heading: string;
    description: string;
    email: string;
    availability: string;
  };
}

// ============================================
// PORTFOLIO DATA - Edit your content here
// ============================================

export const portfolioData: PortfolioData = {
  // ------------------------------------------
  // PERSONAL INFORMATION
  // ------------------------------------------
  personal: {
    name: "Murali Vennapusa",
    title: "Web Developer",
    tagline: "Living in the Internet where Several Stories are told and even more being written",
    email: "muralireddyvennapusa@gmail.com",
    location: "India",
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/muralivennapusa", icon: "github" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/vennapusa-murali", icon: "linkedin" },
      { platform: "Twitter", url: "https://twitter.com/muralireddyon", icon: "twitter" },
      { platform: "Instagram", url: "https://instagram.com/muralireddyonline", icon: "instagram" },
      { platform: "Discord", url: "https://discord.com/users/yourusername", icon: "discord" },
      { platform: "LeetCode", url: "https://leetcode.com/u/Murali-Cyber/", icon: "leetcode" },
    ],
  },

  // ------------------------------------------
  // ABOUT SECTION
  // ------------------------------------------
  about: {
    short: "A Web Developer, Tech Enthusiast, Creative Coder, and Expert-Level Typist.",
    long: "Living in the Internet where Several Stories are told and even more being written. I code and script in Python, play high resolution games that can probably burn a graphics card, and read plenty of graphic novels. I'm intrigued by tech and everything to do with it and that's how I got here.",
    highlights: [
      "Web Developer",
      "Tech Enthusiast",
      "Creative Coder",
      "Expert-Level Typist",
    ],
  },

  // ------------------------------------------
  // PROJECTS - Add/edit your projects here
  // ------------------------------------------
  projects: [
    {
      id: "project-1",
      title: "AETHER",
      description: "AI-Enhanced Threat Enumeration and Reconnaissance platform.",
      longDescription: "AETHER is an advanced cybersecurity framework designed to automate reconnaissance, threat analysis, and reporting using AI-driven workflows. It integrates multiple security tools and APIs to streamline information gathering, vulnerability identification, and structured analysis for ethical hacking and research purposes.",
      technologies: ["Python", "Cybersecurity", "OSINT", "Automation", "RAG-LLM"],
      imageUrl: aetherImg,
      githubUrl: "https://github.com/muralivennapusa/AETHER",
      featured: true,
    },
    {
      id: "project-2",
      title: "Oleo",
      description: "Lightweight web application for efficient data handling and visualization.",
      longDescription: "Oleo is a lightweight and modular web application focused on efficient data handling, visualization, and interaction. It emphasizes clean UI design, performance optimization, and scalability, making it suitable for dashboards and data-centric applications.",
      technologies: ["React", "JavaScript", "Web Development", "Data Visualization"],
      imageUrl: oleoImg,
      githubUrl: "https://github.com/muralivennapusa/Oleo",
      featured: true,
    },
    {
      id: "project-3",
      title: "Unified Learning",
      description: "Centralized learning platform that combines multiple learning resources into one system.",
      longDescription: "Unified Learning is a centralized education platform designed to bring together multiple learning resources, tools, and content into a single unified system. It aims to simplify access to educational material while enhancing learning efficiency through structured organization and modern UI.",
      technologies: ["Web Development", "Education Tech", "React", "Node.js"],
      imageUrl: unifiedLearningImg,
      liveUrl: "https://unified-learning.vercel.app/",
      githubUrl: "https://github.com/muralivennapusa/Unified-Learning",
      featured: true,
    },
    {
      id: "project-4",
      title: "UniLang",
      description: "A multilingual NLP system that answers user queries using translation and real-time processing.",
      longDescription: "UniLang is a multilingual NLP system designed to answer user queries using advanced translation and real-time processing capabilities. It leverages OpenAI and AIML APIs to provide accurate responses across multiple languages.",
      technologies: ["NLP", "OpenAI", "Python", "AIML API", "Flask"],
      imageUrl: unilangImg,
      githubUrl: "https://github.com/muralivennapusa/UniLang",
      featured: false,
    },
    {
      id: "project-5",
      title: "Mirus",
      description: "A VirusTotal-powered threat scanner that checks files and URLs for malicious indicators.",
      longDescription: "Mirus is a security tool powered by the VirusTotal API that scans files and URLs for potential malicious indicators. It provides comprehensive threat analysis and reporting for cybersecurity purposes.",
      technologies: ["VirusTotal API", "Python"],
      imageUrl: mirusImg,
      githubUrl: "https://github.com/muralivennapusa/Mirus",
      featured: false,
    },
    {
      id: "project-6",
      title: "Manga Gari",
      description: "Web scraper that extracts manga chapters and converts them to downloadable PDFs.",
      longDescription: "Manga Gari is a web scraping tool that extracts manga chapters from various sources and converts them into downloadable PDF format. Built with Python, BeautifulSoup, and PIL for image processing.",
      technologies: ["Python", "BeautifulSoup", "PIL", "Flask"],
      imageUrl: mangagariImg,
      liveUrl: "https://mangagari.vercel.app/",
      featured: false,
    },
    {
      id: "project-7",
      title: "Project Citizen",
      description: "Cybercrime classification tool that analyzes citizen complaints using machine learning.",
      longDescription: "Project Citizen is a cybercrime classification tool that leverages machine learning to analyze and categorize citizen complaints. It helps law enforcement agencies process and prioritize cybercrime reports efficiently.",
      technologies: ["Python", "AIML API", "Streamlit"],
      imageUrl: citizenImg,
      githubUrl: "https://github.com/muralivennapusa/Cyber-Project-v2",
      featured: false,
    },
    {
      id: "project-8",
      title: "Project OnePiece",
      description: "Scrapes One Piece episode summaries and converts them into narrated audio files.",
      longDescription: "Project OnePiece is a web scraping application that extracts One Piece anime episode summaries and converts them into narrated audio files using text-to-speech technology.",
      technologies: ["Python", "Web Scraping", "pyttsx3"],
      imageUrl: onepieceImg,
      githubUrl: "https://github.com/muralivennapusa/Project-OnePiece",
      featured: false,
    },
    {
      id: "project-9",
      title: "Project Emo",
      description: "Emotion analysis tool designed to assist law enforcement by providing emotional context from statements.",
      longDescription: "Project Emo is an emotion analysis tool that uses NLP and sentiment analysis to provide emotional context from statements. It's designed to assist law enforcement agencies in understanding the emotional state of individuals during investigations.",
      technologies: ["Python", "NLP", "Sentiment Analysis", "Whisper", "OpenAI"],
      imageUrl: emoImg,
      githubUrl: "https://github.com/muralivennapusa/Emolyzer",
      featured: false,
    },
    {
      id: "project-10",
      title: "Portfolio Website",
      description: "A sleek personal portfolio built using React, Vite, and Tailwind CSS with dark mode and interactive animations.",
      longDescription: "A modern personal portfolio website featuring a space theme with starfield animations, dark mode support, and interactive elements. Built with React, Vite, and Tailwind CSS.",
      technologies: ["React", "Vite", "Tailwind CSS"],
      imageUrl: portfolioImg,
      githubUrl: "https://github.com/muralivennapusa/portfolio",
      featured: false,
    },
    {
      id: "project-11",
      title: "Fav Chars",
      description: "Tribute site to my favorite anime and fictional characters with interactive UI.",
      longDescription: "Fav Chars is a tribute website showcasing favorite anime and fictional characters with an interactive user interface and custom loading animations.",
      technologies: ["React", "Vite", "Custom Loader"],
      imageUrl: favCharsImg,
      liveUrl: "https://fav-chars.vercel.app",
      featured: false,
    },
  ],

  // ------------------------------------------
  // SKILLS - Add/edit your skills here
  // Level: 1-100 (percentage)
  // Categories: frontend, backend, tools, soft
  // ------------------------------------------
  skills: [
    { id: "skill-1", name: "Python", category: "backend", level: 90 },
    { id: "skill-2", name: "React", category: "frontend", level: 85 },
    { id: "skill-3", name: "Vite", category: "tools", level: 80 },
    { id: "skill-4", name: "Flask", category: "backend", level: 75 },
    { id: "skill-5", name: "Streamlit", category: "tools", level: 85 },
    { id: "skill-6", name: "NLP", category: "backend", level: 80 },
    { id: "skill-7", name: "Web Scraping", category: "backend", level: 85 },
    { id: "skill-8", name: "OpenAI API", category: "tools", level: 75 },
    { id: "skill-9", name: "BeautifulSoup", category: "backend", level: 80 },
    { id: "skill-10", name: "Tailwind CSS", category: "frontend", level: 85 },
    { id: "skill-11", name: "VS Code", category: "tools", level: 90 },
    { id: "skill-12", name: "Postman", category: "tools", level: 75 },
    { id: "skill-13", name: "Git", category: "tools", level: 80 },
    { id: "skill-14", name: "Problem Solving", category: "soft", level: 90 },
    { id: "skill-15", name: "Creative Thinking", category: "soft", level: 85 },
  ],

  // ------------------------------------------
  // ACHIEVEMENTS - Add/edit your achievements here
  // Types: award, certification, milestone, publication
  // ------------------------------------------
  achievements: [
    {
      id: "achievement-1",
      title: "SIH 2025 Winner",
      description: "Won the Smart India Hackathon 2025 held at BPUT, Odisha for developing Oleo",
      date: "2025",
      type: "award",
      imageUrl: sihImg,
    },
    {
      id: "achievement-2",
      title: "NPTEL",
      description: "Certified by NPTEL with elite certificate in Demystifying Network, Systems and usable Security and Google Cloud Programming",
      date: "2023-2024",
      type: "certification",
      imageUrl: nptelImg,
    },
    {
      id: "achievement-3",
      title: "Typeracer",
      description: "Aquired \"Megaracer\" rank in typeracer with a WPM% of 96.3 percentile",
      date: "2024",
      type: "milestone",
      imageUrl: typeracerImg,
    },
  ],

  // ------------------------------------------
  // CONTACT SECTION
  // ------------------------------------------
  contact: {
    heading: "Trails of Me",
    description: "I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!",
    email: "muralireddyvennapusa@gmail.com",
    availability: "Currently available for new projects and collaborations",
  },
};

export default portfolioData;
