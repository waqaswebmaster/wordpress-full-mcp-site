import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Shield,
  Layers,
  Undo2,
  Terminal,
  ShoppingCart,
  Plug,
  KeyRound,
} from 'lucide-react'
import { FadeIn } from '../components/FadeIn'
import { CodeBlock } from '../components/CodeBlock'
import { AmbientBackground } from '../components/AmbientBackground'
import { ClientMarquee } from '../components/ClientMarquee'
import { CountUp } from '../components/CountUp'
import { GatewayPanel } from '../components/GatewayPanel'
import { FaqSection } from '../components/FaqSection'
import { Seo } from '../components/Seo'
import { mcpConfigDirect } from '../data/content'

const features = [
  {
    icon: Plug,
    title: 'Works with any MCP client',
    body: 'One HTTP endpoint and a Bearer key. Claude Desktop, Cursor, Copilot, Windsurf, Continue, Cline, Zed, or a custom agent — same connector.',
  },
  {
    icon: Terminal,
    title: 'Deep WordPress surface',
    body: 'Content, media, users, comments, plugins, themes, options, and files — callable as tools, not admin clicks.',
  },
  {
    icon: ShoppingCart,
    title: 'Commerce & builders',
    body: 'WooCommerce products and orders, Elementor documents and structure, SEO meta, ACF fields, cache flush when those plugins are present.',
  },
  {
    icon: Shield,
    title: 'Safe Mode / Power Mode',
    body: 'Destructive work stays blocked until you allow it. Power Mode unlocks installs, file writes, and deep Elementor edits.',
  },
  {
    icon: Undo2,
    title: 'Checkpoints',
    body: 'Snapshot files, posts, and options before risky changes. File writes auto-checkpoint so you can roll back.',
  },
  {
    icon: Layers,
    title: 'Gateway, not a dump',
    body: 'Agents discover tools by domain, then run them. A small public surface keeps large catalogs usable.',
  },
]

const steps = [
  {
    title: 'Install on the site',
    body: 'Upload the plugin ZIP, activate it, open Settings → WordPress Full MCP.',
  },
  {
    title: 'Issue a key',
    body: 'Create an API key once, copy it, leave Safe Mode on until you need more reach.',
  },
  {
    title: 'Point any MCP client',
    body: 'Paste the endpoint URL and Authorization header. Verify with site_info.',
  },
]

const faqs = [
  {
    question: 'How is this different from a generic WordPress REST setup?',
    answer:
      'It speaks Model Context Protocol over HTTP with a tool registry built for agents: discover, schema lookup, run, and batch — plus Safe Mode, Power Mode, audit logging, and checkpoints. You are not wiring every REST route by hand.',
  },
  {
    question: 'What do Safe Mode and Power Mode actually change?',
    answer:
      'Safe Mode blocks deletes, theme switches, file writes, and DB search-replace. Power Mode is required for plugin install, deep Elementor writes, user create/update, and similar high-impact tools. You can use both together.',
  },
  {
    question: 'Why does the agent use wpmcp_discover and wpmcp_run?',
    answer:
      'Listing 70+ tools at once overwhelms many clients. A small public gateway stays in tools/list; the agent searches by domain or keyword, then executes through wpmcp_run.',
  },
  {
    question: 'What if /wp-json/ returns 404 on my host?',
    answer:
      'Use the fallback URL with ?rest_route=/wpmcp/v1/mcp, or flush permalinks under Settings → Permalinks. The plugin is fine; the host rewrite rules may not be.',
  },
  {
    question: 'Can I undo a bad agent edit?',
    answer:
      'Yes. Checkpoints snapshot files, posts (including Elementor data), and options. File writes create a checkpoint automatically before overwrite. Restore with checkpoint_restore when Power Mode allows it.',
  },
  {
    question: 'Which WordPress version do I need?',
    answer:
      'WordPress 6.4+ and PHP 7.4+. No Abilities API requirement — this plugin ships its own transport and registry.',
  },
  {
    question: 'Is Cursor required?',
    answer:
      'No. Cursor is one MCP client. The same URL and Bearer key work with Claude Desktop and any other MCP-capable tool that supports remote HTTP servers.',
  },
]

