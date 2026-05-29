import Link from 'next/link';
import { Moon } from './Moon';

export function LightsOutNav() {
  return (
    <nav className="lo-nav">
      <div className="lo-wrap row">
        <Link className="lo-brand" href="/apps/lightsout#top">
          <Moon size={26} phase="crescent" />
          <span>
            lights&nbsp;<b>out</b>
          </span>
        </Link>
        <div className="lo-navlinks">
          <a href="#how">how it works</a>
          <a href="#features">features</a>
          <a href="#privacy">privacy</a>
          <a href="#pricing">pricing</a>
          <a href="#faq">faq</a>
        </div>
        <a className="pill" href="#waitlist">
          join the waitlist
        </a>
      </div>
    </nav>
  );
}
