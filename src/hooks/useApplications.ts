import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import useAuthStore from '../stores/authStore';
import type { IJobApplication } from '../types';

const useApplications = () => {
  const { user } = useAuthStore();
  const [applications, setApplications] = useState<IJobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchApplications = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      const { data, error: fetchError } = await supabase
        .from('job_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('applied_date', { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
        return;
      }

      setApplications(data ?? []);
    } catch {
      setError('Failed to fetch applications. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const addApplication = async (
    application: Omit<IJobApplication, 'id' | 'user_id' | 'created_at'>,
  ) => {
    if (!user) return { error: { message: 'Not authenticated' } };

    try {
      const { data, error: insertError } = await supabase
        .from('job_applications')
        .insert({ ...application, user_id: user.id })
        .select()
        .single();

      if (insertError) return { data: null, error: insertError };

      setApplications((prev) => [data, ...prev]);
      return { data, error: null };
    } catch {
      return {
        data: null,
        error: { message: 'Failed to add application. Please try again.' },
      };
    }
  };

  const updateApplication = async (
    id: string,
    updates: Partial<Omit<IJobApplication, 'id' | 'user_id' | 'created_at'>>,
  ) => {
    try {
      const { data, error: updateError } = await supabase
        .from('job_applications')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (updateError) return { data: null, error: updateError };

      setApplications((prev) =>
        prev.map((app) => (app.id === id ? data : app)),
      );
      return { data, error: null };
    } catch {
      return {
        data: null,
        error: { message: 'Failed to update application. Please try again.' },
      };
    }
  };

  const deleteApplication = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', id);

      if (deleteError) return { error: deleteError };

      setApplications((prev) => prev.filter((app) => app.id !== id));
      return { error: null };
    } catch {
      return {
        error: { message: 'Failed to delete application. Please try again.' },
      };
    }
  };

  return {
    applications,
    loading,
    error,
    fetchApplications,
    addApplication,
    updateApplication,
    deleteApplication,
  };
};

export default useApplications;
