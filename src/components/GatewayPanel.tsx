import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Pause, Play, Sparkles } from 'lucide-react'

type DomainId =
  | 'content'
  | 'woocommerce'
  | 'elementor'
  | 'files'
  | 'plugins'
  | 'integrations'

type PublicTool = 'site_info' | 'wpmcp_discover' | 'wpmcp_run' | 'wpmcp_batch'

type SessionView = {
  label: string
  code: string
  result: string
}

const domains: {
  id: DomainId
  tools: number
  sample: string
}[] = [
  { id: 'content', tools: 7, sample: 'posts_create, posts_search, …' },
  { id: 'woocommerce', tools: 10, sample: 'woo_products_update, woo_orders_list, …' },
  { id: 'elementor', tools: 12, sample: 'elementor_structure_get, elementor_widget_add, …' },
  { id: 'files', tools: 4, sample: 'files_read, files_write, search_replace, …' },
  { id: 'plugins', tools: 4, sample: 'plugins_list, plugins_activate, …' },
  { id: 'integrations', tools: 6, sample: 'acf_fields_get, seo_meta_update, …' },
]

const publicTools: { id: PublicTool; hint: string }[] = [
  { id: 'site_info', hint: 'Ping the site' },
  { id: 'wpmcp_discover', hint: 'Search tools' },
  { id: 'wpmcp_run', hint: 'Execute a tool' },
  { id: 'wpmcp_batch', hint: 'Run a sequence' },
]

function buildDiscover(domain: DomainId): SessionView {
  const meta = domains.find((d) => d.id === domain)!
  return {
    label: 'discover',
    code: `wpmcp_discover({ domain: "${domain}" })`,
    result: `${meta.tools} tools matched · ${meta.sample}`,
  }
}

function buildTool(tool: PublicTool, domain: DomainId, power: boolean): SessionView {
  switch (tool) {
    case 'site_info':
      return {
        label: 'site_info',
        code: `site_info()`,
        result: 'WordPress 6.7 · MCP v1.1 · safe_mode on · endpoint ok',
      }
    case 'wpmcp_discover':
      return buildDiscover(domain)
    case 'wpmcp_run':
      return {
        label: 'run',
        code:
          domain === 'elementor'
            ? `wpmcp_run({ tool: "elementor_structure_get", args: { id: 24 } })`
            : domain === 'woocommerce'
              ? `wpmcp_run({ tool: "woo_products_list", args: { limit: 10 } })`
              : `wpmcp_run({ tool: "posts_create", args: { title: "Hello MCP" } })`,
        result:
          domain === 'elementor'
            ? 'structure tree · 14 nodes · 3 containers'
            : domain === 'woocommerce'
              ? '10 products · 2s · audited'
              : 'created post #4821 · checkpoint: none',
      }
    case 'wpmcp_batch':
      return {
        label: 'batch',
        code: power
          ? `wpmcp_batch([
  { tool: "cache_flush" },
  { tool: "files_write", args: { path: "…" } }
])`
          : `wpmcp_batch([
  { tool: "cache_flush" },
  { tool: "health_check" }
])`,
        result: power
          ? '1/2 ok · files_write needs power_mode · 96ms'
          : '2/2 ok · 184ms · audited',
      }
    default: {
      const _exhaustive: never = tool
      return _exhaustive
    }
  }
}

function useTypedText(text: string, enabled: boolean, speed = 12) {
  const [out, setOut] = useState(enabled ? '' : text)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce || !enabled) {
      setOut(text)
      return
    }
    setOut('')
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setOut(text.slice(0, i))
      if (i >= text.length) window.clearInterval(id)
    }, speed)
    return () => window.clearInterval(id)
  }, [text, enabled, speed, reduce])

  return out
}

