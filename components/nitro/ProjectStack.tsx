import type { Project } from '@/lib/projects';
import { ProjectPanel } from './ProjectPanel';

type ProjectStackProps = {
  projects: Project[];
  headerOffset?: number;
};

export function ProjectStack({ projects, headerOffset = 72 }: ProjectStackProps) {
  return (
    <section
      aria-label="Projects"
      className="project-stack relative z-10 mx-auto max-w-[1400px] px-4 md:px-6"
    >
      {projects.map((p, i) => (
        <ProjectPanel
          key={p.slug}
          project={p}
          index={i}
          total={projects.length}
          headerOffset={headerOffset}
        />
      ))}
      {/* spacer so the final panel has room to fully settle */}
      <div aria-hidden style={{ height: '20vh' }} />
    </section>
  );
}
