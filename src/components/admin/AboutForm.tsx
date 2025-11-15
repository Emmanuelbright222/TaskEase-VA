import { useEffect, useState } from 'react';
import AdminSectionCard from './AdminSectionCard';
import InputField from '../ui/InputField';
import TextareaField from '../ui/TextareaField';
import { supabase } from '../../lib/supabaseClient';
import { createToast } from '../ui/ToastContainer';

const AboutForm = () => {
  const [formValues, setFormValues] = useState({
    id: '',
    title: '',
    body: '',
    show_pricing: true,
    show_blog: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAbout = async () => {
      const { data } = await supabase.from('about').select('*').maybeSingle();
      if (data) {
        setFormValues({
          id: data.id ?? '',
          title: data.title ?? '',
          body: data.body ?? '',
          show_pricing: data.show_pricing ?? true,
          show_blog: data.show_blog ?? true
        });
      }
    };
    loadAbout();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const { id, ...rest } = formValues;
    const payload = id ? { id, ...rest } : rest;
    const { error } = await supabase.from('about').upsert(payload, { onConflict: 'id' });
    setLoading(false);
    const toastId = typeof crypto?.randomUUID === 'function' ? crypto.randomUUID() : String(Date.now());
    if (error) {
      createToast.emit({ id: toastId, message: error.message, type: 'error' });
    } else {
      createToast.emit({ id: `${toastId}-success`, message: 'About updated', type: 'success' });
    }
  };

  return (
    <AdminSectionCard title="About" description="Control biography copy and optional sections.">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <InputField label="Headline" value={formValues.title} onChange={(event) => setFormValues((prev) => ({ ...prev, title: event.target.value }))} />
        <TextareaField label="Body" rows={5} value={formValues.body} onChange={(event) => setFormValues((prev) => ({ ...prev, body: event.target.value }))} />
        <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-200">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={formValues.show_pricing} onChange={(event) => setFormValues((prev) => ({ ...prev, show_pricing: event.target.checked }))} />
            Show pricing section
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={formValues.show_blog} onChange={(event) => setFormValues((prev) => ({ ...prev, show_blog: event.target.checked }))} />
            Show blog section
          </label>
        </div>
        <button type="submit" className="button-primary" disabled={loading}>
          {loading ? 'Saving…' : 'Save About'}
        </button>
      </form>
    </AdminSectionCard>
  );
};

export default AboutForm;
