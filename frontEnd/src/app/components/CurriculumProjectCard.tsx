import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Github, ExternalLink, BookOpen } from 'lucide-react';

interface CurriculumProjectCardProps {
  project: any;
  index: number;
}

export default function CurriculumProjectCard({ project, index }: CurriculumProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-cyan-500 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-cyan-100 rounded-lg">
          <BookOpen className="w-6 h-6 text-cyan-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-cyan-600 transition-colors">
            {project.title}
          </h3>
          {project.difficulty && (
            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
              project.difficulty === 'Advanced'
                ? 'bg-purple-100 text-purple-700'
                : project.difficulty === 'Intermediate'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-green-100 text-green-700'
            }`}>
              {project.difficulty}
            </span>
          )}
        </div>
      </div>

      <p className="text-gray-600 mb-4 leading-relaxed">
        {project.description}
      </p>

      {project.learningObjectives && project.learningObjectives.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-cyan-700 font-semibold mb-2">Learning Objectives</p>
          <ul className="text-xs text-gray-700 space-y-1">
            {project.learningObjectives.slice(0, 3).map((objective: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-cyan-600 mt-0.5">•</span>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.technologies && project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech: string) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {project.sprints && (
        <div className="mb-4 text-sm text-gray-500">
          <p>{project.sprints.length} sprints • {project.estimatedHours ? `${project.estimatedHours}h` : 'Self-paced'}</p>
        </div>
      )}

      <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
        {project.repositoryUrl && (
          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-cyan-600 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm">Repository</span>
          </a>
        )}
        <Link
          to={`/curriculum/${project.curriculumId}/project/${project.id}`}
          className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 transition-colors font-medium ml-auto"
        >
          <span className="text-sm">View Details</span>
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
