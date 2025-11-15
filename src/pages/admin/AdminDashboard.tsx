import { useNavigate } from 'react-router-dom';
import HeroForm from '../../components/admin/HeroForm';
import AboutForm from '../../components/admin/AboutForm';
import CrudList from '../../components/admin/CrudList';
import MessagesPanel from '../../components/admin/MessagesPanel';
import { supabase } from '../../lib/supabaseClient';
import { useTheme } from '../../context/ThemeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 px-4 py-10 dark:from-slate-900 dark:via-slate-950 dark:to-black text-slate-900 dark:text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between pb-8">
        <div>
          <h1 className="text-3xl font-semibold">TaskEase VA Dashboard</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">Manage hero content, services, and more.</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="rounded-full border border-slate-300/60 p-2 text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:text-white dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
          <button onClick={handleLogout} className="button-secondary">
            Sign out
          </button>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 pb-16">
        <HeroForm />
        <AboutForm />
        <CrudList table="services" title="Services" description="Add or edit your offers" fields={[{ name: 'title', label: 'Title' }, { name: 'description', label: 'Description', type: 'textarea' }, { name: 'image_url', label: 'Image URL' }]} />
        <CrudList table="projects" title="Projects" description="Case studies + metrics" fields={[{ name: 'name', label: 'Project Name' }, { name: 'description', label: 'Description', type: 'textarea' }, { name: 'metrics', label: 'Metrics (comma separated)' }, { name: 'tags', label: 'Tags (comma separated)' }]} />
        <CrudList table="testimonials" title="Testimonials" description="Client words" fields={[{ name: 'name', label: 'Client' }, { name: 'quote', label: 'Quote', type: 'textarea' }, { name: 'avatar', label: 'Avatar URL' }, { name: 'rating', label: 'Rating (1-5)' }]} />
        <CrudList table="tools" title="Tools" description="Update your tech stack" fields={[{ name: 'name', label: 'Tool Name' }, { name: 'category', label: 'Category' }, { name: 'proficiency', label: 'Proficiency' }]} />
        <CrudList table="pricing_plans" title="Pricing" description="Available plans" fields={[{ name: 'title', label: 'Plan Title' }, { name: 'price', label: 'Price' }, { name: 'description', label: 'Description', type: 'textarea' }, { name: 'features', label: 'Features (comma separated)' }]} />
        <CrudList table="blog_posts" title="Insights / Blog" description="Long-form content and insights" fields={[{ name: 'title', label: 'Title' }, { name: 'excerpt', label: 'Excerpt', type: 'textarea' }, { name: 'published_at', label: 'Published Date (YYYY-MM-DD)' }, { name: 'tags', label: 'Tags (comma separated)' }]} />
        <MessagesPanel />
      </div>
    </div>
  );
};

export default AdminDashboard;
