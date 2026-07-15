import { Link } from 'react-router-dom'

type LogoProps = {
  className?: string
  markOnly?: boolean
}

export function Logo({ className = '', markOnly = false }: LogoProps) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 text-ink no-underline ${className}`}
      aria-label="WordPress Full MCP home"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="7" fill="#0C1222" />
        <path
          d="M8 16h6.5M17.5 16H24"
          stroke="#1A7A62"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="16" cy="16" r="2.5" fill="#F5F4F1" />
        <circle cx="8" cy="16" r="2" fill="#1A7A62" />
        <circle cx="24" cy="16" r="2" fill="#1A7A62" />
      </svg>
      {!markOnly && (
        <span className="font-display text-[1.05rem] font-bold tracking-tight leading-none">
          WordPress Full MCP
        </span>
      )}
    </Link>
  )
}
