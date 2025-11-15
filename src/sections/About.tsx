import GradientHeading from '../components/ui/GradientHeading';
import SectionWrapper from '../components/ui/SectionWrapper';
import { usePortfolioData } from '../hooks/usePortfolioData';

const About = () => {
  const { data } = usePortfolioData();
  const about = data?.about;

  return (
    <SectionWrapper id="about">
      <div className="glass-panel space-y-4">
        <GradientHeading>About</GradientHeading>
        <h3 className="section-heading">{about?.title}</h3>
        <p className="text-lg text-slate-600 dark:text-slate-300">{about?.body}</p>
      </div>
    </SectionWrapper>
  );
};

export default About;
