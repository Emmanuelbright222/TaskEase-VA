import GradientHeading from '../components/ui/GradientHeading';
import SectionWrapper from '../components/ui/SectionWrapper';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { motion } from 'framer-motion';

const Projects = () => {
  const { data } = usePortfolioData();

  return (
    <SectionWrapper id="projects">
      <div className="space-y-3">
        <GradientHeading>Case Studies</GradientHeading>
        <h3 className="section-heading">Recent systems + ops builds</h3>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {data?.projects.map((project, index) => {
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
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: '-150px 0px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="space-y-4 cursor-default group overflow-hidden">
              {/* Project Title */}
              <p className="text-xl font-semibold text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-primary text-center md:text-left">
                {project.name}
              </p>
              {/* Metrics - Always below title */}
              {metricsArray.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {metricsArray.map((metric: string, idx: number) => (
                    <Badge key={idx} className="text-xs whitespace-nowrap">{metric}</Badge>
                  ))}
                </div>
              )}
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
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default Projects;
