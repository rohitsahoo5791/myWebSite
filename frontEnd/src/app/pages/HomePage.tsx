import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import LearnSection from '../components/LearnSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import Timeline from '../components/Timeline';
import Collaborators from '../components/Collaborators';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <LearnSection />
      <ProjectsSection />
      <SkillsSection />
      <Timeline />
      <Collaborators />
      <Footer />
    </div>
  );
}