export function Home() {
  return (
    <>
      <Seo
        title="Full-control MCP server for WordPress"
        description="WordPress Full MCP is a plugin that exposes your site as a secure MCP endpoint. Connect any MCP-capable AI to content, WooCommerce, Elementor, files, and more — with Safe Mode, audits, and checkpoints."
        path="/"
      />

      <section className="relative overflow-hidden">
        <AmbientBackground />
        <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20">
          <FadeIn>
            <p className="font-display text-sm font-bold tracking-[0.14em] text-signal uppercase">
              WordPress Full MCP
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.045em] text-ink sm:text-[3.6rem]">
              Turn WordPress into an{' '}
              <span className="bg-gradient-to-r from-signal via-signal-bright to-glow bg-clip-text text-transparent">
                MCP endpoint
              </span>{' '}
              any agent can use.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate">
              Install the plugin, issue a key, and give MCP-capable assistants
              real site control — content, commerce, page builders, files —
              behind Safe Mode, rate limits, and rollback.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/docs/install"
                className="btn-shine inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3.5 text-[0.95rem] font-semibold text-paper shadow-[0_14px_32px_-16px_rgba(10,15,28,0.65)] transition-transform hover:-translate-y-0.5 hover:bg-ink-soft"
              >
                Install the plugin
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/docs/connect-cursor"
                className="inline-flex items-center gap-2 rounded-lg border border-mist bg-paper/90 px-5 py-3.5 text-[0.95rem] font-semibold text-ink transition-all hover:border-signal/30"
              >
                Connect a client
              </Link>
            </div>
            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate">
              <span className="inline-flex items-center gap-1.5">
                <KeyRound size={14} className="text-signal" />
                Bearer API keys
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Shield size={14} className="text-signal" />
                Safe Mode default
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Layers size={14} className="text-signal" />
                Discover → run gateway
              </span>
            </p>
          </FadeIn>

          <FadeIn delay={0.12} className="mt-12">
            <GatewayPanel />
          </FadeIn>
        </div>
      </section>

      <ClientMarquee />

      <section className="border-b border-mist bg-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-3">
          {[
            { value: 70, suffix: '+', label: 'Registered tools' },
            { value: 1, display: 'HTTP', label: 'Native MCP transport' },
            { value: 0, display: 'Any', label: 'MCP-compatible client' },
          ].map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.05}>
              <p className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                {stat.display ? (
                  stat.display
                ) : (
                  <CountUp value={stat.value} suffix={stat.suffix} />
                )}
              </p>
              <p className="mt-2 text-slate">{stat.label}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <FadeIn>
          <p className="font-display text-sm font-bold tracking-[0.12em] text-signal uppercase">
            Built for operators
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-[2rem] font-bold tracking-[-0.035em] text-ink sm:text-4xl">
            Full control when you need it. Brakes when you do not.
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.05}>
              <div className="feature-tile h-full rounded-2xl border border-mist bg-paper p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-signal/15 to-glow/10 text-signal">
                  <f.icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">
                  {f.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-slate">
                  {f.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-mist bg-fog">
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <FadeIn>
            <p className="font-display text-sm font-bold tracking-[0.12em] text-signal uppercase">
              Setup
            </p>
            <h2 className="mt-3 max-w-xl font-display text-[2rem] font-bold tracking-[-0.035em] text-ink sm:text-4xl">
              From ZIP to first tool call.
            </h2>
          </FadeIn>

          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.08}>
                <li className="relative h-full rounded-2xl border border-mist/80 bg-paper/90 p-6">
                  <span className="font-mono text-sm font-medium text-signal">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-slate">
                    {step.body}
                  </p>
                </li>
              </FadeIn>
            ))}
          </ol>

          <FadeIn className="mt-14" delay={0.1}>
            <p className="mb-3 text-sm font-medium text-slate">
              Drop-in MCP server config
            </p>
            <CodeBlock code={mcpConfigDirect} filename="mcp.json" />
          </FadeIn>
        </div>
      </section>

      <FaqSection
        items={faqs}
        title="Questions people actually ask"
        eyebrow="FAQ"
      />

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-24">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-14 sm:px-14">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-40"
              style={{
                background:
                  'radial-gradient(circle, rgba(61,214,181,0.35), transparent 70%)',
              }}
            />
            <h2 className="relative max-w-lg font-display text-[2rem] font-bold tracking-[-0.035em] text-paper sm:text-4xl">
              Ship the connector. Keep the keys.
            </h2>
            <p className="relative mt-4 max-w-md text-[1.05rem] leading-relaxed text-white/55">
              One plugin on your WordPress site. Any MCP client you already
              trust. Guardrails you can tune.
            </p>
            <div className="relative mt-9 flex flex-wrap gap-3">
              <Link
                to="/docs/install"
                className="btn-shine inline-flex items-center gap-2 rounded-lg bg-signal px-5 py-3.5 text-[0.95rem] font-semibold text-paper transition-transform hover:-translate-y-0.5 hover:bg-signal-bright"
              >
                Get started
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/docs"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3.5 text-[0.95rem] font-semibold text-paper transition-colors hover:border-white/35"
              >
                Read the docs
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  )
}
