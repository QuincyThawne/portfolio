import React from 'react';
import portfolioData from '@/data/portfolioData';
import { ExternalLink, Github, Code2 } from 'lucide-react';

const ProjectsSection: React.FC = () => {
  const { projects } = portfolioData;
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
          Works of Mine
        </h2>
        <p className="text-sm md:text-base text-muted-foreground text-center mb-10 md:mb-12 max-w-2xl mx-auto px-2">
          A selection of projects I've worked on, ranging from full-stack applications to creative experiments.
        </p>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="group bg-card/50 backdrop-blur-sm rounded-2xl border border-border overflow-hidden
                         hover:shadow-xl hover:border-primary/50 hover:scale-[1.02] transition-all duration-300
                         flex flex-col cursor-pointer cursor-target"
              onClick={() => {
                const url = project.liveUrl || project.githubUrl;
                if (url) window.open(url, '_blank');
              }}
            >
              {/* Project Preview */}
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
                {project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Code2 className="w-12 h-12 text-primary/30" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                <span className="absolute bottom-3 left-4 text-lg font-semibold text-foreground">
                  {project.title}
                </span>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 text-muted-foreground text-xs">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-2 border-t border-border">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">Other Projects</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {otherProjects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-card/50 backdrop-blur-sm rounded-xl border border-border p-5
                             hover:border-primary/50 hover:bg-card/80 transition-all duration-300 cursor-pointer cursor-target"
                  onClick={() => {
                    const url = project.liveUrl || project.githubUrl;
                    if (url) window.open(url, '_blank');
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span 
                            key={tech} 
                            className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
