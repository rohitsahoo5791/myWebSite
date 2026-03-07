import { useParams, Link } from 'react-router';
import { useEffect, useState } from 'react';
import { fetchCurriculumFull } from '../../../lib/api';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import CurriculumProjectCard from '../components/CurriculumProjectCard';

export default function CurriculumPage() {
  const { trackId } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!trackId) return;

    fetchCurriculumFull(trackId)
      .then(setData)
      .catch((err) => {
        console.error('Failed to fetch curriculum:', err);
        setError('Failed to load curriculum');
      })
      .finally(() => setLoading(false));
  }, [trackId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading curriculum...</p>
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
            to="/#learn"
            className="inline-block px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Back to Curriculum
          </Link>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 font-medium mb-4">Curriculum not found</p>
          <Link
            to="/#learn"
            className="inline-block px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Back to Curriculum
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/#learn"
            className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Curriculum</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {data.title}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              {data.description}
            </p>

            {(data.modules || data.difficulty) && (
              <div className="flex items-center gap-4 mt-6 flex-wrap">
                {data.modules && (
                  <div className="px-4 py-2 bg-cyan-100 rounded-lg">
                    <p className="text-sm font-medium text-cyan-700">
                      {data.modules} Modules
                    </p>
                  </div>
                )}
                {data.difficulty && (
                  <div className={`px-4 py-2 rounded-lg ${
                    data.difficulty === 'Advanced'
                      ? 'bg-purple-100'
                      : data.difficulty === 'Intermediate'
                      ? 'bg-blue-100'
                      : 'bg-green-100'
                  }`}>
                    <p className={`text-sm font-medium ${
                      data.difficulty === 'Advanced'
                        ? 'text-purple-700'
                        : data.difficulty === 'Intermediate'
                        ? 'text-blue-700'
                        : 'text-green-700'
                    }`}>
                      {data.difficulty} Level
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Projects
            </h2>
            <p className="text-lg text-gray-600">
              Build real-world solutions and master these concepts
            </p>
          </motion.div>

          {data.projects && data.projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.projects.map((project: any, index: number) => (
                <CurriculumProjectCard
                  key={project.id}
                  project={{ ...project, curriculumId: trackId }}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <p className="text-gray-600 text-lg">No projects available yet.</p>
              <p className="text-gray-500 mt-2">Come back soon for hands-on projects!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
