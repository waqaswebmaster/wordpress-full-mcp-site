import { NavLink, Navigate, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { CodeBlock } from '../components/CodeBlock'
import { Seo } from '../components/Seo'
import {
  mcpConfigDirect,
  mcpConfigFallback,
  docNav,
  toolGroups,
} from '../data/content'

export function Docs() {
  const { '*': splat } = useParams()
  const slug = splat?.replace(/\/$/, '') || 'introduction'
  const [mobileOpen, setMobileOpen] = useState(false)

  const groups = useMemo(() => {
    const map = new Map<string, typeof docNav>()
    for (const item of docNav) {
      const list = map.get(item.group) ?? []
      list.push(item)
      map.set(item.group, list)
    }
    return [...map.entries()]
  }, [])

  const valid = docNav.some((d) => d.id === slug)
  if (!valid) {
    return <Navigate to="/docs/introduction" replace />
  }

  const current = docNav.find((d) => d.id === slug)!
  const idx = docNav.findIndex((d) => d.id === slug)
  const prev = idx > 0 ? docNav[idx - 1] : null
  const next = idx < docNav.length - 1 ? docNav[idx + 1] : null

  const Sidebar = (
    <nav aria-label="Documentation">
      {groups.map(([group, items]) => (
        <div key={group} className="mb-6">
          <p className="mb-2 px-2 font-display text-[0.72rem] font-bold tracking-[0.12em] text-slate uppercase">
            {group}
          </p>
          <ul className="space-y-0.5">
            {items.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={`/docs/${item.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-md px-2.5 py-2 text-[0.92rem] transition-colors ${
                      isActive
                        ? 'bg-signal/10 font-semibold text-signal'
                        : 'text-slate hover:bg-fog hover:text-ink'
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )

  return (
    <div className="border-t border-mist">
      <Seo
        title={`${current.title} — Docs`}
        description={`${current.title} documentation for WordPress Full MCP — install, connect any AI client, security, and tool reference.`}
        path={`/docs/${current.id}`}
        type="article"
      />
      <div className="mx-auto flex max-w-6xl">
        <aside className="sticky top-16 hidden h-[calc(100svh-4rem)] w-60 shrink-0 overflow-y-auto border-r border-mist px-4 py-8 md:block">
          {Sidebar}
        </aside>

        <div className="min-w-0 flex-1 px-5 py-8 sm:px-8 sm:py-10">
          <div className="mb-6 flex items-center justify-between md:hidden">
            <p className="text-sm text-slate">Docs / {current.title}</p>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-mist px-3 py-2 text-sm font-medium text-ink"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={16} />
              Menu
            </button>
          </div>

          <article className="docs-prose max-w-3xl">
            <DocBody slug={slug} />
          </article>

          <div className="mt-14 flex max-w-3xl flex-col gap-3 border-t border-mist pt-8 sm:flex-row sm:justify-between">
            {prev ? (
              <NavLink
                to={`/docs/${prev.id}`}
                className="rounded-md border border-mist px-4 py-3 text-sm text-slate hover:border-signal/40 hover:text-ink"
              >
                ← {prev.title}
              </NavLink>
            ) : (
              <span />
            )}
            {next && (
              <NavLink
                to={`/docs/${next.id}`}
                className="rounded-md border border-mist px-4 py-3 text-sm text-slate hover:border-signal/40 hover:text-ink sm:ml-auto"
              >
                {next.title} →
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            aria-label="Close docs menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[min(18rem,88vw)] overflow-y-auto bg-paper p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display font-bold text-ink">Docs</p>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            {Sidebar}
          </div>
        </div>
      )}
    </div>
  )
}

function DocBody({ slug }: { slug: string }) {
  switch (slug) {
    case 'introduction':
      return <IntroDoc />
    case 'install':
      return <InstallDoc />
    case 'connect-cursor':
      return <ConnectDoc />
    case 'how-it-works':
      return <HowDoc />
    case 'security':
      return <SecurityDoc />
    case 'checkpoints':
      return <CheckpointDoc />
    case 'tools':
      return <ToolsDoc />
    case 'troubleshooting':
      return <TroubleDoc />
    default:
      return <IntroDoc />
  }
}

function IntroDoc() {
  return (
    <>
      <h2>Introduction</h2>
      <p>
        <strong>WordPress Full MCP</strong> is a WordPress plugin that exposes
        your site as a Model Context Protocol (MCP) server over HTTP. AI agents
        in Claude, Cursor, Copilot, Windsurf, and any MCP-capable client can call
        tools to manage content, media, plugins, themes, files, WooCommerce,
        Elementor, SEO, and more.
      </p>
      <h3>What you get</h3>
      <ul>
        <li>Native MCP endpoint at <code>/wp-json/wpmcp/v1/mcp</code></li>
        <li>API key authentication (Bearer tokens)</li>
        <li>Safe Mode and Power Mode security controls</li>
        <li>Audit logging of tool calls</li>
        <li>Checkpoints for rollback of files, posts, and options</li>
        <li>A discoverable tool gateway so agents are not overwhelmed</li>
      </ul>
      <h3>Requirements</h3>
      <ul>
        <li>WordPress 6.4+</li>
        <li>PHP 7.4+</li>
        <li>HTTPS in production (can be disabled for local HTTP)</li>
        <li>An MCP-capable client (Claude Desktop, Cursor, Copilot, Windsurf, …)</li>
      </ul>
      <h3>Next steps</h3>
      <ol>
        <li>Install and activate the plugin</li>
        <li>Create an API key</li>
        <li>Connect your AI client with the config snippet</li>
        <li>Run <code>site_info</code> to verify</li>
      </ol>
    </>
  )
}

function InstallDoc() {
  return (
    <>
      <h2>Installation</h2>
      <p>
        Use the official <code>wordpress-full-mcp.zip</code> from the project
        root. WordPress expects the plugin bootstrap file at:
      </p>
      <CodeBlock
        language="text"
        filename="expected path"
        code={`wp-content/plugins/wordpress-full-mcp/wordpress-full-mcp.php`}
      />

      <h3>Upload via wp-admin</h3>
      <ol>
        <li>Go to <strong>Plugins → Add New → Upload Plugin</strong></li>
        <li>Choose <code>wordpress-full-mcp.zip</code></li>
        <li>Click <strong>Install Now → Activate</strong></li>
      </ol>

      <h3>FTP / File Manager</h3>
      <p>
        Upload the folder <code>plugin/wordpress-full-mcp/</code> to{' '}
        <code>wp-content/plugins/wordpress-full-mcp/</code>, then activate in
        Plugins.
      </p>

      <h3>Avoid double nesting</h3>
      <p>
        If activation says the plugin file does not exist, the ZIP was nested one
        folder too deep (for example{' '}
        <code>wordpress-full-mcp-install/wordpress-full-mcp/...</code>). Move the
        inner folder up one level, or reinstall with the correct ZIP.
      </p>

      <h3>After activation</h3>
      <ol>
        <li>Open <strong>Settings → WordPress Full MCP</strong></li>
        <li>Leave <strong>Safe Mode</strong> on</li>
        <li>Enable <strong>Power Mode</strong> only when you need installs, file writes, or deep Elementor edits</li>
        <li>Create an API key and copy it immediately</li>
      </ol>

      <h3>Verify the endpoint</h3>
      <p>Open either URL in a browser. You should see JSON with name, version, and mode flags:</p>
      <CodeBlock
        language="text"
        filename="endpoints"
        code={`# Pretty permalinks
https://your-site.com/wp-json/wpmcp/v1/mcp

# Fallback (works when /wp-json/ rewrites are broken)
https://your-site.com/?rest_route=/wpmcp/v1/mcp`}
      />

      <h3>Local HTTP (no SSL)</h3>
      <p>Disable Require HTTPS in settings, or add to <code>wp-config.php</code>:</p>
      <CodeBlock
        language="php"
        filename="wp-config.php"
        code={`add_filter('wpmcp_require_https', '__return_false');`}
      />
    </>
  )
}

function ConnectDoc() {
  return (
    <>
      <h2>Connect any AI</h2>
      <p>
        WordPress Full MCP speaks MCP over HTTP. Any client that can attach a
        remote MCP server with a Bearer token can connect — Claude Desktop,
        Cursor, VS Code Copilot, Windsurf, Continue, Cline, Zed, or a custom
        agent. No WordPress-specific adapter is required.
      </p>

      <h3>1. Create an API key</h3>
      <ol>
        <li>Go to <strong>Settings → WordPress Full MCP</strong></li>
        <li>Enter an optional label and click <strong>Create API Key</strong></li>
        <li>Copy the token immediately (format <code>wpmcp_...</code>)</li>
      </ol>

      <h3>2. Add the MCP server in your client</h3>
      <p>
        Most clients accept a JSON config shaped like this. Prefer the fallback
        URL if you are unsure about rewrite rules:
      </p>
      <div className="not-prose mb-4">
        <CodeBlock code={mcpConfigDirect} filename="mcp.json" />
      </div>
      <p>Pretty permalinks version:</p>
      <div className="not-prose mb-4">
        <CodeBlock code={mcpConfigFallback} filename="mcp.json" />
      </div>
      <p>
        In Cursor this often lives in <code>.cursor/mcp.json</code>. Claude
        Desktop and other apps have their own MCP settings panels — paste the
        same URL and Authorization header.
      </p>

      <h3>3. Verify</h3>
      <p>Ask the agent to run:</p>
      <ul>
        <li><code>site_info</code> — site name, versions, endpoint</li>
        <li><code>health_check</code> — HTTPS, debug, permalinks, uploads</li>
        <li><code>wpmcp_discover</code> with domain <code>core</code></li>
      </ul>

      <h3>Application passwords (optional)</h3>
      <p>
        You can also authenticate with a WordPress Application Password if your
        client supports Basic auth. For most MCP clients, Bearer API keys are the
        simplest path.
      </p>
    </>
  )
}

function HowDoc() {
  return (
    <>
      <h2>How it works</h2>
      <p>
        The plugin registers an MCP HTTP transport under the WordPress REST API
        namespace <code>wpmcp/v1</code>. Authenticated clients list tools, discover
        capabilities, and execute actions.
      </p>

      <h3>Architecture</h3>
      <ol>
        <li>
          <strong>Transport</strong> — REST route <code>/mcp</code> handles MCP
          protocol messages
        </li>
        <li>
          <strong>Auth</strong> — Bearer API keys (hashed at rest) plus optional
          Application Passwords
        </li>
        <li>
          <strong>Security</strong> — HTTPS check, rate limits, Safe/Power modes
        </li>
        <li>
          <strong>Registry</strong> — Tools load from domain modules (content,
          WooCommerce, Elementor, …)
        </li>
        <li>
          <strong>Gateway</strong> — Public tools stay small; everything else runs
          through <code>wpmcp_run</code>
        </li>
        <li>
          <strong>Audit & checkpoints</strong> — Calls are logged; writes can be
          snapshotted and restored
        </li>
      </ol>

      <h3>Public tools vs internal tools</h3>
      <p>
        Agents always see a compact list: <code>site_info</code>,{' '}
        <code>health_check</code>, <code>audit_recent</code>,{' '}
        <code>wpmcp_discover</code>, <code>wpmcp_info</code>,{' '}
        <code>wpmcp_run</code>, <code>wpmcp_batch</code>. To call something like{' '}
        <code>posts_create</code>, the agent discovers it and runs it via{' '}
        <code>wpmcp_run</code>.
      </p>

      <h3>Discover domains</h3>
      <p>
        Pass a domain to <code>wpmcp_discover</code>: gateway, core, content,
        media, plugins, themes, files, woocommerce, elementor, integrations.
      </p>
    </>
  )
}

function SecurityDoc() {
  return (
    <>
      <h2>Security modes</h2>
      <p>
        Controls live under <strong>Settings → WordPress Full MCP</strong>.
      </p>

      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Default</th>
            <th>Behavior</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Safe Mode</td>
            <td>ON</td>
            <td>
              Blocks deletes, theme switch, file writes, DB search-replace, and
              other destructive ops
            </td>
          </tr>
          <tr>
            <td>Power Mode</td>
            <td>OFF</td>
            <td>
              Required for plugin install, theme switch, file writes, deep
              Elementor edits, user create/update
            </td>
          </tr>
          <tr>
            <td>Require HTTPS</td>
            <td>ON*</td>
            <td>Rejects non-HTTPS requests (*OFF when WP_DEBUG is on by default)</td>
          </tr>
          <tr>
            <td>Rate limit</td>
            <td>120/min</td>
            <td>Per-identity request cap</td>
          </tr>
        </tbody>
      </table>

      <h3>Recommended posture</h3>
      <ul>
        <li>Keep Safe Mode on in production</li>
        <li>Enable Power Mode only for trusted sessions</li>
        <li>Rotate / revoke API keys you no longer need</li>
        <li>Prefer HTTPS everywhere except local development</li>
      </ul>

      <h3>Common security errors</h3>
      <ul>
        <li><code>401</code> — invalid or missing API key</li>
        <li><code>403</code> HTTPS required — use HTTPS or disable the setting</li>
        <li><code>403</code> Power mode required — enable Power Mode</li>
        <li><code>403</code> Safe mode blocked — disable Safe Mode or use a safer tool</li>
        <li><code>429</code> — rate limited; wait or raise the limit</li>
      </ul>
    </>
  )
}

function CheckpointDoc() {
  return (
    <>
      <h2>Checkpoints</h2>
      <p>
        Checkpoints let you snapshot and restore files, posts (including
        Elementor data), and options. File writes automatically create a
        checkpoint before overwrite.
      </p>
      <ul>
        <li><code>checkpoint_create</code> — snapshot a target</li>
        <li><code>checkpoint_list</code> — recent checkpoints</li>
        <li><code>checkpoint_get</code> — inspect one snapshot</li>
        <li><code>checkpoint_restore</code> — revert (Power Mode)</li>
        <li><code>checkpoint_delete</code> — remove a checkpoint (Power Mode)</li>
      </ul>
      <p>
        Use checkpoints before risky agent edits. If something goes wrong, restore
        and continue.
      </p>
    </>
  )
}

function ToolsDoc() {
  return (
    <>
      <h2>Tool catalog</h2>
      <p>
        Most tools are invoked through <code>wpmcp_run</code>. Notes mark tools
        that require Power Mode or are blocked by Safe Mode.
      </p>
      {toolGroups.map((group) => (
        <div key={group.name}>
          <h3>{group.name}</h3>
          <table>
            <thead>
              <tr>
                <th>Tool</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {group.tools.map((t) => (
                <tr key={t.name}>
                  <td>
                    <code>{t.name}</code>
                    {t.note && (
                      <div className="mt-1 text-xs text-warn">{t.note}</div>
                    )}
                  </td>
                  <td>{t.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  )
}

function TroubleDoc() {
  return (
    <>
      <h2>Troubleshooting</h2>

      <h3>Pretty URL 404s, fallback works</h3>
      <p>
        The plugin is fine — host rewrite rules are not routing{' '}
        <code>/wp-json/</code>. Flush permalinks (
        <strong>Settings → Permalinks → Save</strong>) or use the{' '}
        <code>?rest_route=/wpmcp/v1/mcp</code> fallback in your MCP client.
      </p>

      <h3>401 Unauthorized</h3>
      <p>
        Confirm the Bearer token is exact (<code>wpmcp_</code> + 40 characters),
        not revoked, and sent as{' '}
        <code>Authorization: Bearer …</code>.
      </p>

      <h3>Plugin file does not exist</h3>
      <p>
        ZIP was nested too deep. Reinstall with the correct{' '}
        <code>wordpress-full-mcp.zip</code> or move the inner folder up one level.
      </p>

      <h3>Elementor / REST 403 cookie errors in wp-admin</h3>
      <p>
        Those are usually WordPress nonce / cookie issues in the admin editor, not
        MCP failures. Re-login to wp-admin, clear cookies for the site, and retry.
        MCP uses API keys over HTTP and does not depend on admin cookies.
      </p>

      <h3>Connection refused on local</h3>
      <p>
        Use your local URL (for example{' '}
        <code>http://localhost:10008/?rest_route=/wpmcp/v1/mcp</code>) and disable
        Require HTTPS.
      </p>

      <table>
        <thead>
          <tr>
            <th>Symptom</th>
            <th>Fix</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>403 HTTPS required</td>
            <td>Use HTTPS or turn off Require HTTPS</td>
          </tr>
          <tr>
            <td>403 Power mode</td>
            <td>Enable Power Mode in settings</td>
          </tr>
          <tr>
            <td>403 Safe mode blocked</td>
            <td>Disable Safe Mode or pick a non-destructive tool</td>
          </tr>
          <tr>
            <td>429 Rate limited</td>
            <td>Wait a minute or raise the limit</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
