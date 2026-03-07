import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <span className="text-gray-900 font-semibold">Learn With Rohit</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              A public learning platform where I document my journey through distributed systems, 
              algorithms, and software engineering.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#learn" className="block text-gray-600 hover:text-cyan-600 transition-colors">
                Learning Tracks
              </a>
              <a href="#projects" className="block text-gray-600 hover:text-cyan-600 transition-colors">
                Projects
              </a>
              <a href="#skills" className="block text-gray-600 hover:text-cyan-600 transition-colors">
                Skills
              </a>
              <a href="#timeline" className="block text-gray-600 hover:text-cyan-600 transition-colors">
                Timeline
              </a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/rohitsahoo5791"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/rohit-kumar-sahoo/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:sahookumarrohit982@gmail.com"
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              sahookumarrohit982@gmail.com
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 Rohit Kumar Sahoo. Learning in public.
            </p>
            <p className="text-gray-500 text-sm">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
