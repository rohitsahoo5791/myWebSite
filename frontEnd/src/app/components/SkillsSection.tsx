import { motion } from 'motion/react';
import { Brain, Code2, Network, FileSearch, Lightbulb, Target } from 'lucide-react';

const skillCategories = [
  {
    category: 'Core Thinking',
    icon: Brain,
    color: 'from-cyan-500 to-blue-500',
    skills: ['Algorithms', 'Distributed Systems', 'Debugging', 'System Design']
  },
  {
    category: 'Engineering',
    icon: Code2,
    color: 'from-blue-500 to-purple-500',
    skills: ['JavaScript', 'Vue / React', 'Node.js', 'Git', 'CI/CD']
  },
  {
    category: 'Systems',
    icon: Network,
    color: 'from-purple-500 to-pink-500',
    skills: ['Distributed Computing', 'Caching', 'Message Queues', 'Load Balancing']
  },
  {
    category: 'Problem Solving',
    icon: FileSearch,
    color: 'from-pink-500 to-red-500',
    skills: ['Data Structures', 'Graph Theory', 'Dynamic Programming', 'Optimization']
  },
  {
    category: 'Meta Skills',
    icon: Lightbulb,
    color: 'from-orange-500 to-yellow-500',
    skills: ['Documentation', 'Teaching', 'Public Learning', 'System Modeling']
  },
  {
    category: 'Architecture',
    icon: Target,
    color: 'from-green-500 to-cyan-500',
    skills: ['API Design', 'Database Modeling', 'Scalability', 'Performance']
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Skills & Capabilities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Organized by thinking patterns and technical domains.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-cyan-500 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} p-3 mb-6`}>
                  <Icon className="w-full h-full text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {category.category}
                </h3>

                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-500" />
                      <span className="text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Skill Bars for Visual Interest */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-white border border-gray-200 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Technical Proficiency</h3>
          <div className="space-y-6">
            {[
              { name: 'JavaScript / TypeScript', level: 90 },
              { name: 'System Design', level: 85 },
              { name: 'Distributed Systems', level: 80 },
              { name: 'Algorithms & Data Structures', level: 88 },
              { name: 'Developer Tooling', level: 82 }
            ].map((skill, index) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">{skill.name}</span>
                  <span className="text-cyan-600">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
