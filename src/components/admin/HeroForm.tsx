import { useEffect, useState } from 'react';
import AdminSectionCard from './AdminSectionCard';
import InputField from '../ui/InputField';
import TextareaField from '../ui/TextareaField';
import { supabase } from '../../lib/supabaseClient';
import { createToast } from '../ui/ToastContainer';
import { mutate } from 'swr';
import { fetchHero } from '../../hooks/usePortfolioData';

// Global cache key for hero data
const HERO_CACHE_KEY = 'hero';

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
    const toastId = typeof crypto?.randomUUID === 'function' ? crypto.randomUUID() : String(Date.now());
    
    try {
      const { id, ...rest } = formValues;
      
      // Ensure all fields are properly formatted
      const formattedPayload: any = {
        avatar_url: formValues.avatar_url?.trim() || null,
        calendly_url: formValues.calendly_url?.trim() || null,
        name: formValues.name?.trim() || null,
        title: formValues.title?.trim() || null,
        subtitle: formValues.subtitle?.trim() || null,
        contact_cta: formValues.contact_cta?.trim() || 'Contact Me',
        cta_label: formValues.cta_label?.trim() || 'Book a Call',
      };
      
      let savedData: any = null;
      let error: any = null;
      
      // Strategy: Always work with the first hero record (there should only be one)
      if (id) {
        // Update existing record
        const result = await supabase.from('hero').update(formattedPayload).eq('id', id).select();
        savedData = result.data;
        error = result.error;
      } else {
        // Check if any hero record exists first
        const { data: existingHeroes } = await supabase.from('hero').select('id').limit(1);
        
        if (existingHeroes && existingHeroes.length > 0) {
          // Update the first existing record
          const result = await supabase.from('hero').update(formattedPayload).eq('id', existingHeroes[0].id).select();
          savedData = result.data;
          error = result.error;
        } else {
          // Insert new record
          const result = await supabase.from('hero').insert(formattedPayload).select();
          savedData = result.data;
          error = result.error;
        }
      }
      
      if (error) {
        console.error('Hero save error:', error);
        createToast.emit({ id: toastId, message: `Error: ${error.message}`, type: 'error' });
        setLoading(false);
        return;
      }
      
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
      // Use a small delay to ensure database transaction is committed
      setTimeout(async () => {
        try {
          // First, fetch fresh data
          const freshData = await fetchHero();
          // Update cache with fresh data
          await mutate(HERO_CACHE_KEY, freshData, { revalidate: false });
          // Also trigger a revalidation to ensure all components update
          await mutate(HERO_CACHE_KEY);
        } catch (err) {
          console.warn('Cache update error:', err);
          // Fallback: just trigger revalidation
          mutate(HERO_CACHE_KEY).catch(() => {});
        }
      }, 300);
      
      createToast.emit({ id: `${toastId}-success`, message: 'Hero updated successfully', type: 'success' });
    } catch (err: any) {
      console.error('Unexpected error:', err);
      createToast.emit({ id: toastId, message: `Unexpected error: ${err?.message || 'Unknown error'}`, type: 'error' });
    } finally {
      setLoading(false);
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
