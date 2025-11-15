import GradientHeading from '../components/ui/GradientHeading';
import SectionWrapper from '../components/ui/SectionWrapper';
import GlassCard from '../components/ui/GlassCard';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Tools = () => {
  const { data } = usePortfolioData();

  return (
    <SectionWrapper id="tools">
      <div className="space-y-3">
        <GradientHeading>Toolkit</GradientHeading>
        <h3 className="section-heading">Software I live inside daily</h3>
      </div>
      {data?.tools && data.tools.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-4">
          {data.tools.map((tool) => (
            <GlassCard key={tool.id} className="space-y-2 text-sm cursor-default group">
              <p className="text-base font-semibold text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-primary">
                {tool.name}
              </p>
              <p className="text-slate-500 dark:text-slate-300 transition-colors duration-300 group-hover:text-slate-600 dark:group-hover:text-slate-200">
                {tool.category}
              </p>
              <p className="text-xs text-slate-400 transition-colors duration-300 group-hover:text-slate-500 dark:group-hover:text-slate-300">
                {tool.proficiency}
              </p>
            </GlassCard>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-500 dark:text-slate-400">No tools available yet.</p>
        </div>
      )}
    </SectionWrapper>
  );
};

export default Tools;
