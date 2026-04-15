import Image from 'next/image';
import { GalleryMedia } from './GalleryMedia';
import type { WebsiteWork } from '@/lib/websites';

type CanvasProps = {
  work: WebsiteWork;
  index: number;
  total: number;
};

export function Canvas({ work, index, total }: CanvasProps) {
  const num = String(index + 1).padStart(2, '0');
  const tot = String(total).padStart(2, '0');
  const headerOffset = 72;

  return (
    <article
      data-gallery-card
      data-pin-index={index}
      aria-label={`${work.title} — ${work.category}`}
      className="gallery-canvas relative"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10 + index,
        height: '100vh',
        padding: '0 clamp(12px, 2vw, 28px) clamp(20px, 3vh, 36px)',
        willChange: 'transform',
      }}
    >
      <div
        data-gallery-card-inner
        className="gallery-canvas-frame relative flex h-full w-full flex-col overflow-hidden"
        style={{
          background: 'var(--color-bg)',
          color: 'var(--color-ink)',
          borderRadius: 'var(--radius-canvas)',
          transformOrigin: 'center 35%',
        }}
      >
        {/* gold corner marks */}
        <CornerMark className="left-3 top-3" type="tl" />
        <CornerMark className="right-3 top-3" type="tr" />
        <CornerMark className="left-3 bottom-3" type="bl" />
        <CornerMark className="right-3 bottom-3" type="br" />

        {/* placard header */}
        <header
          className="relative flex shrink-0 items-center justify-between gap-4 px-6 md:px-10"
          style={{
            height: `${headerOffset}px`,
            borderBottom: '1px solid rgba(196, 138, 58, 0.38)',
          }}
        >
          <div className="flex items-baseline gap-4 md:gap-6">
            <span
              className="font-mono text-[11px] uppercase tracking-[0.24em]"
              style={{ color: 'var(--color-gold-dim)' }}
            >
              № {num} / {tot}
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted md:inline">
              {work.year}
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted md:inline">
              {work.category}
            </span>
          </div>

          <div className="flex items-baseline gap-4 md:gap-6">
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted md:inline">
              client · {work.client}
            </span>
            <span
              className="font-serif text-[18px] italic leading-none tracking-tight md:text-[22px]"
              style={{ color: 'var(--color-ink)' }}
            >
              {work.title}
            </span>
          </div>
        </header>

        {/* main canvas area */}
        <div className="relative flex min-h-0 flex-1 flex-col md:flex-row">
          <aside
            className="flex shrink-0 flex-col justify-between px-6 py-6 md:w-[36%] md:px-10 md:py-10"
            style={{
              borderRight: '1px solid rgba(196, 138, 58, 0.3)',
              background:
                'linear-gradient(180deg, rgba(232,217,183,0.35) 0%, rgba(232,217,183,0.0) 100%)',
            }}
          >
            <div>
              <p
                className="font-mono text-[10.5px] uppercase tracking-[0.28em]"
                style={{ color: 'var(--color-gold-dim)' }}
              >
                ─ placard
              </p>
              <h3
                className="mt-5 font-serif font-medium leading-[0.95] tracking-[-0.02em]"
                style={{
                  color: 'var(--color-ink)',
                  fontSize: 'clamp(36px, 5.2vw, 76px)',
                }}
              >
                {work.title}
              </h3>
              <p className="mt-6 max-w-[36ch] font-serif italic text-[17px] leading-[1.5] text-ink-muted md:text-[19px]">
                {work.tagline}
              </p>
            </div>

            <div className="mt-10 space-y-5">
              <MetaRow label="Year" value={String(work.year)} />
              <MetaRow label="Client" value={work.client} />
              <MetaRow label="Work" value={work.category} />
              <MetaRow
                label="Live"
                value={work.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
              />

              <a
                href={work.url}
                target="_blank"
                rel="noreferrer"
                className="group mt-6 inline-flex items-center gap-3 rounded-full border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-200 hover:text-[color:var(--color-bg)]"
                style={{
                  borderColor: 'var(--color-ink)',
                  color: 'var(--color-ink)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-ink)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                visit the site
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>
            </div>
          </aside>

          <div className="relative flex min-h-0 flex-1 items-center justify-center p-5 md:p-8">
            <div
              className="relative h-full w-full overflow-hidden"
              style={{
                borderRadius: 10,
                background: 'var(--color-bg-deep)',
                boxShadow:
                  'inset 0 0 0 1px rgba(196, 138, 58, 0.35), 0 10px 28px -16px rgba(44, 29, 18, 0.35)',
              }}
            >
              {work.preview ? (
                <GalleryMedia
                  src={work.preview}
                  poster={work.cover}
                  alt={`${work.title} preview`}
                  index={index}
                />
              ) : work.cover ? (
                <Image
                  src={work.cover}
                  alt={`${work.title} hero`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover object-top"
                />
              ) : (
                <>
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        'radial-gradient(60% 50% at 50% 40%, rgba(196,138,58,0.15) 0%, rgba(196,138,58,0) 70%)',
                    }}
                  />
                  <div className="relative flex h-full w-full flex-col items-center justify-center px-10 py-10 text-center">
                    <span
                      className="font-mono text-[10.5px] uppercase tracking-[0.3em]"
                      style={{ color: 'var(--color-gold-dim)' }}
                    >
                      paper proof · screenshot pending
                    </span>
                    <h4
                      className="mt-6 font-serif font-medium leading-[0.95] tracking-[-0.02em]"
                      style={{
                        color: 'var(--color-ink)',
                        fontSize: 'clamp(44px, 8vw, 120px)',
                      }}
                    >
                      {work.title}
                    </h4>
                    <p className="mt-6 max-w-[40ch] font-serif italic text-[17px] leading-[1.5] text-ink-muted md:text-[20px]">
                      {work.tagline}
                    </p>
                    <span className="mt-10 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
                      {work.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                    </span>
                  </div>
                </>
              )}

              <FrameTack className="left-3 top-3" />
              <FrameTack className="right-3 top-3" />
              <FrameTack className="left-3 bottom-3" />
              <FrameTack className="right-3 bottom-3" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[88px_1fr] items-baseline gap-4">
      <span
        className="font-mono text-[10.5px] uppercase tracking-[0.24em]"
        style={{ color: 'var(--color-gold-dim)' }}
      >
        {label}
      </span>
      <span
        className="font-serif text-[16px] leading-tight tracking-tight"
        style={{ color: 'var(--color-ink)' }}
      >
        {value}
      </span>
    </div>
  );
}

function CornerMark({
  className = '',
  type,
}: {
  className?: string;
  type: 'tl' | 'tr' | 'bl' | 'br';
}) {
  const borders =
    type === 'tl'
      ? { borderTop: '1px solid', borderLeft: '1px solid' }
      : type === 'tr'
        ? { borderTop: '1px solid', borderRight: '1px solid' }
        : type === 'bl'
          ? { borderBottom: '1px solid', borderLeft: '1px solid' }
          : { borderBottom: '1px solid', borderRight: '1px solid' };
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-20 h-3 w-3 ${className}`}
      style={{ ...borders, borderColor: 'var(--color-gold)' }}
    />
  );
}

function FrameTack({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-1.5 w-1.5 rounded-full ${className}`}
      style={{
        background: 'var(--color-gold)',
        boxShadow: '0 0 0 2px var(--color-bg-deep), 0 1px 0 rgba(44,29,18,0.35)',
      }}
    />
  );
}
