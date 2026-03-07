import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { BookOpen, FolderOpen, Clock, Layers, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { setUnauthorizedCallback } from '../../../../lib/api';
import CurriculumManager from './CurriculumManager';
import ProjectManager from './ProjectManager';
import SprintManager from './SprintManager';
import ResourceManager from './ResourceManager';

type TabType = 'curriculum' | 'project' | 'sprint' | 'resource';

const TABS: Array<{
  id: TabType;
  label: string;
  icon: React.ReactNode;
}> = [
  { id: 'curriculum', label: 'Curriculum', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'project', label: 'Projects', icon: <FolderOpen className="w-5 h-5" /> },
  { id: 'sprint', label: 'Sprints', icon: <Clock className="w-5 h-5" /> },
  { id: 'resource', label: 'Resources', icon: <Layers className="w-5 h-5" /> },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('curriculum');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Setup unauthorized callback
  useEffect(() => {
    setUnauthorizedCallback(() => {
      logout();
      navigate('/admin/login');
    });
  }, [logout, navigate]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleTabChange = (tabId: TabType) => {
    setActiveTab(tabId);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-gray-900 text-white transition-all duration-300 overflow-hidden fixed md:relative h-full z-40`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-800">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-sm text-gray-400 mt-1">Learn With Rohit</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          <h2 className="text-xl font-semibold text-gray-800">
            {TABS.find(t => t.id === activeTab)?.label}
          </h2>

          <div className="flex items-center gap-4">
            <div className="hidden md:block text-sm text-gray-600">
              Welcome, Admin!
            </div>
            <button
              onClick={handleLogout}
              className="md:hidden p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'curriculum' && <CurriculumManager />}
          {activeTab === 'project' && <ProjectManager />}
          {activeTab === 'sprint' && <SprintManager />}
          {activeTab === 'resource' && <ResourceManager />}
        </div>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