export function GatewayPanel() {
  const reduce = useReducedMotion()
  const [domainIdx, setDomainIdx] = useState(2)
  const [session, setSession] = useState<SessionView>(() =>
    buildDiscover('elementor'),
  )
  const [safeMode, setSafeMode] = useState(true)
  const [powerMode, setPowerMode] = useState(false)
  const [autoplay, setAutoplay] = useState(true)
  const [busy, setBusy] = useState(false)
  const [pulseKey, setPulseKey] = useState(0)
  const [activeTool, setActiveTool] = useState<PublicTool | null>('wpmcp_discover')
  const idleRef = useRef<number | null>(null)

  const domain = domains[domainIdx].id
  const typedCode = useTypedText(session.code, !reduce, 8)

  const pauseAutoplayBriefly = useCallback(() => {
    setAutoplay(false)
    if (idleRef.current) window.clearTimeout(idleRef.current)
    idleRef.current = window.setTimeout(() => setAutoplay(true), 8000)
  }, [])

  const runSession = useCallback(
    (next: SessionView, tool: PublicTool | null = null) => {
      setBusy(true)
      setPulseKey((k) => k + 1)
      setActiveTool(tool)
      window.setTimeout(() => {
        setSession(next)
        setBusy(false)
      }, reduce ? 0 : 180)
    },
    [reduce],
  )

  const pickDomain = (index: number) => {
    pauseAutoplayBriefly()
    setDomainIdx(index)
    runSession(buildDiscover(domains[index].id), 'wpmcp_discover')
  }

  const pickTool = (tool: PublicTool) => {
    pauseAutoplayBriefly()
    runSession(buildTool(tool, domain, powerMode), tool)
  }

  useEffect(() => {
    if (!autoplay || reduce) return
    const id = window.setInterval(() => {
      setDomainIdx((i) => {
        const next = (i + 1) % domains.length
        setSession(buildDiscover(domains[next].id))
        setActiveTool('wpmcp_discover')
        setPulseKey((k) => k + 1)
        return next
      })
    }, 3200)
    return () => window.clearInterval(id)
  }, [autoplay, reduce])

  useEffect(() => {
    return () => {
      if (idleRef.current) window.clearTimeout(idleRef.current)
    }
  }, [])

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-[0_40px_80px_-48px_rgba(15,122,102,0.65)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 50% at 80% 0%, rgba(61,214,181,0.18), transparent), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: 'auto, 24px 24px, 24px 24px',
        }}
      />

      <AnimatePresence>
        {busy && !reduce && (
          <motion.div
            key={pulseKey}
            className="pointer-events-none absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.35, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              background:
                'radial-gradient(circle at 70% 40%, rgba(61,214,181,0.25), transparent 55%)',
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="flex gap-1" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </span>
          <p className="ml-2 font-mono text-[0.7rem] text-white/45">
            gateway · /wpmcp/v1/mcp
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              pauseAutoplayBriefly()
              setSafeMode((v) => !v)
            }}
            className={`rounded-md px-2 py-1 font-mono text-[0.65rem] transition-all ${
              safeMode
                ? 'bg-signal/25 text-glow ring-1 ring-glow/40'
                : 'bg-white/5 text-white/35 hover:bg-white/10'
            }`}
            aria-pressed={safeMode}
          >
            safe_mode {safeMode ? 'on' : 'off'}
          </button>
          <button
            type="button"
            onClick={() => {
              pauseAutoplayBriefly()
              const next = !powerMode
              setPowerMode(next)
              if (activeTool === 'wpmcp_batch') {
                runSession(buildTool('wpmcp_batch', domain, next), 'wpmcp_batch')
              }
            }}
            className={`rounded-md px-2 py-1 font-mono text-[0.65rem] transition-all ${
              powerMode
                ? 'bg-warn/30 text-[#ffb38a] ring-1 ring-warn/40'
                : 'bg-white/5 text-white/35 hover:bg-white/10'
            }`}
            aria-pressed={powerMode}
          >
            power_mode {powerMode ? 'on' : 'off'}
          </button>
          <button
            type="button"
            onClick={() => setAutoplay((v) => !v)}
            className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 font-mono text-[0.65rem] text-white/50 transition-colors hover:bg-white/10 hover:text-white/80"
            aria-label={autoplay ? 'Pause autoplay' : 'Resume autoplay'}
          >
            {autoplay ? <Pause size={11} /> : <Play size={11} />}
            {autoplay ? 'live' : 'paused'}
          </button>
        </div>
      </div>

      <div className="relative grid gap-0 sm:grid-cols-[0.95fr_1.05fr]">
        <div className="border-b border-white/10 p-4 sm:border-b-0 sm:border-r sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-[0.65rem] uppercase tracking-wider text-white/35">
              Domains
            </p>
            <span className="inline-flex items-center gap-1 font-mono text-[0.6rem] text-white/30">
              <Sparkles size={10} />
              click to explore
            </span>
          </div>
          <ul className="mt-3 flex flex-wrap gap-2">
            {domains.map((d, i) => {
              const active = i === domainIdx
              return (
                <li key={d.id}>
                  <motion.button
                    type="button"
                    whileTap={reduce ? undefined : { scale: 0.94 }}
                    whileHover={reduce ? undefined : { y: -1 }}
                    onClick={() => pickDomain(i)}
                    className={`rounded-md border px-2.5 py-1.5 font-mono text-[0.72rem] transition-colors ${
                      active
                        ? 'border-glow/50 bg-signal/25 text-glow shadow-[0_0_18px_rgba(61,214,181,0.25)]'
                        : 'border-white/10 text-white/45 hover:border-white/25 hover:text-white/80'
                    }`}
                    aria-pressed={active}
                  >
                    {d.id}
                  </motion.button>
                </li>
              )
            })}
          </ul>

          <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-wider text-white/35">
            Public surface
          </p>
          <ul className="mt-2 space-y-1">
            {publicTools.map((t) => {
              const active = activeTool === t.id
              return (
                <li key={t.id}>
                  <motion.button
                    type="button"
                    whileTap={reduce ? undefined : { scale: 0.985 }}
                    onClick={() => pickTool(t.id)}
                    className={`group flex w-full items-center justify-between gap-2 rounded-lg border px-2.5 py-2 text-left font-mono text-[0.75rem] transition-colors ${
                      active
                        ? 'border-glow/40 bg-signal/15 text-glow'
                        : 'border-transparent text-white/55 hover:border-white/10 hover:bg-white/5 hover:text-white/85'
                    }`}
                    aria-pressed={active}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-colors ${
                          active ? 'bg-glow pulse-dot' : 'bg-signal/50'
                        }`}
                      />
                      {t.id}
                    </span>
                    <span className="text-[0.62rem] text-white/25 group-hover:text-white/40">
                      {t.hint}
                    </span>
                  </motion.button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[0.65rem] uppercase tracking-wider text-white/35">
              Session
            </p>
            <AnimatePresence mode="wait">
              <motion.span
                key={session.label}
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                className="rounded-full border border-glow/30 bg-signal/10 px-2 py-0.5 font-mono text-[0.62rem] text-glow"
              >
                {session.label}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="mt-3 min-h-[11rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${session.label}-${session.code}`}
                initial={reduce ? false : { opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={reduce ? undefined : { opacity: 0, y: -8, filter: 'blur(4px)' }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mb-2 font-mono text-[0.68rem] text-glow">
                  → {session.label}
                </p>
                <pre className="min-h-[4.5rem] overflow-x-auto rounded-lg border border-white/10 bg-black/35 p-3 font-mono text-[0.78rem] leading-relaxed text-[#c8d4e0]">
                  {typedCode}
                  {!reduce && typedCode.length < session.code.length && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="inline-block w-1.5 bg-glow align-middle"
                    >
                      &nbsp;
                    </motion.span>
                  )}
                </pre>
                <motion.p
                  initial={reduce ? false : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduce ? 0 : 0.25 }}
                  className="mt-3 flex items-start gap-2 font-mono text-[0.72rem] text-white/55"
                >
                  <span className="mt-0.5 text-glow">←</span>
                  {session.result}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 flex gap-1.5">
            {publicTools.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => pickTool(t.id)}
                className="group relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"
                aria-label={`Run ${t.id}`}
              >
                <motion.span
                  className="absolute inset-y-0 left-0 rounded-full bg-glow"
                  initial={false}
                  animate={{
                    width: activeTool === t.id ? '100%' : '0%',
                    opacity: activeTool === t.id ? 1 : 0.35,
                  }}
                  transition={{ duration: 0.35 }}
                />
              </button>
            ))}
          </div>
          <p className="mt-3 font-mono text-[0.65rem] text-white/30">
            Try domains, tools, and mode toggles — this is a live demo of the
            gateway flow.
          </p>
        </div>
      </div>
    </div>
  )
}
