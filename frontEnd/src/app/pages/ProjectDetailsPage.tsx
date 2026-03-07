import { useParams, Link } from 'react-router';
import { useEffect, useState } from 'react';
import { fetchCurriculumFull } from '../../../lib/api';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronDown, Github, Video, File, ExternalLink } from 'lucide-react';

// TypeScript Types
interface Resource {
  id: string;
  label: string;
  type: 'github' | 'video' | 'doc';
  url: string;
}

interface Sprint {
  id: string;
  title: string;
  sprintNumber?: number;
  summary: string;
  startDate: string;
  endDate: string;
  resources: Resource[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  difficulty?: string;
  estimatedHours?: number;
  sprints: Sprint[];
  repositoryUrl?: string;
  learningObjectives?: string[];
  technologies?: string[];
}

interface Curriculum {
  id: string;
  title: string;
  description: string;
  projects: Project[];
}

export default function ProjectDetailsPage() {
  const { curriculumId, projectId } = useParams();
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSprints, setExpandedSprints] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!curriculumId) return;

    fetchCurriculumFull(curriculumId)
      .then((data) => {
        setCurriculum(data);
        
        // Find the project matching projectId
        const foundProject = data.projects?.find((p: Project) => p.id === projectId);
        
        if (!foundProject) {
          setError('Project not found');
        } else {
          setProject(foundProject);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch curriculum:', err);
        setError('Failed to load project details');
      })
      .finally(() => setLoading(false));
  }, [curriculumId, projectId]);

  const toggleSprint = (sprintId: string) => {
    const newExpanded = new Set(expandedSprints);
    if (newExpanded.has(sprintId)) {
      newExpanded.delete(sprintId);
    } else {
      newExpanded.add(sprintId);
    }
    setExpandedSprints(newExpanded);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'doc':
        return <File className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <Link
            to={`/curriculum/${curriculumId}`}
            className="inline-block px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 font-medium mb-4">Project not found</p>
          <Link
            to={`/curriculum/${curriculumId}`}
            className="inline-block px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <Link
            to={`/curriculum/${curriculumId}`}
            className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Projects</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-2">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                {project.title}
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Project Meta Info */}
            <div className="flex items-center gap-4 mt-6 flex-wrap">
              {project.difficulty && (
                <div className={`px-4 py-2 rounded-lg ${
                  project.difficulty === 'Advanced'
                    ? 'bg-purple-100'
                    : project.difficulty === 'Intermediate'
                    ? 'bg-blue-100'
                    : 'bg-green-100'
                }`}>
                  <p className={`text-sm font-medium ${
                    project.difficulty === 'Advanced'
                      ? 'text-purple-700'
                      : project.difficulty === 'Intermediate'
                      ? 'text-blue-700'
                      : 'text-green-700'
                  }`}>
                    {project.difficulty} Level
                  </p>
                </div>
              )}
              {project.sprints && (
                <div className="px-4 py-2 bg-cyan-100 rounded-lg">
                  <p className="text-sm font-medium text-cyan-700">
                    {project.sprints.length} Sprint{project.sprints.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
              {project.estimatedHours && (
                <div className="px-4 py-2 bg-orange-100 rounded-lg">
                  <p className="text-sm font-medium text-orange-700">
                    ~{project.estimatedHours} hours
                  </p>
                </div>
              )}
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Learning Objectives */}
            {project.learningObjectives && project.learningObjectives.length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm font-medium text-blue-700 mb-3">Learning Objectives</p>
                <ul className="space-y-2">
                  {project.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Sprints Section */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Project Sprints
            </h2>
            <p className="text-lg text-gray-600">
              Each sprint builds upon the previous one. Click to expand and view resources.
            </p>
          </motion.div>

          {project.sprints && project.sprints.length > 0 ? (
            <div className="space-y-4">
              {project.sprints.map((sprint, index) => (
                <motion.div
                  key={sprint.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-cyan-500 hover:shadow-lg transition-all"
                >
                  {/* Sprint Header - Clickable */}
                  <button
                    onClick={() => toggleSprint(sprint.id)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold">
                          Sprint {sprint.sprintNumber || index + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {sprint.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {sprint.summary}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          📅 {formatDate(sprint.startDate)} → {formatDate(sprint.endDate)}
                        </span>
                        <span className="flex items-center gap-1">
                          📚 {sprint.resources?.length || 0} resource{sprint.resources?.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                    <div className={`flex-shrink-0 transition-transform ${expandedSprints.has(sprint.id) ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </button>

                  {/* Resources - Collapsible */}
                  {expandedSprints.has(sprint.id) && sprint.resources && sprint.resources.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-200 bg-gray-50 px-6 py-4"
                    >
                      <p className="text-sm font-semibold text-gray-700 mb-4">Resources</p>
                      <div className="space-y-3">
                        {sprint.resources.map((resource) => (
                          <a
                            key={resource.id}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-all group"
                          >
                            <div className="flex-shrink-0 text-gray-400 group-hover:text-cyan-600 transition-colors">
                              {getResourceIcon(resource.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 group-hover:text-cyan-600 transition-colors truncate">
                                {resource.label}
                              </p>
                              <p className="text-xs text-gray-500 capitalize">
                                {resource.type === 'github' ? 'GitHub Repository' : resource.type === 'video' ? 'Video Tutorial' : 'Documentation'}
                              </p>
                            </div>
                            <div className="flex-shrink-0 text-gray-400 group-hover:text-cyan-600 transition-colors">
                              <ExternalLink className="w-4 h-4" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Empty Resources State */}
                  {expandedSprints.has(sprint.id) && (!sprint.resources || sprint.resources.length === 0) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-200 bg-gray-50 px-6 py-4 text-center"
                    >
                      <p className="text-gray-500 text-sm">No resources added yet.</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
              <p className="text-gray-600 text-lg">No sprints available yet.</p>
              <p className="text-gray-500 mt-2">Sprints will be added soon!</p>
            </div>
          )}
        </div>
      </div>

      {/* Repository Link */}
      {project.repositoryUrl && (
        <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-50 to-blue-50 border-t border-cyan-200">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-700 mb-4 font-medium">Ready to get started?</p>
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium"
            >
              <Github className="w-5 h-5" />
              Clone Repository
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
