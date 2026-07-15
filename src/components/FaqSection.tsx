import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FadeIn } from './FadeIn'

export type FaqItem = {
  question: string
  answer: string
}

type FaqSectionProps = {
  items: FaqItem[]
  title?: string
  eyebrow?: string
}

export function FaqSection({
  items,
  title = 'Frequently asked questions',
  eyebrow = 'FAQ',
}: FaqSectionProps) {
  const [open, setOpen] = useState<number | null>(0)
  const reduce = useReducedMotion()
  const baseId = useId()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section className="border-t border-mist bg-paper" aria-labelledby={`${baseId}-heading`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
        <FadeIn>
          <p className="font-display text-sm font-bold tracking-[0.12em] text-signal uppercase">
            {eyebrow}
          </p>
          <h2
            id={`${baseId}-heading`}
            className="mt-3 font-display text-[2rem] font-bold tracking-[-0.035em] text-ink sm:text-4xl"
          >
            {title}
          </h2>
        </FadeIn>

        <div className="mt-10 divide-y divide-mist rounded-2xl border border-mist bg-fog/40">
          {items.map((item, i) => {
            const isOpen = open === i
            const panelId = `${baseId}-panel-${i}`
            const buttonId = `${baseId}-button-${i}`
            return (
              <FadeIn key={item.question} delay={i * 0.03}>
                <div>
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[1.02rem] font-semibold text-ink transition-colors hover:text-signal sm:px-6 sm:py-5"
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      {item.question}
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-slate transition-transform duration-300 ${isOpen ? 'rotate-180 text-signal' : ''}`}
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-[0.98rem] leading-relaxed text-slate sm:px-6 sm:pb-6">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
