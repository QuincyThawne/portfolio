import React from 'react';
import PentagonStats from '@/components/charts/PentagonStats';

// Pentagon skill data - 5 skills per category
const frontendSkills = [
  { name: 'React', level: 85 },
  { name: 'TypeScript', level: 75 },
  { name: 'Tailwind CSS', level: 85 },
  { name: 'Vite', level: 80 },
  { name: 'HTML/CSS', level: 90 },
];

const backendSkills = [
  { name: 'Python', level: 90 },
  { name: 'Flask', level: 75 },
  { name: 'NLP', level: 80 },
  { name: 'Web Scraping', level: 85 },
  { name: 'APIs', level: 80 },
];

const softSkills = [
  { name: 'Problem Solving', level: 90 },
  { name: 'Typing', level: 85 },
  { name: 'Communication', level: 80 },
  { name: 'Collaboration', level: 75 },
  { name: 'Adaptability', level: 85 },
];

const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-16 md:py-24 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
          Skills & Expertise
        </h2>
        <p className="text-sm md:text-base text-muted-foreground text-center mb-10 md:mb-16 max-w-2xl mx-auto px-2">
          A visual representation of my technical proficiency and soft skills
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {/* Frontend Pentagon */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-border shadow-lg flex flex-col items-center overflow-hidden cursor-target">
            <PentagonStats
              skills={frontendSkills}
              title="Frontend"
              color="hsl(168 70% 45%)"
              size={220}
            />
          </div>

          {/* Backend Pentagon */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-border shadow-lg flex flex-col items-center overflow-hidden cursor-target">
            <PentagonStats
              skills={backendSkills}
              title="Backend"
              color="hsl(200 70% 50%)"
              size={220}
            />
          </div>

          {/* Soft Skills Pentagon */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-border shadow-lg flex flex-col items-center overflow-hidden cursor-target">
            <PentagonStats
              skills={softSkills}
              title="Soft Skills"
              color="hsl(280 60% 55%)"
              size={220}
            />
          </div>
        </div>

        {/* Tools Section */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">
            Tools & Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['VS Code', 'Git', 'Postman', 'Streamlit', 'OpenAI API', 'BeautifulSoup', 'Docker', 'Linux'].map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-full text-sm font-medium text-foreground hover:bg-primary/10 hover:border-primary transition-all duration-300 cursor-target"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
