import { FadeIn } from '../components/FadeIn'
import { AmbientBackground } from '../components/AmbientBackground'
import { Seo } from '../components/Seo'

const principles = [
  {
    title: 'Open connector, not a single-app lock-in',
    body: 'Speak standard MCP over HTTP. Plug in Claude Desktop, Cursor, Copilot, Windsurf, Continue, Cline, Zed, or any custom agent that can call an MCP server.',
  },
  {
    title: 'Agents need real control',
    body: 'Read-only demos are not enough. Agencies and builders need tools that create posts, install plugins, edit Elementor layouts, and manage WooCommerce — with clear guardrails.',
  },
  {
    title: 'Safety is a product feature',
    body: 'Safe Mode, Power Mode, HTTPS enforcement, rate limits, audit logging, and checkpoints are first-class — not afterthoughts bolted on later.',
  },
]

export function About() {
  return (
    <div className="relative overflow-hidden">
      <Seo
        title="About"
        description="WordPress Full MCP is an open MCP connector for WordPress — secure tool access for Claude, Cursor, Copilot, Windsurf, and any MCP-capable AI."
        path="/about"
      />
      <AmbientBackground />
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <FadeIn>
          <p className="font-display text-sm font-bold tracking-[0.12em] text-signal uppercase">
            About
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-[-0.04em] text-ink sm:text-5xl">
            A WordPress plugin that speaks MCP — not a single-app add-on.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            WordPress Full MCP turns your site into a secure HTTP MCP endpoint.
            Any compatible client can operate content, commerce, builders, and
            files through a discoverable tool gateway, with Safe Mode and
            checkpoints as first-class features.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 border-t border-mist pt-16 md:grid-cols-3">
          {principles.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.07}>
              <div className="feature-tile h-full rounded-2xl border border-mist bg-paper/80 p-6 backdrop-blur-sm">
                <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
                  {p.title}
                </h2>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-slate">
                  {p.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-16 rounded-3xl border border-mist bg-fog/90 px-8 py-10 sm:px-10">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
            Who it is for
          </h2>
          <ul className="mt-5 grid gap-4 text-[0.98rem] leading-relaxed text-slate sm:grid-cols-2">
            <li className="border-l-2 border-signal pl-4">
              Teams that want one WordPress connector across multiple AI tools
            </li>
            <li className="border-l-2 border-signal pl-4">
              Freelancers who want agents to draft and publish content safely
            </li>
            <li className="border-l-2 border-signal pl-4">
              WooCommerce shops that need order and product automation
            </li>
            <li className="border-l-2 border-signal pl-4">
              Builders using Elementor who want agent-assisted page edits
            </li>
          </ul>
        </FadeIn>

        <FadeIn className="mt-16 max-w-2xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
            The product in one sentence
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            Install one plugin, create an API key, point any MCP client at{' '}
            <code className="rounded-md bg-fog px-1.5 py-0.5 font-mono text-[0.9em] text-ink">
              /wpmcp/v1/mcp
            </code>
            , and give your AI full WordPress control with the brakes still on.
          </p>
        </FadeIn>
      </div>
    </div>
  )
}
