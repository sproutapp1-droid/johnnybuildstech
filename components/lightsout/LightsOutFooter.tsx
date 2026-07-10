import Link from 'next/link';
import { Moon } from './Moon';

export function LightsOutFooter() {
  return (
    <footer className="lo-foot">
      <div className="lo-wrap row">
        <div>
          <Link className="lo-brand" href="/apps/lightsout#top" style={{ fontSize: 18 }}>
            <Moon size={22} phase="crescent" />
            <span>
              lights&nbsp;<b>out</b>
            </span>
          </Link>
          <div style={{ marginTop: 8 }}>
            <Link href="/apps/lightsout/privacy">privacy</Link>
            <Link href="/apps/lightsout/support">support</Link>
            <Link href="/apps">more apps</Link>
          </div>
        </div>
        <p className="copy">a Better Days Studio app · johnnybuildstech · © 2026</p>
      </div>
    </footer>
  );
}
