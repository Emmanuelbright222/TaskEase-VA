import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import AdminSectionCard from './AdminSectionCard';
import TextareaField from '../ui/TextareaField';
import InputField from '../ui/InputField';
import { createToast } from '../ui/ToastContainer';

export type FieldConfig = {
  name: string;
  label: string;
  type?: 'text' | 'textarea';
  placeholder?: string;
};

const getId = () => (typeof crypto?.randomUUID === 'function' ? crypto.randomUUID() : String(Date.now() + Math.random()));

const CrudList = ({ table, title, description, fields }: { table: string; title: string; description?: string; fields: FieldConfig[] }) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const fetchItems = async () => {
    const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: true });
    if (error) {
      createToast.emit({ id: getId(), message: `Error loading ${title}`, type: 'error' });
    } else {
      setItems(data ?? []);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const payload: Record<string, any> = { ...formValues };
    if (payload.tags) {
      payload.tags = payload.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean);
    }
    if (payload.features) {
      payload.features = payload.features.split(',').map((feature: string) => feature.trim()).filter(Boolean);
    }
    if (payload.published_at) {
      payload.published_at = new Date(payload.published_at).toISOString();
    }
    const { error } = await supabase.from(table).insert(payload);
    setLoading(false);
    if (error) {
      createToast.emit({ id: getId(), message: error.message, type: 'error' });
    } else {
      setFormValues({});
      fetchItems();
      createToast.emit({ id: getId(), message: `${title} updated`, type: 'success' });
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) {
      createToast.emit({ id: getId(), message: error.message, type: 'error' });
    } else {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <AdminSectionCard title={title} description={description}>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {fields.map((field) =>
          field.type === 'textarea' ? (
            <TextareaField
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              value={formValues[field.name] ?? ''}
              onChange={(event) => handleChange(field.name, event.target.value)}
              rows={3}
            />
          ) : (
            <InputField
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              value={formValues[field.name] ?? ''}
              onChange={(event) => handleChange(field.name, event.target.value)}
            />
          )
        )}
        <button type="submit" className="button-primary" disabled={loading}>
          {loading ? 'Saving…' : 'Add entry'}
        </button>
      </form>
      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-200">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between rounded-2xl border border-white/10 p-3">
            <div>
              <p className="font-semibold">{item.title || item.name}</p>
              {item.description && <p className="text-xs text-slate-500">{item.description}</p>}
            </div>
            <button onClick={() => handleDelete(item.id)} className="text-xs font-semibold text-rose-500">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </AdminSectionCard>
  );
};

export default CrudList;
