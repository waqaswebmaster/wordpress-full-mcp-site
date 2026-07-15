export const mcpConfigDirect = `{
  "mcpServers": {
    "wordpress-full-mcp": {
      "url": "https://your-site.com/?rest_route=/wpmcp/v1/mcp",
      "headers": {
        "Authorization": "Bearer wpmcp_YOUR_API_KEY"
      }
    }
  }
}`

export const mcpConfigFallback = `{
  "mcpServers": {
    "wordpress-full-mcp": {
      "url": "https://your-site.com/wp-json/wpmcp/v1/mcp",
      "headers": {
        "Authorization": "Bearer wpmcp_YOUR_API_KEY"
      }
    }
  }
}`

/** @deprecated alias */
export const cursorConfigDirect = mcpConfigDirect
/** @deprecated alias */
export const cursorConfigFallback = mcpConfigFallback

export type DocSection = {
  id: string
  title: string
  group: string
}

export const docNav: DocSection[] = [
  { id: 'introduction', title: 'Introduction', group: 'Getting started' },
  { id: 'install', title: 'Installation', group: 'Getting started' },
  { id: 'connect-cursor', title: 'Connect any AI', group: 'Getting started' },
  { id: 'how-it-works', title: 'How it works', group: 'Concepts' },
  { id: 'security', title: 'Security modes', group: 'Concepts' },
  { id: 'checkpoints', title: 'Checkpoints', group: 'Concepts' },
  { id: 'tools', title: 'Tool catalog', group: 'Reference' },
  { id: 'troubleshooting', title: 'Troubleshooting', group: 'Reference' },
]

export type ToolGroup = {
  name: string
  tools: { name: string; description: string; note?: string }[]
}

