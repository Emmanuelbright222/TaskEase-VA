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
      <div className="grid gap-4 md:grid-cols-4">
        {data?.tools.map((tool) => (
          <GlassCard key={tool.id} className="space-y-2 text-sm">
            <p className="text-base font-semibold text-slate-900 dark:text-white">{tool.name}</p>
            <p className="text-slate-500 dark:text-slate-300">{tool.category}</p>
            <p className="text-xs text-slate-400">{tool.proficiency}</p>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Tools;
