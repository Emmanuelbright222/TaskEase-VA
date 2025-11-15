import GradientHeading from '../components/ui/GradientHeading';
import SectionWrapper from '../components/ui/SectionWrapper';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Blog = () => {
  const { data } = usePortfolioData();

  if (!data?.blog.enabled) return null;

  return (
    <SectionWrapper id="blog">
      <div className="space-y-3">
        <GradientHeading>Insights</GradientHeading>
        <h3 className="section-heading">Signals, systems, and calm operations</h3>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {data.blog.posts.map((post) => (
          <GlassCard key={post.id} className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">{post.title}</p>
              <p className="text-sm text-slate-500 dark:text-slate-300">{post.excerpt}</p>
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{new Date(post.publishedAt).toDateString()}</p>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Blog;
