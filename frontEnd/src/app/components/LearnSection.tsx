import { motion } from 'motion/react';
import { Link } from 'react-router';
import { 
  ArrowRight, BookOpen, Layers, GitBranch, Sparkles, Zap, Code, 
  Database, Settings, Monitor, Palette, Cpu, Shield, Rocket, Terminal,
  Package, Smartphone, Cloud, Puzzle, Briefcase, Lightbulb, Brain,
  Wifi, Radio, Gauge, Hammer, Grid, Compass
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchCurriculums } from '../../../lib/api';

const iconMap: Record<string, any> = {
  'Layers': Layers,
  'GitBranch': GitBranch,
  'Code': Code,
  'Sparkles': Sparkles,
  'Zap': Zap,
  'BookOpen': BookOpen,
  'Database': Database,
  'Settings': Settings,
  'Monitor': Monitor,
  'Palette': Palette,
  'Cpu': Cpu,
  'Shield': Shield,
  'Rocket': Rocket,
  'Terminal': Terminal,
  'Package': Package,
  'Smartphone': Smartphone,
  'Cloud': Cloud,
  'Puzzle': Puzzle,
  'Briefcase': Briefcase,
  'Lightbulb': Lightbulb,
  'Brain': Brain,
  'Wifi': Wifi,
  'Radio': Radio,
  'Gauge': Gauge,
  'Hammer': Hammer,
  'Grid': Grid,
  'Compass': Compass
};

const gradientMap: Record<string, string> = {
  blue: "bg-gradient-to-br from-blue-500 to-purple-500",
  cyan: "bg-gradient-to-br from-cyan-500 to-blue-600",
  emerald: "bg-gradient-to-br from-emerald-500 to-teal-600",
  orange: "bg-gradient-to-br from-orange-500 to-red-500",
  dark: "bg-gradient-to-br from-slate-700 to-slate-900",
  pink: "bg-gradient-to-br from-fuchsia-500 to-rose-600",
};

export default function LearnSection() {
  const [learningTracks, setLearningTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCurriculums()
      .then(setLearningTracks)
      .catch((err) => {
        console.error('Failed to fetch curriculums:', err);
        setError('Failed to load learning tracks');
      })
      .finally(() => setLoading(false));
  }, []);


  if (loading) {
    return (
      <section id="learn" className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading learning tracks...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="learn" className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <p className="text-red-600 font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="learn" className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Learn With Rohit
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Structured public learning tracks with real code and experiments.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningTracks.map((track, index) => {
            // Clean icon resolution with fallback
            const cleanedIcon = track.icon?.trim();
            const Icon = iconMap[cleanedIcon] || BookOpen;

            // Safe key-based gradient lookup with fallback
            const backgroundClass =
              gradientMap[track.color as string] || "bg-cyan-500";
            
            return (
              
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/curriculum/${track.id}`}>
                  <div className="group h-full bg-white border border-gray-200 rounded-2xl p-8 hover:border-cyan-500 hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div className={`w-14 h-14 rounded-xl ${backgroundClass} p-3 mb-6 group-hover:scale-110 transition-transform flex items-center justify-center`}>
                      <Icon size={28} className="text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors">
                      {track.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {track.description}
                    </p>

                    {/* <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">
                        {track.modules} modules
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        track.difficulty === 'Advanced' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-cyan-100 text-cyan-700'
                      }`}>
                        {track.difficulty}
                      </span>
                    </div> */}

                    {/* <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div className={`h-2 rounded-full bg-gradient-to-r ${track.color}`} style={{ width: '0%' }} />
                    </div> */}

                    <div className="flex items-center text-cyan-600 font-medium group-hover:gap-2 transition-all">
                      Start Learning
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