export const toolGroups: ToolGroup[] = [
  {
    name: 'Public gateway',
    tools: [
      { name: 'site_info', description: 'Site name, versions, active theme/plugins, MCP endpoint' },
      { name: 'health_check', description: 'HTTPS, debug, permalink, uploads writable' },
      { name: 'audit_recent', description: 'Recent MCP audit log entries' },
      { name: 'wpmcp_discover', description: 'Search tools by keyword or domain' },
      { name: 'wpmcp_info', description: 'Get tool schema' },
      { name: 'wpmcp_run', description: 'Execute any registered tool' },
      { name: 'wpmcp_batch', description: 'Run multiple tools in sequence' },
    ],
  },
  {
    name: 'Content',
    tools: [
      { name: 'posts_list', description: 'List posts, pages, or custom post types' },
      { name: 'posts_get', description: 'Get a single post' },
      { name: 'posts_create', description: 'Create a post' },
      { name: 'posts_update', description: 'Update a post' },
      { name: 'posts_delete', description: 'Trash or delete a post', note: 'Safe blocked' },
      { name: 'posts_search', description: 'Full-text search' },
      { name: 'posts_revisions', description: 'List revisions' },
    ],
  },
  {
    name: 'Media',
    tools: [
      { name: 'media_list', description: 'List media library items' },
      { name: 'media_get', description: 'Get a media item' },
      { name: 'media_sideload', description: 'Import media from a URL' },
      { name: 'media_update', description: 'Update title, caption, or alt' },
      { name: 'media_delete', description: 'Delete media', note: 'Safe blocked' },
    ],
  },
  {
    name: 'Taxonomies',
    tools: [
      { name: 'taxonomies_list', description: 'List taxonomies' },
      { name: 'terms_list', description: 'List terms' },
      { name: 'terms_create', description: 'Create a term' },
      { name: 'terms_assign', description: 'Assign terms to a post' },
    ],
  },
  {
    name: 'Users & comments',
    tools: [
      { name: 'users_list', description: 'List users' },
      { name: 'users_get', description: 'Get a user' },
      { name: 'users_create', description: 'Create a user', note: 'Power' },
      { name: 'users_update', description: 'Update a user', note: 'Power' },
      { name: 'comments_list', description: 'List comments' },
      { name: 'comments_moderate', description: 'Approve, spam, trash, or delete' },
    ],
  },
  {
    name: 'Plugins & themes',
    tools: [
      { name: 'plugins_list', description: 'List plugins' },
      { name: 'plugins_activate', description: 'Activate a plugin', note: 'Power' },
      { name: 'plugins_deactivate', description: 'Deactivate a plugin', note: 'Power' },
      { name: 'plugins_install', description: 'Install from wordpress.org', note: 'Power, safe blocked' },
      { name: 'themes_list', description: 'List themes' },
      { name: 'themes_active', description: 'Active theme details' },
      { name: 'themes_switch', description: 'Switch theme', note: 'Power, safe blocked' },
      { name: 'themes_read_file', description: 'Read a theme file' },
    ],
  },
  {
    name: 'Options & files',
    tools: [
      { name: 'options_get', description: 'Get an allowlisted option' },
      { name: 'options_update', description: 'Update an allowlisted option', note: 'Power' },
      { name: 'files_list', description: 'List paths under wp-content' },
      { name: 'files_read', description: 'Read a file under wp-content' },
      { name: 'files_write', description: 'Write a file under wp-content', note: 'Power, safe blocked' },
      { name: 'search_replace', description: 'Serialization-safe DB search-replace', note: 'Power, dry-run default' },
    ],
  },
  {
    name: 'Diagnostics & debug',
    tools: [
      { name: 'diagnostics_run', description: 'PHP / WP / MCP environment info' },
      { name: 'debug_status', description: 'WP_DEBUG state and log path' },
      { name: 'debug_log_tail', description: 'Tail debug.log with optional filter' },
      { name: 'debug_log_clear', description: 'Truncate debug.log', note: 'Power' },
    ],
  },
  {
    name: 'Checkpoints',
    tools: [
      { name: 'checkpoint_create', description: 'Snapshot a file, post, or option' },
      { name: 'checkpoint_list', description: 'List recent checkpoints' },
      { name: 'checkpoint_get', description: 'Inspect one checkpoint' },
      { name: 'checkpoint_restore', description: 'Restore a snapshot', note: 'Power' },
      { name: 'checkpoint_delete', description: 'Delete a checkpoint', note: 'Power' },
    ],
  },
  {
    name: 'WooCommerce',
    tools: [
      { name: 'woo_products_list', description: 'List products' },
      { name: 'woo_products_get', description: 'Get a product' },
      { name: 'woo_products_create', description: 'Create a product' },
      { name: 'woo_products_update', description: 'Update a product' },
      { name: 'woo_products_delete', description: 'Delete a product', note: 'Safe blocked' },
      { name: 'woo_orders_list', description: 'List orders' },
      { name: 'woo_orders_get', description: 'Get an order' },
      { name: 'woo_orders_update_status', description: 'Update order status' },
      { name: 'woo_customers_list', description: 'List customers' },
      { name: 'woo_reports_sales', description: 'Sales totals' },
    ],
  },
  {
    name: 'Elementor',
    tools: [
      { name: 'elementor_pages_list', description: 'List Elementor pages' },
      { name: 'elementor_data_get', description: 'Get _elementor_data JSON' },
      { name: 'elementor_data_set', description: 'Set document JSON', note: 'Power' },
      { name: 'elementor_structure_get', description: 'Simplified structure tree' },
      { name: 'elementor_widget_add', description: 'Add a widget to a document', note: 'Power' },
      { name: 'elementor_build_from_brief', description: 'Build a hero page from headline/CTA' },
      { name: 'elementor_cache_clear', description: 'Clear Elementor CSS cache' },
    ],
  },
  {
    name: 'Integrations',
    tools: [
      { name: 'integrations_detect', description: 'Detect ACF, SEO, cache, forms' },
      { name: 'acf_fields_get', description: 'Get ACF values for a post' },
      { name: 'acf_fields_update', description: 'Update ACF values', note: 'Power' },
      { name: 'seo_meta_get', description: 'Yoast / Rank Math meta' },
      { name: 'seo_meta_update', description: 'Update SEO meta' },
      { name: 'cache_flush', description: 'Flush detected cache + object cache' },
    ],
  },
]
