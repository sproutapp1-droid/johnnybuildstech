'use client';

/* Waitlist capture, wired to Tally (form Y5k41B).
 *
 * A single pill button opens the Tally popup; the user types their
 * email inside the Tally modal. We listen for Tally's FormSubmitted
 * postMessage and swap to the quiet success line. Mirrors the pebble
 * integration; embed.js is loaded once in the route layout. */

const TALLY_FORM_ID = 'Y5k41B';

import { useEffect, useState } from 'react';

type Status = 'idle' | 'opening' | 'ok';

type TallyApi = {
  openPopup: (
    formId: string,
    options?: {
      layout?: 'modal' | 'drawer-left' | 'drawer-right';
      width?: number;
      hideTitle?: boolean;
      overlay?: boolean;
      onClose?: () => void;
      onSubmit?: (payload: unknown) => void;
    },
  ) => void;
};

function getTally(): TallyApi | undefined {
  return (globalThis as unknown as { Tally?: TallyApi }).Tally;
}

export function WaitlistForm({
  surface = 'hero',
  cta = 'join the waitlist',
}: {
  surface?: 'hero' | 'footer';
  cta?: string;
}) {
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const data = typeof e.data === 'string' ? e.data : '';
      if (data.includes('Tally.FormSubmitted')) setStatus('ok');
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  function open() {
    const tally = getTally();
    if (!tally?.openPopup) {
      setTimeout(open, 250);
      return;
    }
    setStatus('opening');
    tally.openPopup(TALLY_FORM_ID, {
      layout: 'modal',
      width: 500,
      hideTitle: false,
      overlay: true,
      onSubmit: () => setStatus('ok'),
      onClose: () => setStatus((s) => (s === 'ok' ? 'ok' : 'idle')),
    });
  }

  const isFooter = surface === 'footer';

  if (status === 'ok') {
    return (
      <div className={`waitlist${isFooter ? ' center' : ''}`}>
        <p className="ok">
          {isFooter
            ? 'you’re on the list. sleep well.'
            : 'you’re on the list. one quiet email when it goes live. that’s all.'}
        </p>
      </div>
    );
  }

  return (
    <div className={`waitlist${isFooter ? ' center' : ''}`}>
      <button
        type="button"
        className="pill"
        onClick={open}
        disabled={status === 'opening'}
        aria-label="join the waitlist"
      >
        {status === 'opening' ? 'opening…' : cta}
      </button>
      {!isFooter && (
        <p className="sub">one email at launch. no newsletter, no drip. then we delete your address.</p>
      )}
    </div>
  );
}
