import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Loader2, Calendar, Users, Trash2, Edit } from 'lucide-react';
import { useProjectStore } from '../stores/projectStore';
import type { Project } from '../lib/types';

const ProjectsPage = () => {
  const { 
    projects, 
    loading, 
    error, 
    fetchProjects, 
    createProject,
    deleteProject 
  } = useProjectStore();
  const [isCreating, setIsCreating] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      await createProject({
        title: newProject.title,
        description: newProject.description,
        status: 'active'
      });
      setNewProject({ title: '', description: '' });
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await deleteProject(projectId);
    }
  };

  if (loading && !projects.length) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Projects</h1>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>New Project</span>
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 text-red-500 rounded-lg">
            {error}
          </div>
        )}

        {isCreating && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-secondary p-6 rounded-xl"
          >
            <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Project Title</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project description"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Create Project
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={() => handleDeleteProject(project.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, onDelete }: { project: Project; onDelete: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-secondary rounded-xl overflow-hidden"
    >
      {project.thumbnail && (
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date(project.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>3 members</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-full bg-blue-400/20 border-2 border-background"
              />
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onDelete}
              className="p-2 text-red-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            <button className="p-2 text-blue-400 hover:text-blue-500 transition-colors">
              <Edit className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsPage;