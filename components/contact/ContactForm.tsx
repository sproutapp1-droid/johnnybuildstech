'use client';

import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const ease = [0.16, 1, 0.3, 1] as const;

const PROJECT_TYPES = [
  'Landing page',
  'Service site',
  'Full build',
  'Apps / other',
  'Just saying hello',
] as const;

const BUDGETS = [
  'Under £2k',
  '£2–5k',
  '£5–10k',
  '£10k+',
  'Not sure yet',
] as const;

type Fields = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = {
  name: '',
  email: '',
  projectType: '',
  budget: '',
  message: '',
};

export function ContactForm() {
  const reduce = useReducedMotion();
  const mountedAtRef = useRef<number>(0);
  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const [sentAt, setSentAt] = useState<Date | null>(null);
  const companyRef = useRef<HTMLInputElement>(null); // honeypot
  const enquiryNo = useMemo(randomEnquiryNo, []);

  const setField = (k: keyof Fields) => (value: string) => {
    setFields((f) => ({ ...f, [k]: value }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  function validate(f: Fields): FieldErrors {
    const e: FieldErrors = {};
    if (f.name.trim().length < 2) e.name = 'Please share your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
      e.email = 'A valid email so I can reply.';
    if (!f.projectType) e.projectType = 'Pick the closest kind.';
    if (f.message.trim().length < 10)
      e.message = 'A few more words — even a rough idea.';
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (status === 'sending') return;

    const errs = validate(fields);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;

    setStatus('sending');
    setServerError(null);

    // 2-second timing guard — real humans take longer than that to fill
    // in a form. Drop silently if anything submits faster.
    if (Date.now() - mountedAtRef.current < 2000) {
      setSentAt(new Date());
      setStatus('sent');
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setServerError(
        "Form isn't configured yet. Please use the mailto fallback below.",
      );
      setStatus('error');
      return;
    }

    // Honeypot — silently succeed if filled so bots think it worked.
    if ((companyRef.current?.value ?? '').trim().length > 0) {
      setSentAt(new Date());
      setStatus('sent');
      return;
    }

    const formData = new FormData();
    formData.append('access_key', accessKey);
    formData.append('subject', `[johnnybuildstech] ${fields.name} · ${fields.projectType}`);
    formData.append('from_name', `${fields.name} · johnnybuildstech`);
    // Web3Forms treats `email` as the Reply-To address.
    formData.append('email', fields.email);
    formData.append('Name', fields.name);
    formData.append('Email', fields.email);
    formData.append('Project type', fields.projectType);
    formData.append('Budget', fields.budget || '—');
    formData.append('Message', fields.message);
    formData.append('Source', 'johnnybuildstech.com/contact');
    // Web3Forms' own spam trap — leave empty.
    formData.append('botcheck', '');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };
      if (!res.ok || !data.success) {
        setServerError(
          data.message ??
            'Something went sideways. Try again, or use the mailto below.',
        );
        setStatus('error');
        return;
      }
      setSentAt(new Date());
      setStatus('sent');
    } catch {
      setServerError(
        'The internet blinked. Please try again, or email directly.',
      );
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return <SentReceipt name={fields.name} at={sentAt} enquiryNo={enquiryNo} />;
  }

  const disabled = status === 'sending';

  return (
    <motion.form
      onSubmit={onSubmit}
      noValidate
      initial={reduce ? undefined : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease, delay: 0.1 }}
      className="relative"
    >
      <PaperSheet>
        {/* header strip */}
        <div className="relative flex flex-wrap items-baseline justify-between gap-3 pb-3">
          <span
            className="font-mono text-[10.5px] uppercase tracking-[0.3em]"
            style={{ color: 'var(--color-gold-dim)' }}
          >
            ─ enquiry no. {enquiryNo}
          </span>
          <span
            className="font-mono text-[10.5px] uppercase tracking-[0.28em]"
            style={{ color: 'var(--color-gold-dim)' }}
          >
            received{' '}
            <time suppressHydrationWarning>
              {new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </time>
          </span>
        </div>
        <span
          aria-hidden
          className="relative block h-px w-full"
          style={{ background: 'var(--color-gold)', opacity: 0.7 }}
        />

        {/* letterhead */}
        <div className="relative mt-10 mb-12">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.3em]"
            style={{ color: 'var(--color-gold-dim)' }}
          >
            ─ intake form
          </p>
          <h2
            className="mt-4 font-serif font-medium leading-[0.98] tracking-[-0.02em] text-ink"
            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}
          >
            tell me about it,{' '}
            <span
              className="font-hand font-normal"
              style={{
                color: 'var(--color-accent)',
                fontSize: '0.72em',
                display: 'inline-block',
                transform: 'rotate(-4deg) translateY(-0.04em)',
              }}
            >
              in your own words
            </span>
            .
          </h2>
          <p className="mt-5 max-w-[52ch] font-serif italic text-[16px] leading-[1.5] text-ink-muted md:text-[18px]">
            Fill the lines. I&rsquo;ll read every word and reply from a real
            inbox.
          </p>
        </div>

        {/* honeypot — visually hidden but present for bots */}
        <label className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          Company
          <input
            ref={companyRef}
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>

        {/* fields */}
        <div className="space-y-10">
          <div className="grid gap-10 md:grid-cols-2 md:gap-12">
            <RuledField
              label="Your name"
              required
              value={fields.name}
              onChange={setField('name')}
              error={errors.name}
              autoComplete="name"
              placeholder="Jane Doe"
              disabled={disabled}
            />
            <RuledField
              label="Email"
              required
              type="email"
              value={fields.email}
              onChange={setField('email')}
              error={errors.email}
              autoComplete="email"
              inputMode="email"
              placeholder="jane@studio.com"
              disabled={disabled}
            />
          </div>

          <div className="grid gap-10 md:grid-cols-2 md:gap-12">
            <RuledSelect
              label="Kind of project"
              required
              value={fields.projectType}
              onChange={setField('projectType')}
              options={PROJECT_TYPES as unknown as string[]}
              error={errors.projectType}
              placeholder="Pick one"
              disabled={disabled}
            />
            <RuledSelect
              label="Budget range"
              optional
              value={fields.budget}
              onChange={setField('budget')}
              options={BUDGETS as unknown as string[]}
              placeholder="If you know"
              disabled={disabled}
            />
          </div>

          <RuledField
            label="What you have in mind"
            required
            multiline
            value={fields.message}
            onChange={setField('message')}
            error={errors.message}
            placeholder="A sentence or a scroll — whatever helps me get the shape."
            disabled={disabled}
          />
        </div>

        {/* submit row */}
        <div className="mt-14 flex flex-wrap items-end justify-between gap-8 border-t pt-10"
          style={{ borderColor: 'rgba(196, 138, 58, 0.4)' }}
        >
          <p className="max-w-[38ch] font-serif italic text-[15px] leading-[1.55] text-ink-muted md:text-[16px]">
            Pressing send drops a note straight into my inbox. Usually replied
            to within a day or two.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <WaxSendButton disabled={disabled} status={status} />
          </div>
        </div>

        {serverError && status === 'error' && (
          <p
            role="alert"
            className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: 'var(--color-accent)' }}
          >
            × {serverError}
          </p>
        )}
      </PaperSheet>
    </motion.form>
  );
}

/* ───── Receipt state ─────────────────────────────────────── */

function SentReceipt({
  name,
  at,
  enquiryNo,
}: {
  name: string;
  at: Date | null;
  enquiryNo: string;
}) {
  const reduce = useReducedMotion();
  const stamped = at ?? new Date();
  const firstName = (name || 'friend').trim().split(/\s+/)[0];

  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={reduce ? undefined : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease }}
    >
      <PaperSheet>
        <div className="flex flex-wrap items-baseline justify-between gap-3 pb-3">
          <span
            className="font-mono text-[10.5px] uppercase tracking-[0.3em]"
            style={{ color: 'var(--color-gold-dim)' }}
          >
            ─ enquiry no. {enquiryNo}
          </span>
          <span
            className="font-mono text-[10.5px] uppercase tracking-[0.28em]"
            style={{ color: 'var(--color-gold-dim)' }}
          >
            filed{' '}
            <time suppressHydrationWarning>
              {stamped.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </time>
          </span>
        </div>
        <span
          aria-hidden
          className="block h-px w-full opacity-70"
          style={{ background: 'var(--color-gold)' }}
        />

        <div className="relative mt-10 mb-8 flex items-start justify-between gap-10">
          <div>
            <p
              className="font-mono text-[11px] uppercase tracking-[0.3em]"
              style={{ color: 'var(--color-gold-dim)' }}
            >
              ─ received
            </p>
            <h2
              className="mt-4 font-serif font-medium leading-[0.98] tracking-[-0.02em] text-ink"
              style={{ fontSize: 'clamp(34px, 5vw, 68px)' }}
            >
              thank you, {firstName}.
            </h2>

            <p className="mt-6 max-w-[48ch] text-[17px] leading-[1.65] text-ink-muted md:text-[18px]">
              Your note just landed in my actual inbox. I read every enquiry
              myself and reply within a day or two — from the same email
              address I use for my morning coffee orders.
            </p>

            <div
              className="mt-10 font-hand"
              style={{
                color: 'var(--color-accent)',
                fontSize: 'clamp(30px, 3.6vw, 48px)',
                transform: 'rotate(-3deg)',
                transformOrigin: 'left center',
                lineHeight: 1,
                display: 'inline-block',
              }}
            >
              &mdash; Jonathan
            </div>
            <p
              className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.28em]"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              jonathan · johnnybuildstech
            </p>
          </div>

          <ReceivedStamp when={stamped} />
        </div>

        <div
          className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6 font-mono text-[10.5px] uppercase tracking-[0.28em]"
          style={{
            borderColor: 'rgba(196, 138, 58, 0.4)',
            color: 'var(--color-gold-dim)',
          }}
        >
          <span>filed &middot; johnnybuildstech · sole prop.</span>
          <span>
            sent to jonathan &middot; reply from a real inbox
          </span>
        </div>
      </PaperSheet>
    </motion.div>
  );
}

function ReceivedStamp({ when }: { when: Date }) {
  return (
    <div
      aria-hidden
      className="relative shrink-0 select-none"
      style={{
        width: 150,
        height: 150,
        transform: 'rotate(-8deg)',
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: '2.5px solid var(--color-accent)',
          opacity: 0.82,
          boxShadow: 'inset 0 0 0 1px rgba(184, 66, 31, 0.3)',
        }}
      />
      <div
        className="absolute inset-[14px] rounded-full"
        style={{ border: '1px solid var(--color-accent)', opacity: 0.55 }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-serif font-semibold italic"
          style={{
            color: 'var(--color-accent)',
            fontSize: 30,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          received
        </span>
        <span
          className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.3em]"
          style={{ color: 'var(--color-accent)' }}
        >
          {when.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      </div>
      {/* tiny ink splatter dots */}
      <span
        className="absolute h-1 w-1 rounded-full"
        style={{
          top: -6,
          left: 40,
          background: 'var(--color-accent)',
          opacity: 0.6,
        }}
      />
      <span
        className="absolute h-[3px] w-[3px] rounded-full"
        style={{
          bottom: 8,
          right: 18,
          background: 'var(--color-accent)',
          opacity: 0.5,
        }}
      />
    </div>
  );
}

/* ───── Paper sheet frame ─────────────────────────────────── */

function PaperSheet({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative overflow-hidden px-7 pb-12 pt-10 md:px-12 md:pb-16 md:pt-12"
      style={{
        background: 'var(--color-bg-deep)',
        borderRadius: 18,
        boxShadow:
          '0 1px 0 rgba(122, 91, 63, 0.1), 0 40px 80px -44px rgba(44, 29, 18, 0.4), 0 10px 22px -12px rgba(44, 29, 18, 0.12), inset 0 0 0 1px rgba(196, 138, 58, 0.45)',
      }}
    >
      {/* corner marks */}
      {(
        [
          'top-3 left-3 border-t border-l',
          'top-3 right-3 border-t border-r',
          'bottom-3 left-3 border-b border-l',
          'bottom-3 right-3 border-b border-r',
        ] as const
      ).map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={`pointer-events-none absolute h-3 w-3 ${pos}`}
          style={{ borderColor: 'var(--color-gold)' }}
        />
      ))}
      {/* paper grain */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.17 0 0 0 0 0.11 0 0 0 0 0.07 0 0 0 0.25 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: '220px',
          borderRadius: 'inherit',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ───── Ruled input (not a box — a line to write on) ──────── */

type RuledFieldProps = {
  label: string;
  required?: boolean;
  multiline?: boolean;
  type?: 'text' | 'email';
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'email';
  disabled?: boolean;
};

function RuledField({
  label,
  required,
  multiline,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  inputMode,
  disabled,
}: RuledFieldProps) {
  const id = useId();
  const errId = `${id}-err`;
  const common =
    'w-full bg-transparent py-2 text-[18px] leading-[1.5] text-ink placeholder:text-ink-muted/45 focus:outline-none';

  return (
    <div>
      <RuledLabel id={id} required={required}>{label}</RuledLabel>
      <div
        className="relative"
        style={{ borderBottom: `1px solid ${error ? 'var(--color-accent)' : 'rgba(196, 138, 58, 0.55)'}` }}
      >
        {multiline ? (
          <textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            aria-invalid={!!error}
            aria-describedby={error ? errId : undefined}
            rows={5}
            disabled={disabled}
            className={`${common} resize-none font-serif`}
            style={{ fontSize: 20, lineHeight: 1.6 }}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            autoComplete={autoComplete}
            inputMode={inputMode}
            aria-invalid={!!error}
            aria-describedby={error ? errId : undefined}
            disabled={disabled}
            required={required}
            className={`${common} font-serif`}
            style={{ fontSize: 20 }}
          />
        )}

        {/* focused underline accent */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 transition-transform duration-300"
          style={{ background: 'var(--color-accent)' }}
          data-focus-ring
        />
      </div>
      <FieldError id={errId} error={error} />
    </div>
  );
}

function RuledSelect({
  label,
  required,
  optional,
  value,
  onChange,
  options,
  placeholder,
  error,
  disabled,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}) {
  const id = useId();
  const errId = `${id}-err`;

  return (
    <div>
      <RuledLabel id={id} required={required} optional={optional}>
        {label}
      </RuledLabel>
      <div
        className="relative"
        style={{
          borderBottom: `1px solid ${error ? 'var(--color-accent)' : 'rgba(196, 138, 58, 0.55)'}`,
        }}
      >
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? errId : undefined}
          disabled={disabled}
          required={required}
          className="w-full cursor-pointer appearance-none bg-transparent py-2 pr-10 font-serif text-[18px] text-ink focus:outline-none disabled:cursor-not-allowed md:text-[20px]"
        >
          <option value="" disabled hidden>
            {placeholder ?? 'Pick one'}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 font-mono text-[10.5px] uppercase tracking-[0.3em]"
          style={{ color: 'var(--color-gold-dim)' }}
        >
          ▾
        </span>
      </div>
      <FieldError id={errId} error={error} />
    </div>
  );
}

function RuledLabel({
  id,
  children,
  required,
  optional,
}: {
  id: string;
  children: ReactNode;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className="mb-2 flex items-baseline justify-between font-mono text-[10.5px] uppercase tracking-[0.28em]"
      style={{ color: 'var(--color-gold-dim)' }}
    >
      <span>{children}</span>
      {required && (
        <span style={{ color: 'var(--color-accent)' }}>·required·</span>
      )}
      {optional && <span style={{ opacity: 0.7 }}>·optional·</span>}
    </label>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  return (
    <AnimatePresence>
      {error ? (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease }}
          className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.22em]"
          style={{ color: 'var(--color-accent)' }}
        >
          × {error}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

/* ───── Wax-seal send button ──────────────────────────────── */

function WaxSendButton({
  disabled,
  status,
}: {
  disabled?: boolean;
  status: 'idle' | 'sending' | 'sent' | 'error';
}) {
  const label =
    status === 'sending'
      ? 'sending…'
      : status === 'error'
        ? 'try again'
        : 'send it';

  return (
    <button
      type="submit"
      disabled={disabled}
      className="group relative inline-flex items-center gap-3 rounded-full px-7 py-4 font-mono text-[12px] uppercase tracking-[0.22em] transition-[transform,box-shadow] duration-200 hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-80"
      style={{
        background:
          'radial-gradient(60% 60% at 35% 30%, #D15B35 0%, #B8421F 50%, #8E2E13 100%)',
        color: 'var(--color-bg)',
        boxShadow:
          '0 1px 0 rgba(149, 53, 25, 0.5), 0 16px 28px -10px rgba(184, 66, 31, 0.55), inset 0 1px 2px rgba(255, 220, 200, 0.25), inset 0 -2px 4px rgba(0, 0, 0, 0.25)',
      }}
    >
      <span
        aria-hidden
        className="relative flex h-2 w-2"
      >
        {status !== 'sending' ? (
          <>
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
              style={{ background: 'var(--color-bg)' }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: 'var(--color-bg)' }}
            />
          </>
        ) : (
          <span
            className="relative inline-flex h-2 w-2 animate-spin rounded-full border-2"
            style={{
              borderColor: 'var(--color-bg)',
              borderTopColor: 'transparent',
            }}
          />
        )}
      </span>
      {label}
      <span
        aria-hidden
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      >
        →
      </span>
    </button>
  );
}

/* ───── helpers ─────────────────────────────────────────── */

function randomEnquiryNo() {
  const n = Math.floor(100 + Math.random() * 899);
  return `0${n}`;
}
