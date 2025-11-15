import { useEffect, useState } from 'react';
import AdminSectionCard from './AdminSectionCard';
import InputField from '../ui/InputField';
import TextareaField from '../ui/TextareaField';
import { supabase } from '../../lib/supabaseClient';
import { createToast } from '../ui/ToastContainer';

const HeroForm = () => {
  const [formValues, setFormValues] = useState({
    id: '',
    name: '',
    title: '',
    subtitle: '',
    avatar_url: '',
    calendly_url: '',
    contact_cta: 'Contact Me',
    cta_label: 'Book a Call'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadHero = async () => {
      const { data } = await supabase.from('hero').select('*').maybeSingle();
      if (data) {
        setFormValues({
          id: data.id ?? '',
          name: data.name ?? '',
          title: data.title ?? '',
          subtitle: data.subtitle ?? '',
          avatar_url: data.avatar_url ?? '',
          calendly_url: data.calendly_url ?? '',
          contact_cta: data.contact_cta ?? 'Contact Me',
          cta_label: data.cta_label ?? 'Book a Call'
        });
      }
    };
    loadHero();
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const { id, ...rest } = formValues;
    const payload = id ? { id, ...rest } : rest;
    const { error } = await supabase.from('hero').upsert(payload, { onConflict: 'id' });
    setLoading(false);
    const toastId = typeof crypto?.randomUUID === 'function' ? crypto.randomUUID() : String(Date.now());
    if (error) {
      createToast.emit({ id: toastId, message: error.message, type: 'error' });
    } else {
      createToast.emit({ id: `${toastId}-success`, message: 'Hero updated', type: 'success' });
    }
  };

  return (
    <AdminSectionCard title="Hero" description="Update your public-facing intro and CTAs.">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <InputField label="Name" value={formValues.name} onChange={(event) => handleChange('name', event.target.value)} />
        <InputField label="Title" value={formValues.title} onChange={(event) => handleChange('title', event.target.value)} />
        <TextareaField label="Subtitle" value={formValues.subtitle} rows={3} onChange={(event) => handleChange('subtitle', event.target.value)} />
        <InputField label="Avatar URL" value={formValues.avatar_url} onChange={(event) => handleChange('avatar_url', event.target.value)} />
        <InputField label="Calendly URL" value={formValues.calendly_url} onChange={(event) => handleChange('calendly_url', event.target.value)} />
        <div className="grid gap-4 md:grid-cols-2">
          <InputField label="CTA Label" value={formValues.cta_label} onChange={(event) => handleChange('cta_label', event.target.value)} />
          <InputField label="Contact CTA" value={formValues.contact_cta} onChange={(event) => handleChange('contact_cta', event.target.value)} />
        </div>
        <button type="submit" className="button-primary" disabled={loading}>
          {loading ? 'Saving…' : 'Save Hero'}
        </button>
      </form>
    </AdminSectionCard>
  );
};

export default HeroForm;
