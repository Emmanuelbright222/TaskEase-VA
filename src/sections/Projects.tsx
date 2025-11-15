import GradientHeading from '../components/ui/GradientHeading';
import SectionWrapper from '../components/ui/SectionWrapper';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Projects = () => {
  const { data } = usePortfolioData();

  return (
    <SectionWrapper id="projects">
      <div className="space-y-3">
        <GradientHeading>Case Studies</GradientHeading>
        <h3 className="section-heading">Recent systems + ops builds</h3>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {data?.projects.map((project) => {
          // Handle both string and array formats (for backward compatibility)
          let metricsArray: string[] = [];
          const metrics = project.metrics;
          if (Array.isArray(metrics)) {
            metricsArray = metrics;
          } else {
            // Handle string format (for backward compatibility with old data)
            const metricsStr = metrics as unknown as string;
            if (typeof metricsStr === 'string' && metricsStr.trim()) {
              metricsArray = metricsStr.split(/[·,]/).map((m: string) => m.trim()).filter(Boolean);
            }
          }

          return (
            <GlassCard key={project.id} className="space-y-4 cursor-default group overflow-hidden">
              {/* Mobile: Title first, then metrics below. Desktop: Title left, metrics right */}
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-4">
                {/* Project Title - Centered on mobile, left on desktop */}
                <div className="flex flex-col gap-3 md:flex-1">
                  <p className="text-xl font-semibold text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-primary text-center md:text-left">
                    {project.name}
                  </p>
                  {/* Metrics - Directly under title on mobile only */}
                  {metricsArray.length > 0 && (
                    <div className="flex md:hidden flex-wrap gap-2 justify-center">
                      {metricsArray.map((metric: string, idx: number) => (
                        <Badge key={idx} className="text-xs whitespace-nowrap">{metric}</Badge>
                      ))}
                    </div>
                  )}
                </div>
                {/* Desktop: Metrics on the right */}
                {metricsArray.length > 0 && (
                  <div className="hidden md:flex flex-wrap gap-2 justify-end">
                    {metricsArray.map((metric: string, idx: number) => (
                      <Badge key={idx} className="text-xs whitespace-nowrap">{metric}</Badge>
                    ))}
                  </div>
                )}
              </div>
              {/* Description */}
              <p className="text-sm text-slate-500 dark:text-slate-300 transition-colors duration-300 group-hover:text-slate-600 dark:group-hover:text-slate-200">
                {project.description}
              </p>
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="transition-all duration-300 hover:border-primary/50 hover:text-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              {project.caseStudyUrl && (
                <a
                  className="text-sm font-semibold text-primary transition-all duration-300 hover:gap-2 inline-flex items-center gap-1 hover:text-primary/80"
                  href={project.caseStudyUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View case study <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              )}
            </GlassCard>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default Projects;
