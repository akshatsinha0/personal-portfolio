// src/app/projects/page.tsx
import { PROJECTS } from '@/lib/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen p-8 bg-grid-white/5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-12">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
