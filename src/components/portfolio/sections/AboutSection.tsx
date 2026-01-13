import React from 'react';
import portfolioData from '@/data/portfolioData';
import { CheckCircle, MapPin, Mail, Sparkles } from 'lucide-react';

const AboutSection: React.FC = () => {
  const { about, personal } = portfolioData;

  return (
    <section id="about" className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
          About Me
        </h2>
        <p className="text-sm md:text-base text-muted-foreground text-center mb-10 md:mb-12 max-w-2xl mx-auto px-2">
          Get to know more about who I am and what drives me
        </p>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6 cursor-target">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-lg">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {about.long}
              </p>
              
              {/* Highlights */}
              <div className="grid sm:grid-cols-2 gap-3">
                {about.highlights.map((highlight, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 text-foreground bg-primary/5 rounded-lg px-4 py-3 border border-primary/10"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="space-y-4">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border shadow-lg cursor-target">
              <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Quick Info
              </h3>
              <dl className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <dt className="text-sm text-muted-foreground">Location</dt>
                    <dd className="text-foreground font-medium">{personal.location}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <dt className="text-sm text-muted-foreground">Email</dt>
                    <dd className="text-foreground font-medium text-sm break-all">{personal.email}</dd>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-green-500 font-medium text-sm">Available for work</span>
                  </div>
                </div>
              </dl>
            </div>

            {/* Stats Card */}
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border shadow-lg cursor-target">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">8+</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">125</div>
                  <div className="text-sm text-muted-foreground">WPM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
