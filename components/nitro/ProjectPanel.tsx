'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import type { Project } from '@/lib/projects';

type ProjectPanelProps = {
  project: Project;
  index: number;
  total: number;
  headerOffset?: number;
};

export function ProjectPanel({ project, index, total, headerOffset = 48 }: ProjectPanelProps) {
  const topOffset = index * headerOffset;

  return (
    <article
      data-panel
      aria-label={project.title}
      className="project-panel relative"
      style={{
        position: 'sticky',
        top: `${topOffset}px`,
        zIndex: 10 + index,
        height: `calc(100vh - ${topOffset}px)`,
      }}
    >
      <div
        className="relative flex h-full w-full flex-col overflow-hidden shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.55)]"
        style={{
          background: project.brand.bg,
          color: project.brand.fg,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        {/* grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* header (year / category) — height = headerOffset, so when stacked only this strip is exposed */}
        <header
          className="relative flex h-12 shrink-0 items-center justify-between border-b px-5 font-mono text-[11px] uppercase tracking-[0.22em] md:px-8"
          style={{
            color: project.brand.fg,
            borderColor: project.brand.fg + '1a',
          }}
        >
          <span style={{ opacity: 0.75 }}>{project.year}</span>
          <span style={{ opacity: 0.75 }}>{project.category}</span>
        </header>

        {/* title row */}
        <div className="relative flex shrink-0 items-center justify-between gap-4 px-5 pt-4 md:px-8 md:pt-5">
          <h2 className="font-display text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-[1] tracking-[-0.02em]">
            {project.title}
          </h2>

          <Link
            href={`/apps/${project.slug}`}
            aria-label={`Open ${project.title} case study`}
            data-cursor="hover"
            className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 hover:scale-110 md:h-12 md:w-12"
            style={{ borderColor: project.brand.fg + '33' }}
          >
            <motion.span
              aria-hidden
              className="block text-xl md:text-2xl"
              whileHover={{ x: 3, y: -3 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              ↗
            </motion.span>
          </Link>
        </div>

        {/* cover — fills remaining height */}
        <div className="relative mx-5 mb-5 mt-4 min-h-0 flex-1 overflow-hidden rounded-lg md:mx-8 md:mb-7">
          <Image
            src={project.cover}
            alt={`${project.title} preview`}
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 85vw"
            className="object-cover"
          />

          {/* tagline strip */}
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-4 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)',
              color: '#fff',
            }}
          >
            <span className="truncate">{project.tagline}</span>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="hidden shrink-0 items-center gap-2 transition-opacity hover:opacity-80 md:inline-flex"
              >
                {project.url.replace(/^https?:\/\/(www\.)?/, '')}
                <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
