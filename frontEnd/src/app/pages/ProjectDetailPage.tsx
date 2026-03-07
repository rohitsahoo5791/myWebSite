import { useParams, Link } from 'react-router';
import { ArrowLeft, Github, ExternalLink, CheckCircle2, AlertCircle, Lightbulb, Image } from 'lucide-react';
import { motion } from 'motion/react';

const projectData: Record<string, any> = {
  'distributed-cache': {
    name: 'Distributed Cache System',
    tagline: 'Building a horizontally scalable cache with consistency guarantees',
    problem: `
      Modern applications need caching layers that can:
      - Scale horizontally as traffic increases
      - Maintain data consistency across multiple nodes
      - Handle node failures gracefully
      - Provide sub-millisecond read/write latency
      
      Traditional single-node caches like Redis don't scale well when you need to handle
      millions of requests per second. We needed a solution that could distribute load
      across multiple nodes while maintaining consistency.
    `,
    architecture: {
      title: 'System Architecture',
      description: 'The system uses consistent hashing for data distribution, gossip protocol for node discovery, and quorum-based replication for consistency.',
      components: [
        'Consistent Hashing Ring',
        'Gossip Protocol for Node Discovery',
        'Quorum-based Replication (W + R > N)',
        'Vector Clocks for Conflict Resolution'
      ]
    },
    implementation: {
      details: [
        {
          title: 'Consistent Hashing',
          description: 'Implemented a virtual node system where each physical node owns multiple positions on the hash ring. This provides better load distribution when nodes are added or removed.'
        },
        {
          title: 'Gossip Protocol',
          description: 'Nodes exchange membership information every 100ms. Failure detection uses a phi-accrual algorithm with exponential backoff.'
        },
        {
          title: 'Replication',
          description: 'Each key is replicated to N successor nodes. Writes require W acknowledgments, reads require R responses. Configured with N=3, W=2, R=2 for strong consistency.'
        },
        {
          title: 'Conflict Resolution',
          description: 'Vector clocks track causality between concurrent writes. Client is responsible for merging conflicts when they occur.'
        }
      ]
    },
    challenges: [
      {
        challenge: 'Network Partitions',
        solution: 'Implemented sloppy quorum with hinted handoff. When a node is unavailable, writes are temporarily stored on another node and replayed when the target recovers.'
      },
      {
        challenge: 'Handling Hot Keys',
        solution: 'Added read replicas for frequently accessed keys. Keys exceeding 1000 req/s threshold are automatically promoted to have additional replicas.'
      },
      {
        challenge: 'Thundering Herd',
        solution: 'Implemented request coalescing where multiple requests for the same missing key are batched into a single backend fetch.'
      }
    ],
    learnings: [
      'CAP theorem trade-offs are real - we had to choose between strict consistency and availability during partitions',
      'Consistent hashing with virtual nodes is essential for even load distribution',
      'Monitoring and observability must be built in from day one - added metrics for latency, cache hit rate, and replication lag',
      'Handling edge cases (node failure during write, network partitions) is where most complexity lies'
    ],
    techStack: ['Go', 'Redis Protocol', 'gRPC', 'Prometheus', 'Docker', 'Kubernetes'],
    metrics: [
      { label: 'Peak Throughput', value: '500K ops/sec' },
      { label: 'P99 Latency', value: '2ms' },
      { label: 'Nodes', value: '12' },
      { label: 'Cache Hit Rate', value: '98.5%' }
    ]
  }
};

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = projectData[projectId || 'distributed-cache'];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
          <Link to="/" className="text-cyan-600 hover:text-cyan-700">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 border-b border-gray-200 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-cyan-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {project.name}
            </h1>
            <p className="text-2xl text-cyan-600 mb-8">
              {project.tagline}
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              {project.techStack.map((tech: string) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-all"
              >
                <Github className="w-5 h-5" />
                View Source
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all"
              >
                <ExternalLink className="w-5 h-5" />
                Live Demo
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {project.metrics.map((metric: any) => (
            <div
              key={metric.label}
              className="bg-white border border-gray-200 rounded-2xl p-6 text-center"
            >
              <div className="text-3xl font-bold text-cyan-600 mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-gray-600">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Problem */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-cyan-600" />
              The Problem
            </h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {project.problem}
            </div>
          </div>
        </motion.section>

        {/* Architecture */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {project.architecture.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {project.architecture.description}
            </p>

            {/* Architecture Diagram Placeholder */}
            <div className="bg-gray-50 border border-gray-300 rounded-xl h-80 flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Image className="w-10 h-10 text-white" />
                </div>
                <p className="text-gray-600">System Architecture Diagram</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {project.architecture.components.map((component: string) => (
                <div
                  key={component}
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                >
                  <CheckCircle2 className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{component}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Implementation Details */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Implementation Details
            </h2>
            <div className="space-y-6">
              {project.implementation.details.map((detail: any, index: number) => (
                <div
                  key={index}
                  className="p-6 bg-gray-50 border border-gray-300 rounded-xl"
                >
                  <h3 className="text-xl font-bold text-cyan-600 mb-3">
                    {detail.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {detail.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Challenges */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Challenges & Solutions
            </h2>
            <div className="space-y-6">
              {project.challenges.map((item: any, index: number) => (
                <div key={index} className="p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.challenge}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 ml-12">
                    <div className="flex-1 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="text-sm text-green-700 font-medium mb-2">Solution</div>
                      <p className="text-gray-700 leading-relaxed">
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Learnings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-cyan-600" />
              Key Learnings
            </h2>
            <ul className="space-y-4">
              {project.learnings.map((learning: string, index: number) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-cyan-600 mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed">{learning}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Screenshots Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Screenshots & Visuals
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-gray-50 border border-gray-300 rounded-xl h-64 flex items-center justify-center"
                >
                  <div className="text-center">
                    <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Screenshot {i}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
