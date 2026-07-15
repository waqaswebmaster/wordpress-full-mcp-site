import { useEffect } from 'react'

type SeoProps = {
  title: string
  description: string
  path?: string
  type?: 'website' | 'article'
}

const SITE = 'WordPress Full MCP'
const ORIGIN = typeof window !== 'undefined' ? window.location.origin : ''

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

export function Seo({
  title,
  description,
  path = '/',
  type = 'website',
}: SeoProps) {
  useEffect(() => {
    const fullTitle = path === '/' ? `${title} | ${SITE}` : `${title} | ${SITE}`
    document.title = fullTitle

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large')
    upsertMeta('name', 'keywords', 'WordPress MCP, Model Context Protocol, AI WordPress, Claude MCP, Cursor MCP, WooCommerce AI, Elementor MCP')
    upsertMeta('name', 'author', SITE)
    upsertMeta('name', 'theme-color', '#0f7a66')

    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:site_name', SITE)
    upsertMeta('property', 'og:locale', 'en_US')

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)

    if (ORIGIN) {
      const url = `${ORIGIN}${path}`
      upsertMeta('property', 'og:url', url)
      upsertLink('canonical', url)
    }
  }, [title, description, path, type])

  return null
}
