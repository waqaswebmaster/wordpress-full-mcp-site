import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const agents = [
  { label: 'Any AI', sub: 'MCP client' },
  { label: 'Claude', sub: 'Desktop / API' },
  { label: 'Cursor', sub: 'IDE agent' },
  { label: 'Copilot', sub: 'VS Code' },
  { label: 'Windsurf', sub: 'Cascade' },
  { label: 'Custom', sub: 'your stack' },
]

export function ProtocolWire() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % agents.length)
    }, 2200)
    return () => window.clearInterval(id)
  }, [reduce])

  const agent = agents[index]

  return (
    <div
      className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-ink px-6 py-10 shadow-[0_40px_80px_-40px_rgba(15,122,102,0.55)] sm:px-10 sm:py-12"
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-50"
        style={{
          background:
            'radial-gradient(circle, rgba(61,214,181,0.25), transparent 70%)',
        }}
      />

      <div className="relative flex items-center justify-between gap-4">
        <Node label="WordPress" sub="your site" />
        <div className="relative min-h-[56px] flex-1">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 200 56"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="wireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0f7a66" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#3dd6b5" stopOpacity="1" />
                <stop offset="100%" stopColor="#0f7a66" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <line
              x1="0"
              y1="28"
              x2="200"
              y2="28"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />
            <line
              x1="0"
              y1="28"
              x2="200"
              y2="28"
              stroke="url(#wireGrad)"
              strokeWidth="2.5"
              className={reduce ? undefined : 'wire-flow'}
              strokeLinecap="round"
            />
            {!reduce && (
              <motion.circle
                r="3.5"
                fill="#3dd6b5"
                initial={{ cx: 0, cy: 28 }}
                animate={{ cx: [0, 200], cy: 28 }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <animate
                  attributeName="opacity"
                  values="0.3;1;0.3"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </motion.circle>
            )}
          </svg>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-glow/40 bg-ink-soft/90 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-glow shadow-[0_0_20px_rgba(61,214,181,0.25)] backdrop-blur-sm">
              <span
                className={`h-1.5 w-1.5 rounded-full bg-glow ${reduce ? '' : 'pulse-dot'}`}
              />
              MCP
            </span>
          </div>
        </div>
        <div className="w-[5.5rem] shrink-0 text-right sm:w-28">
          <div className="ml-auto inline-flex h-12 w-12 items-center justify-center rounded-xl border border-signal/50 bg-signal-dim/50 shadow-[0_0_24px_rgba(15,122,102,0.35)]">
            <span className="h-2.5 w-2.5 rounded-full bg-glow" />
          </div>
          <div className="relative mt-2 h-10 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={agent.label}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <p className="font-display text-sm font-semibold text-paper">
                  {agent.label}
                </p>
                <p className="font-mono text-[0.68rem] text-white/40">
                  {agent.sub}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <p className="relative mt-8 text-center font-mono text-[0.72rem] text-white/40">
        Open MCP · Bearer auth · works with any compatible client
      </p>
    </div>
  )
}

function Node({
  label,
  sub,
}: {
  label: string
  sub: string
}) {
  return (
    <div className="w-[5.5rem] shrink-0 sm:w-28">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-signal/50 bg-signal-dim/50 shadow-[0_0_24px_rgba(15,122,102,0.35)]">
        <span className="h-2.5 w-2.5 rounded-full bg-glow" />
      </div>
      <p className="mt-2 font-display text-sm font-semibold text-paper">{label}</p>
      <p className="font-mono text-[0.68rem] text-white/40">{sub}</p>
    </div>
  )
}
