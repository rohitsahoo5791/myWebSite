import { motion } from "motion/react";
import { Layers } from "lucide-react";

const architectureLayers = [
  {
    id: 1,
    layer: "User Layer",
    title: "User Experience & Design",
    description:
      "Understanding user needs, UI/UX design principles, and building intuitive interfaces.",
    topics: ["User Research", "UI/UX Design", "Accessibility", "User Testing"],
  },
  {
    id: 2,
    layer: "Application Layer",
    title: "Application Development",
    description:
      "Building business logic, API design, and application services.",
    topics: [
      "API Design",
      "Business Logic",
      "Client-Server Architecture",
      "Microservices Basics",
    ],
  },
  {
    id: 3,
    layer: "Platform Layer",
    title: "Platform & Framework",
    description:
      "Working with frameworks, databases, caching, and message queues.",
    topics: [
      "Frameworks",
      "Database Design",
      "Caching Strategies",
      "Message Queues",
    ],
  },
  {
    id: 4,
    layer: "Infrastructure Layer",
    title: "Infrastructure & DevOps",
    description:
      "Containerization, orchestration, deployment, and cloud infrastructure.",
    topics: [
      "Docker & Containers",
      "Kubernetes Orchestration",
      "CI/CD Pipelines",
      "Cloud Platforms",
    ],
  },
  {
    id: 5,
    layer: "Observability Layer",
    title: "Monitoring & Observability",
    description: "Logging, metrics, tracing, and debugging production systems.",
    topics: [
      "Logging Systems",
      "Metrics & Monitoring",
      "Distributed Tracing",
      "Alert Management",
    ],
  },
  {
    id: 6,
    layer: "Security Layer",
    title: "Security & Authentication",
    description:
      "Authentication, authorization, encryption, and threat prevention.",
    topics: [
      "OAuth & JWT",
      "Encryption",
      "Role-Based Access",
      "Threat Prevention",
    ],
  },
  {
    id: 7,
    layer: "Reliability Layer",
    title: "Availability & Reliability",
    description:
      "Fault tolerance, redundancy, disaster recovery, and SLA management.",
    topics: [
      "High Availability",
      "Disaster Recovery",
      "Load Balancing",
      "SLA Management",
    ],
  },
  {
    id: 8,
    layer: "Compliance Layer",
    title: "Compliance & Standards",
    description:
      "Regulations, data privacy, audit trails, and compliance frameworks.",
    topics: [
      "GDPR Compliance",
      "HIPAA Standards",
      "Audit Trails",
      "Regulatory Requirements",
    ],
  },
  {
    id: 9,
    layer: "Data Governance Layer",
    title: "Data Governance & Management",
    description:
      "Data quality, lineage, retention policies, and data stewardship.",
    topics: [
      "Data Quality",
      "Data Lineage",
      "Retention Policies",
      "Data Stewardship",
    ],
  },
];

export default function ArchitectureLayers() {
  return (
    <section
      id="timeline"
      className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Architecture Learning Path
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            One layer at a time, we'll master the complete system architecture
            stack.
          </p>
        </motion.div>

        <div className="relative">
          {/* Gradient Bar */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-emerald-500" />

          <div className="space-y-12">
            {architectureLayers.map((layer, index) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Layer Dot with number */}
                <div className="absolute left-4 md:left-1/2 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full border-4 border-white shadow-lg z-10 transform -translate-x-3 md:-translate-x-5 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {layer.id}
                  </span>
                </div>
                {/* Content Card */}
                <div
                  className={`ml-20 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-cyan-500 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <Layers className="w-5 h-5 text-cyan-600" />
                      <span className="text-lg font-bold text-cyan-600">
                        {layer.layer}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {layer.title}
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {layer.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {layer.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-xs font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>{" "}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
