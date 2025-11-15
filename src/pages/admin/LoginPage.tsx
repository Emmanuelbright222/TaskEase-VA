import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import InputField from '../../components/ui/InputField';
import { useNavigate } from 'react-router-dom';
import { createToast } from '../../components/ui/ToastContainer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    const toastId = typeof crypto?.randomUUID === 'function' ? crypto.randomUUID() : String(Date.now());
    if (error) {
      createToast.emit({ id: toastId, message: error.message, type: 'error' });
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <form onSubmit={handleSubmit} className="glass-panel w-full max-w-md space-y-4 border border-white/10 bg-white/10">
        <div>
          <h1 className="text-2xl font-semibold text-white">TaskEase Admin</h1>
          <p className="text-sm text-slate-200">Sign in with your Supabase credentials.</p>
        </div>
        <InputField label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <InputField label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        <button type="submit" className="button-primary w-full" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
