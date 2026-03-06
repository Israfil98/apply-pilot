import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import useAuthStore from '../stores/authStore';

const useAuth = () => {
  const { user, loading, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setLoading]);

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      return { data, error };
    } catch {
      return {
        data: null,
        error: { message: 'An unexpected error occurred. Please try again.' },
      };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { data, error };
    } catch {
      return {
        data: null,
        error: { message: 'An unexpected error occurred. Please try again.' },
      };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      return { data, error };
    } catch {
      return {
        data: null,
        error: { message: 'An unexpected error occurred. Please try again.' },
      };
    }
  };

  const signInWithGitHub = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
      });
      return { data, error };
    } catch {
      return {
        data: null,
        error: { message: 'An unexpected error occurred. Please try again.' },
      };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch {
      return {
        error: { message: 'An unexpected error occurred. Please try again.' },
      };
    }
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithGitHub,
    signOut,
  };
};

export default useAuth;
