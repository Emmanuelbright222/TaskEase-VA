import { useNavigate } from 'react-router-dom';
import HeroForm from '../../components/admin/HeroForm';
import AboutForm from '../../components/admin/AboutForm';
import CrudList from '../../components/admin/CrudList';
import MessagesPanel from '../../components/admin/MessagesPanel';
import { supabase } from '../../lib/supabaseClient';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black px-4 py-10 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between pb-8">
        <div>
          <h1 className="text-3xl font-semibold">TaskEase VA Dashboard</h1>
          <p className="text-sm text-slate-400">Manage hero content, services, and more.</p>
        </div>
        <button onClick={handleLogout} className="button-secondary">
          Sign out
        </button>
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 pb-16">
        <HeroForm />
        <AboutForm />
        <CrudList table="services" title="Services" description="Add or edit your offers" fields={[{ name: 'title', label: 'Title' }, { name: 'description', label: 'Description', type: 'textarea' }]} />
        <CrudList table="projects" title="Projects" description="Case studies + metrics" fields={[{ name: 'name', label: 'Project Name' }, { name: 'description', label: 'Description', type: 'textarea' }, { name: 'metrics', label: 'Metrics' }, { name: 'tags', label: 'Tags (comma separated)' }]} />
        <CrudList table="testimonials" title="Testimonials" description="Client words" fields={[{ name: 'name', label: 'Client' }, { name: 'quote', label: 'Quote', type: 'textarea' }, { name: 'avatar', label: 'Avatar URL' }]} />
        <CrudList table="tools" title="Tools" description="Update your tech stack" fields={[{ name: 'name', label: 'Tool Name' }, { name: 'category', label: 'Category' }, { name: 'proficiency', label: 'Proficiency' }]} />
        <CrudList table="pricing_plans" title="Pricing" description="Available plans" fields={[{ name: 'title', label: 'Plan Title' }, { name: 'price', label: 'Price' }, { name: 'description', label: 'Description', type: 'textarea' }, { name: 'features', label: 'Features (comma separated)' }]} />
        <CrudList table="blog_posts" title="Blog" description="Long-form content" fields={[{ name: 'title', label: 'Title' }, { name: 'excerpt', label: 'Excerpt', type: 'textarea' }, { name: 'published_at', label: 'Published Date (YYYY-MM-DD)' }, { name: 'tags', label: 'Tags (comma separated)' }]} />
        <MessagesPanel />
      </div>
    </div>
  );
};

export default AdminDashboard;
