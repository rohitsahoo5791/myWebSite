import { motion } from 'motion/react';
import { Github, Linkedin, Mail } from 'lucide-react';

const collaborators = [
  {
    name: 'Arjun Patel',
    role: 'Frontend Architect',
    contribution: 'Helped design the interactive graph visualizer UI and performance optimization strategies.',
    image: 'https://images.unsplash.com/photo-1565687981296-535f09db714e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGRldmVsb3BlciUyMGNvZGluZyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzE3NTA1MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Priya Sharma',
    role: 'Backend Engineer',
    contribution: 'Co-developed the distributed cache system and contributed to consensus algorithm implementation.',
    image: 'https://images.unsplash.com/photo-1724654814378-108c93f5fa54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BlciUyMHRlYW0lMjBtZW1iZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzE3NTA1MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Vikram Singh',
    role: 'DevOps Engineer',
    contribution: 'Built the CI/CD pipelines and Kubernetes deployments for multiple projects.',
    image: 'https://images.unsplash.com/photo-1555963153-11ff60182d08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWVyJTIwY29sbGVhZ3VlJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcxNzUwNTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com'
  }
];

export default function Collaborators() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Special Thanks
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Amazing friends and collaborators who made these projects possible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collaborators.map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-cyan-500 hover:shadow-2xl transition-all duration-300"
            >
              {/* Profile Image */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-cyan-100 to-blue-100">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {person.name}
                </h3>
                <p className="text-cyan-600 font-medium mb-4">
                  {person.role}
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {person.contribution}
                </p>

                {/* Social Links */}
                <div className="flex gap-3">
                  <a
                    href={person.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${person.name.toLowerCase().replace(' ', '.')}@example.com`}
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 transition-all"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
