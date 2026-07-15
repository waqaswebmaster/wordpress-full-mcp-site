import { Link } from 'react-router-dom'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-mist bg-fog">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-slate">
            A WordPress plugin that turns your site into an open MCP connector
            for any AI client — with safe mode, audit logs, and checkpoints
            built in.
          </p>
        </div>

        <div>
          <p className="font-display text-sm font-bold tracking-wide text-ink">
            Product
          </p>
          <ul className="mt-3 space-y-2 text-[0.95rem] text-slate">
            <li>
              <Link to="/" className="hover:text-ink">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-ink">
                About
              </Link>
            </li>
            <li>
              <Link to="/docs" className="hover:text-ink">
                Documentation
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-ink">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-bold tracking-wide text-ink">
            Docs
          </p>
          <ul className="mt-3 space-y-2 text-[0.95rem] text-slate">
            <li>
              <Link to="/docs/install" className="hover:text-ink">
                Installation
              </Link>
            </li>
            <li>
              <Link to="/docs/connect-cursor" className="hover:text-ink">
                Connect any AI
              </Link>
            </li>
            <li>
              <Link to="/docs/security" className="hover:text-ink">
                Security modes
              </Link>
            </li>
            <li>
              <Link to="/docs/tools" className="hover:text-ink">
                Tool catalog
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-mist">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-sm text-slate sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} WordPress Full MCP</p>
          <p className="font-mono text-xs">v1.1.0 · GPL-2.0-or-later</p>
        </div>
      </div>
    </footer>
  )
}
