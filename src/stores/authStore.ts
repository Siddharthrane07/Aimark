import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  signUp: async (email: string, password: string, fullName: string) => {
    set({ loading: true, error: null });
    console.log('[Auth] Starting sign up process...');

    try {
      // 1. Create auth user with debug logging
      console.log('[Auth] Creating auth user for:', email);
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      console.log('[Auth] Sign up response:', {
        success: !signUpError,
        userId: authData?.user?.id,
        error: signUpError?.message
      });

      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error('No user data returned');

      // 2. Create profile record with RLS handling
      console.log('[Auth] Creating profile for user:', authData.user.id);
      if (!authData.session) throw new Error('No session data returned');
      const { error: profileError } = await supabase.auth.setSession({
        access_token: authData.session.access_token,
        refresh_token: authData.session.refresh_token,
      });
      
      if (profileError) {
        console.error('[Auth] Session setup failed:', profileError);
        throw profileError;
      }

      const { error: insertError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            email,
            full_name: fullName,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        ])
        .select()
        .single();

      if (insertError) {
        console.error('[Auth] Profile creation failed:', {
          code: insertError.code,
          details: insertError.details,
          message: insertError.message
        });

        // Cleanup on profile creation failure
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw new Error(
          insertError.code === '42501' 
            ? 'Permission denied while creating profile. Please try again.' 
            : insertError.message
        );
      }

      set({ user: authData.user, loading: false, error: null });
      console.log('[Auth] Sign up completed successfully');

    } catch (error: any) {
      console.error('[Auth] Sign up error:', {
        message: error.message,
        code: error.code,
        details: error.details || error
      });

      set({ 
        error: error.code === '42501' 
          ? 'Permission denied while creating profile. Please try again.'
          : error.message || 'Failed to create account',
        loading: false,
        user: null
      });
      throw error;
    }
  },

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    console.log('[Auth] Attempting sign in...');

    try {
      // 1. Authenticate user
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('[Auth] Sign in response:', {
        success: !signInError,
        userId: data?.user?.id
      });

      if (signInError) throw signInError;

      // 2. Verify profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      console.log('[Auth] Profile check:', {
        exists: !!profile,
        error: profileError?.message
      });

      if (profileError) {
        console.error('[Auth] Profile fetch error:', profileError);
        throw new Error('Profile not found');
      }

      set({ 
        user: data.user, 
        loading: false, 
        error: null 
      });
      console.log('[Auth] Sign in completed successfully');

    } catch (error: any) {
      console.error('[Auth] Sign in error:', {
        message: error.message,
        code: error.code,
        details: error
      });

      const errorMessage = error.message === 'Failed to fetch'
        ? 'Network error. Please check your connection.'
        : error.message || 'Invalid credentials';

      set({ 
        error: errorMessage,
        loading: false,
        user: null 
      });
      throw error;
    }
  },

  signOut: async () => {
    set({ loading: true, error: null });
    console.log('[Auth] Starting sign out...');

    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      set({ 
        user: null, 
        error: null, 
        loading: false 
      });
      console.log('[Auth] Sign out completed successfully');

    } catch (error: any) {
      console.error('[Auth] Sign out error:', {
        message: error.message,
        details: error
      });
      set({ 
        error: error.message || 'Failed to sign out',
        loading: false 
      });
      throw error;
    }
  },

  checkUser: async () => {
    set({ loading: true, error: null });
    console.log('[Auth] Checking current user...');

    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      console.log('[Auth] User check:', {
        isAuthenticated: !!user,
        userId: user?.id
      });

      if (error) throw error;

      set({ 
        user, 
        loading: false, 
        error: null 
      });

    } catch (error: any) {
      console.error('[Auth] User check error:', {
        message: error.message,
        details: error
      });
      set({ 
        user: null, 
        loading: false, 
        error: error.message 
      });
    }
  },
}));