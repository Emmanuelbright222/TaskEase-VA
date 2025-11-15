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
  const [editingId, setEditingId] = useState<string | null>(null);

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

  const handleEdit = (item: any) => {
    const editValues: Record<string, string> = {};
    fields.forEach((field) => {
      let value = item[field.name];
      
      // Handle metrics - normalize to array first, then convert to string
      if (field.name === 'metrics' && value) {
        if (Array.isArray(value)) {
          editValues[field.name] = value.join(', ');
        } else if (typeof value === 'string') {
          // Try to parse if it's a string representation of an array
          try {
            const parsed = JSON.parse(value);
            if (Array.isArray(parsed)) {
              editValues[field.name] = parsed.join(', ');
            } else {
              editValues[field.name] = value;
            }
          } catch {
            // If not JSON, use as-is (might already be comma-separated)
            editValues[field.name] = value;
          }
        } else {
          editValues[field.name] = '';
        }
      } else if (Array.isArray(value)) {
        // Convert arrays (tags, features) to comma-separated strings
        editValues[field.name] = value.join(', ');
      } else if (value && field.name === 'published_at') {
        // Format date for date inputs
        editValues[field.name] = new Date(value).toISOString().split('T')[0];
      } else {
        editValues[field.name] = value || '';
      }
    });
    setFormValues(editValues);
    setEditingId(item.id);
  };

  const handleCancel = () => {
    setFormValues({});
    setEditingId(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const payload: Record<string, any> = { ...formValues };
    if (payload.tags) {
      payload.tags = payload.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean);
    }
    if (payload.metrics) {
      payload.metrics = payload.metrics.split(',').map((metric: string) => metric.trim()).filter(Boolean);
    }
    if (payload.features) {
      payload.features = payload.features.split(',').map((feature: string) => feature.trim()).filter(Boolean);
    }
    if (payload.published_at) {
      payload.published_at = new Date(payload.published_at).toISOString();
    }
    if (payload.rating) {
      payload.rating = parseInt(payload.rating, 10);
    }

    let error;
    if (editingId) {
      // Update existing item
      error = (await supabase.from(table).update(payload).eq('id', editingId)).error;
    } else {
      // Insert new item
      error = (await supabase.from(table).insert(payload)).error;
    }

    setLoading(false);
    if (error) {
      createToast.emit({ id: getId(), message: error.message, type: 'error' });
    } else {
      setFormValues({});
      setEditingId(null);
      fetchItems();
      createToast.emit({ id: getId(), message: editingId ? `${title} updated` : `${title} added`, type: 'success' });
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
        <div className="flex gap-2">
          <button type="submit" className="button-primary flex-1" disabled={loading}>
            {loading ? 'Saving…' : editingId ? 'Update entry' : 'Add entry'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} className="button-secondary" disabled={loading}>
              Cancel
            </button>
          )}
        </div>
      </form>
      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-200">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between rounded-2xl border border-white/10 p-3">
            <div className="flex-1">
              <p className="font-semibold">{item.title || item.name}</p>
              {item.description && <p className="text-xs text-slate-500">{item.description}</p>}
              {(() => {
                // Handle metrics display - normalize to array first
                let metricsArray: string[] = [];
                if (item.metrics) {
                  if (Array.isArray(item.metrics)) {
                    metricsArray = item.metrics;
                  } else if (typeof item.metrics === 'string') {
                    // Try to parse if it's a string representation of an array
                    try {
                      const parsed = JSON.parse(item.metrics);
                      metricsArray = Array.isArray(parsed) ? parsed : [item.metrics];
                    } catch {
                      // If not JSON, treat as comma-separated string
                      metricsArray = item.metrics.split(/[·,]/).map((m: string) => m.trim()).filter(Boolean);
                    }
                  }
                }
                return metricsArray.length > 0 ? (
                  <p className="text-xs text-slate-400 mt-1">Metrics: {metricsArray.join(', ')}</p>
                ) : null;
              })()}
            </div>
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => handleEdit(item)}
                className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                disabled={editingId === item.id}
              >
                {editingId === item.id ? 'Editing...' : 'Edit'}
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-xs font-semibold text-rose-500 hover:text-rose-400 transition-colors"
                disabled={editingId === item.id}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </AdminSectionCard>
  );
};

export default CrudList;
