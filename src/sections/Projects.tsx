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
          <GlassCard key={project.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold text-slate-900 dark:text-white">{project.name}</p>
              {project.metrics && <Badge>{project.metrics}</Badge>}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-300">{project.description}</p>
            {project.tags && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            {project.caseStudyUrl && (
              <a className="text-sm font-semibold text-primary" href={project.caseStudyUrl} target="_blank" rel="noreferrer">
                View case study →
              </a>
            )}
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Projects;
