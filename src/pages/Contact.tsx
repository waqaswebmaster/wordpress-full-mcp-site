import { useState } from 'react'
import type { FormEvent } from 'react'
import { FadeIn } from '../components/FadeIn'
import { Seo } from '../components/Seo'
import { CheckCircle2, Mail, MessageSquare } from 'lucide-react'

export function Contact() {
  const [sent, setSent] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`WordPress Full MCP — from ${name || 'visitor'}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    )
    window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <Seo
        title="Contact"
        description="Contact the WordPress Full MCP team about setup, integrations, or feedback."
        path="/contact"
      />
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <FadeIn>
          <p className="font-display text-sm font-bold tracking-[0.12em] text-signal uppercase">
            Contact
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.035em] text-ink sm:text-5xl">
            Talk to us about the plugin.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-slate">
            Questions about setup, enterprise use, or contributing? Send a note
            — we read every message.
          </p>

          <ul className="mt-10 space-y-5">
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-signal/10 text-signal">
                <Mail size={18} />
              </span>
              <div>
                <p className="font-medium text-ink">Email</p>
                <p className="text-slate">hello@example.com</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-signal/10 text-signal">
                <MessageSquare size={18} />
              </span>
              <div>
                <p className="font-medium text-ink">Docs first</p>
                <p className="text-slate">
                  Most setup answers live in the documentation — start there for
                  install and connecting any MCP client.
                </p>
              </div>
            </li>
          </ul>
        </FadeIn>

        <FadeIn delay={0.08}>
          {sent ? (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-mist bg-fog px-8 text-center">
              <CheckCircle2 className="text-signal" size={36} />
              <p className="mt-4 font-display text-xl font-semibold text-ink">
                Your mail client should open next
              </p>
              <p className="mt-2 max-w-sm text-slate">
                If it did not, email us directly at hello@example.com with your
                question.
              </p>
              <button
                type="button"
                className="mt-6 text-sm font-semibold text-signal"
                onClick={() => setSent(false)}
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-mist bg-paper p-6 shadow-[0_1px_0_rgba(12,18,34,0.04)] sm:p-8"
            >
              <label className="block">
                <span className="text-sm font-medium text-ink">Name</span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-mist bg-fog px-3.5 py-2.5 text-ink outline-none transition-colors focus:border-signal"
                  placeholder="Your name"
                />
              </label>
              <label className="mt-4 block">
                <span className="text-sm font-medium text-ink">Email</span>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-mist bg-fog px-3.5 py-2.5 text-ink outline-none transition-colors focus:border-signal"
                  placeholder="you@company.com"
                />
              </label>
              <label className="mt-4 block">
                <span className="text-sm font-medium text-ink">Message</span>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1.5 w-full resize-y rounded-md border border-mist bg-fog px-3.5 py-2.5 text-ink outline-none transition-colors focus:border-signal"
                  placeholder="How can we help?"
                />
              </label>
              <button
                type="submit"
                className="mt-6 w-full rounded-md bg-ink px-5 py-3 text-[0.95rem] font-semibold text-paper transition-colors hover:bg-ink-soft"
              >
                Send message
              </button>
              <p className="mt-3 text-center text-xs text-slate">
                Opens your email client — no data is stored on this site.
              </p>
            </form>
          )}
        </FadeIn>
      </div>
    </div>
  )
}
