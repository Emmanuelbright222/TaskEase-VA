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
        {data?.projects.map((project) => (
          <GlassCard key={project.id} className="space-y-4 cursor-default group">
            <div className="flex items-start justify-between gap-4">
              <p className="text-xl font-semibold text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-primary">
                {project.name}
              </p>
              {project.metrics && (() => {
                // Handle both string and array formats (for backward compatibility)
                const metricsArray = Array.isArray(project.metrics) 
                  ? project.metrics 
                  : typeof project.metrics === 'string' && project.metrics.trim()
                    ? project.metrics.split(/[·,]/).map(m => m.trim()).filter(Boolean)
                    : [];
                
                return metricsArray.length > 0 ? (
                  <div className="flex flex-wrap gap-2 justify-end">
                    {metricsArray.map((metric, idx) => (
                      <Badge key={idx}>{metric}</Badge>
                    ))}
                  </div>
                ) : null;
              })()}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-300 transition-colors duration-300 group-hover:text-slate-600 dark:group-hover:text-slate-200">
              {project.description}
            </p>
            {project.tags && (
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
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Projects;
