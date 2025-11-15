import { useEffect, useState } from 'react';
import AdminSectionCard from './AdminSectionCard';
import InputField from '../ui/InputField';
import TextareaField from '../ui/TextareaField';
import { supabase } from '../../lib/supabaseClient';
import { createToast } from '../ui/ToastContainer';
import { mutate } from 'swr';
import { fetchHero } from '../../hooks/usePortfolioData';

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
    
    // Ensure all fields are properly formatted
    const formattedPayload = {
      ...payload,
      avatar_url: payload.avatar_url?.trim() || null,
      calendly_url: payload.calendly_url?.trim() || null,
      name: payload.name?.trim() || null,
      title: payload.title?.trim() || null,
      subtitle: payload.subtitle?.trim() || null,
    };
    
    const { data: savedData, error } = await supabase.from('hero').upsert(formattedPayload, { onConflict: 'id' }).select();
    setLoading(false);
    const toastId = typeof crypto?.randomUUID === 'function' ? crypto.randomUUID() : String(Date.now());
    if (error) {
      createToast.emit({ id: toastId, message: error.message, type: 'error' });
    } else {
      // Update form with saved data (including the ID if it was created)
      if (savedData && savedData[0]) {
        setFormValues({
          id: savedData[0].id ?? '',
          name: savedData[0].name ?? '',
          title: savedData[0].title ?? '',
          subtitle: savedData[0].subtitle ?? '',
          avatar_url: savedData[0].avatar_url ?? '',
          calendly_url: savedData[0].calendly_url ?? '',
          contact_cta: savedData[0].contact_cta ?? 'Contact Me',
          cta_label: savedData[0].cta_label ?? 'Book a Call'
        });
      }
      
      // Force revalidation of hero cache to refresh frontend
      // Fetch fresh data and update cache immediately
      const freshHeroData = await fetchHero();
      await mutate('hero', freshHeroData, { revalidate: true });
      createToast.emit({ id: `${toastId}-success`, message: 'Hero updated successfully', type: 'success' });
    }
  };

  return (
    <AdminSectionCard title="Hero" description="Update your public-facing intro and CTAs.">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <InputField label="Name" value={formValues.name} onChange={(event) => handleChange('name', event.target.value)} />
        <InputField label="Title" value={formValues.title} onChange={(event) => handleChange('title', event.target.value)} />
        <TextareaField label="Subtitle" value={formValues.subtitle} rows={3} onChange={(event) => handleChange('subtitle', event.target.value)} />
        <div className="space-y-2">
          <InputField label="Avatar URL" value={formValues.avatar_url} onChange={(event) => handleChange('avatar_url', event.target.value)} />
          {formValues.avatar_url && (
            <div className="mt-2">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Preview:</p>
              <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-slate-300 dark:border-slate-600">
                <img
                  src={formValues.avatar_url}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden absolute inset-0 flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs">
                  Invalid URL
                </div>
              </div>
            </div>
          )}
        </div>
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
