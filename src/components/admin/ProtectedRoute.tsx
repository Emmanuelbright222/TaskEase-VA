import { Navigate } from 'react-router-dom';
import { useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../../lib/supabaseClient';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      setAuthenticated(Boolean(session));
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
      setAuthenticated(Boolean(session));
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">Loading dashboard…</p>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
