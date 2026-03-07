import { motion } from 'motion/react';
import { Github, ArrowRight } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              Rohit Kumar Sahoo
            </h1>
            
            <p className="text-2xl md:text-3xl text-cyan-600 mb-6 font-medium">
              Building systems. Learning deeply. Teaching openly.
            </p>
            
            <p className="text-lg text-gray-700 mb-10 leading-relaxed max-w-xl">
              Software engineer exploring distributed systems, graph theory, Git internals, 
              and developer experience. I document everything I learn.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={() => scrollToSection('learn')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/30"
              >
                Explore Curriculum
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-all border border-gray-300"
              >
                View Projects
              </button>
              
              <a
                href="https://github.com/rohitsahoo5791"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-all border border-gray-300 flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Right Side - Profile Picture */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center justify-center"
          >
            <div className="relative">
              {/* Decorative Background */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-2xl opacity-30"
              />
              
              {/* Profile Picture Container */}
              <div className="relative z-10">
                <div className="w-80 h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                  <img
                    src="rohit.jpg"
                    alt="Rohit Kumar Sahoo"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-200"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-600">5+</div>
                    <div className="text-sm text-gray-600">Projects</div>
                  </div>
                </motion.div>

                {/* Floating Badge 2 */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-200"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">12+</div>
                    <div className="text-sm text-gray-600">Modules</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
