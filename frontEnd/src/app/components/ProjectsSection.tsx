import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 'distributed-cache',
    name: 'Distributed Cache System',
    problem: 'How do you build a cache that scales horizontally without data loss?',
    description: 'Implemented consistent hashing, replication, and a gossip protocol for node discovery.',
    tags: ['Go', 'Redis', 'Distributed Systems', 'Docker'],
  },
  {
    id: 'graph-visualizer',
    name: 'Interactive Graph Visualizer',
    problem: 'How can developers visualize complex graph algorithms in real-time?',
    description: 'Built a web-based tool to visualize BFS, DFS, Dijkstra, and other graph algorithms with step-by-step execution.',
    tags: ['React', 'D3.js', 'Algorithms', 'TypeScript'],
  },
  {
    id: 'git-from-scratch',
    name: 'Git Implementation from Scratch',
    problem: 'What would it take to rebuild Git\'s core features?',
    description: 'Recreated init, add, commit, branch, and merge using only file system operations and SHA-1 hashing.',
    tags: ['Rust', 'Version Control', 'CLI', 'Systems'],
  },
  {
    id: 'dev-cli-tools',
    name: 'Developer CLI Toolkit',
    problem: 'How can repetitive development tasks be automated elegantly?',
    description: 'Created a suite of CLI tools for code generation, testing workflows, and deployment automation.',
    tags: ['Node.js', 'CLI', 'DevOps', 'TypeScript'],
  },
  {
    id: 'performance-profiler',
    name: 'JavaScript Performance Profiler',
    problem: 'How do you identify performance bottlenecks in production code?',
    description: 'Built a lightweight profiler that tracks function execution times and memory usage with minimal overhead.',
    tags: ['JavaScript', 'Performance', 'V8', 'Profiling'],
  },
  {
    id: 'rate-limiter',
    name: 'API Rate Limiter Library',
    problem: 'How do you implement fair rate limiting at scale?',
    description: 'Designed token bucket and sliding window algorithms with Redis backend for distributed rate limiting.',
    tags: ['Go', 'Redis', 'API Design', 'Concurrency'],
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Engineering Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-world problems solved through systematic engineering.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-cyan-500 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors">
                {project.name}
              </h3>

              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-cyan-700 font-medium mb-1">Problem</p>
                <p className="text-sm text-gray-700 italic">{project.problem}</p>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-cyan-600 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm">Code</span>
                </a>
                <Link
                  to={`/project/${project.id}`}
                  className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 transition-colors font-medium"
                >
                  <span className="text-sm">Case Study</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
