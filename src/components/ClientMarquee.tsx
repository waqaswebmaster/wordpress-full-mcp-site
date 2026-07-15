const clients = [
  'Claude Desktop',
  'Cursor',
  'VS Code Copilot',
  'Windsurf',
  'Continue.dev',
  'Cline',
  'Zed',
  'Custom agents',
  'Claude Desktop',
  'Cursor',
  'VS Code Copilot',
  'Windsurf',
  'Continue.dev',
  'Cline',
  'Zed',
  'Custom agents',
]

export function ClientMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-mist bg-fog/80 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-fog to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-fog to-transparent sm:w-28" />
      <div className="marquee-track gap-10 px-6">
        {clients.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="inline-flex shrink-0 items-center gap-2 font-display text-sm font-semibold tracking-tight text-slate/80"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}
