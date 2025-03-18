import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Project, ProjectMember, ProjectAsset } from '../lib/types';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  projectMembers: ProjectMember[];
  projectAssets: ProjectAsset[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  createProject: (data: Partial<Project>) => Promise<Project>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  setCurrentProject: (project: Project | null) => void;
  fetchProjectMembers: (projectId: string) => Promise<void>;
  addProjectMember: (projectId: string, userId: string, role?: string) => Promise<void>;
  removeProjectMember: (projectId: string, userId: string) => Promise<void>;
  uploadAsset: (projectId: string, file: File) => Promise<void>;
  deleteAsset: (assetId: string) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  currentProject: null,
  projectMembers: [],
  projectAssets: [],
  loading: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ projects: data || [] });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  createProject: async (data) => {
    set({ loading: true, error: null });
    try {
      const { data: project, error } = await supabase
        .from('projects')
        .insert([data])
        .select()
        .single();

      if (error) throw error;
      set(state => ({ projects: [project, ...state.projects] }));
      return project;
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateProject: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('projects')
        .update(data)
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        projects: state.projects.map(p => 
          p.id === id ? { ...p, ...data } : p
        ),
        currentProject: state.currentProject?.id === id 
          ? { ...state.currentProject, ...data }
          : state.currentProject
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteProject: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        projects: state.projects.filter(p => p.id !== id),
        currentProject: state.currentProject?.id === id ? null : state.currentProject
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  setCurrentProject: (project) => {
    set({ currentProject: project });
  },

  fetchProjectMembers: async (projectId) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('project_members')
        .select(`
          *,
          profile:profiles(*)
        `)
        .eq('project_id', projectId);

      if (error) throw error;
      set({ projectMembers: data || [] });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addProjectMember: async (projectId, userId, role = 'member') => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('project_members')
        .insert([{ project_id: projectId, user_id: userId, role }]);

      if (error) throw error;
      await get().fetchProjectMembers(projectId);
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  removeProjectMember: async (projectId, userId) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('project_members')
        .delete()
        .eq('project_id', projectId)
        .eq('user_id', userId);

      if (error) throw error;
      set(state => ({
        projectMembers: state.projectMembers.filter(
          m => !(m.project_id === projectId && m.user_id === userId)
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  uploadAsset: async (projectId, file) => {
    set({ loading: true, error: null });
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${projectId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('project-assets')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('project_assets')
        .insert([{
          project_id: projectId,
          name: file.name,
          type: file.type,
          url: publicUrl
        }]);

      if (dbError) throw dbError;
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteAsset: async (assetId) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('project_assets')
        .delete()
        .eq('id', assetId);

      if (error) throw error;
      set(state => ({
        projectAssets: state.projectAssets.filter(a => a.id !== assetId)
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  }
}));