const SITE = {
  name: 'Arabic Keyboard Online',
  shortName: 'Arabic Keyboard',
  url: 'https://arabic-keyboard-online.github.io',
  tagline: 'Free Arabic typing and text tools that run in your browser.',
  locale: 'en',
  theme: '#0f766e'
};

const ICONS = {
  keyboard: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.5 5-5 2.5 2.5-5 5-2.5Z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z"/>',
  broom: '<path d="m14 4 6 6M12.5 8.5 4 17v3h3l8.5-8.5M13 7l4 4M7 14l3 3M5 21h11"/>',
  quote: '<path d="M10 11H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6c0 2-1.5 3.5-4 4M20 11h-4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6c0 2-1.5 3.5-4 4"/>',
  sparkles: '<path d="m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3ZM19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14ZM5 3l.6 1.4L7 5l-1.4.6L5 7l-.6-1.4L3 5l1.4-.6L5 3Z"/>',
  banknote: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
  sort: '<path d="M3 5h11M3 12h8M3 19h5M17 4v16M17 20l-3-3M17 20l3-3"/>',
  filter: '<path d="M22 3H2l8 9.5V19l4 2v-8.5L22 3Z"/>',
  fileText: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  braille: '<circle cx="7" cy="5" r="1.3"/><circle cx="7" cy="12" r="1.3"/><circle cx="7" cy="19" r="1.3"/><circle cx="17" cy="5" r="1.3"/><circle cx="17" cy="12" r="1.3"/><circle cx="17" cy="19" r="1.3"/>',
  eraser: '<path d="m7 21-4-4L14 6a2 2 0 0 1 3 0l4 4a2 2 0 0 1 0 3L11 21H7Z"/><path d="M11 21h10"/>',
  stretch: '<path d="M3 12h18M3 12l4-4M3 12l4 4M21 12l-4-4M21 12l-4 4"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
  hash: '<path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>',
  calculator: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 15v3M12 10v8M17 6v12"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  volume: '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12"/>',
  shield: '<path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  trash: '<path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6"/>',
  play: '<path d="m7 4 13 8-13 8V4Z"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="1"/>',
  check: '<path d="m5 12 5 5L20 7"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14Z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
  type: '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
  wand: '<path d="m15 4 5 5M4 20 17 7l3 3L7 23H4v-3Z"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>'
};

let ALL_TOOLS = [];
function setTools(tools) {
  ALL_TOOLS = tools;
}

const GROUPS = [
  { id: 'keyboards', title: 'Keyboards', note: 'Type Arabic, Darija, or Persian' },
  { id: 'fix', title: 'Clean & fix', note: 'Repair spacing, punctuation, and layout' },
  { id: 'convert', title: 'Convert', note: 'Numbers, braille, and links' },
  { id: 'analyze', title: 'Analyze', note: 'Sort, count, and inspect words' },
  { id: 'generate', title: 'Generate & listen', note: 'Placeholder text and speech' }
];

function icon(name, cls = '') {
  const body = ICONS[name] || ICONS.keyboard;
  return `<svg class="icon${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function fmtDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

function urlFor(slug) {
  return slug ? `${SITE.url}/${slug}/` : `${SITE.url}/`;
}

function pathFor(slug) {
  return slug ? `/${slug}/` : '/';
}

function articleLinks(tools) {
  return Object.fromEntries(tools.map(t => [t.slug, t]));
}

function toolLinkCard(t, compact = false) {
  return `<a class="tool-tile${compact ? ' tool-tile--compact' : ''}" href="${pathFor(t.slug)}">
    <span class="tool-tile-icon">${icon(t.icon)}</span>
    <span class="tool-tile-body">
      <span class="tool-tile-title">${esc(t.shortTitle)}</span>
      ${compact ? '' : `<span class="tool-tile-desc">${esc(t.cardDesc)}</span>`}
    </span>
    ${icon('arrowUpRight', 'tool-tile-arrow')}
  </a>`;
}

function toolsMenu(tools) {
  const groups = GROUPS.map(g => {
    const items = tools.filter(t => t.group === g.id);
    return `<div class="menu-group">
      <p class="menu-title">${esc(g.title)}</p>
      ${items.map(t => `<a href="${pathFor(t.slug)}">${icon(t.icon, 'menu-icon')}<span>${esc(t.shortTitle)}</span></a>`).join('')}
    </div>`;
  }).join('');
  return `<div class="tools-menu" id="tools-menu" data-tools-menu hidden>
    <div class="tools-menu-inner">
      <div class="tools-menu-grid">${groups}</div>
      <div class="tools-menu-foot">
        <span>Every tool runs locally in your browser.</span>
        <a href="/#tools">See all 18 tools ${icon('arrowRight')}</a>
      </div>
    </div>
  </div>`;
}

function header() {
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="/" aria-label="${SITE.name} home">
        <span class="brand-mark">${icon('keyboard')}</span>
        <span class="brand-text">Arabic<b>Keyboard</b><span class="brand-dot">.online</span></span>
      </a>
      <nav class="primary-nav" aria-label="Primary">
        <a href="/">Home</a>
        <div class="menu-anchor">
          <button class="nav-menu-btn" type="button" data-menu-toggle aria-expanded="false" aria-controls="tools-menu">
            All tools ${icon('chevronDown', 'chev')}
          </button>
        </div>
        <a href="/#guide">Typing guide</a>
        <a href="/#faq">FAQ</a>
      </nav>
      <button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">
        ${icon('menu', 'icon-open')}${icon('close', 'icon-close')}
      </button>
    </div>
    ${toolsMenu(ALL_TOOLS)}
    <div class="mobile-nav" id="mobile-nav" data-mobile-nav hidden>
      <div class="container">
        <div class="mobile-links">
          <a href="/">Home</a>
          <a href="/#guide">Typing guide</a>
          <a href="/#faq">FAQ</a>
          <a href="/privacy/">Privacy</a>
        </div>
        ${GROUPS.map(g => `<div class="mobile-group"><p>${esc(g.title)}</p><div class="mobile-group-links">${ALL_TOOLS.filter(t => t.group === g.id).map(t => `<a href="${pathFor(t.slug)}">${icon(t.icon)}${esc(t.shortTitle)}</a>`).join('')}</div></div>`).join('')}
      </div>
    </div>
  </header>`;
}

function footer() {
  const groups = GROUPS.map(g => `<div class="footer-col">
    <p class="footer-title">${esc(g.title)}</p>
    ${ALL_TOOLS.filter(t => t.group === g.id).map(t => `<a href="${pathFor(t.slug)}">${esc(t.shortTitle)}</a>`).join('')}
  </div>`).join('');
  return `<footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <a class="brand brand--footer" href="/">
          <span class="brand-mark">${icon('keyboard')}</span>
          <span class="brand-text">Arabic<b>Keyboard</b></span>
        </a>
        <p>${SITE.tagline}</p>
        <p class="footer-note">${icon('shield')} Your text never leaves your device.</p>
      </div>
      ${groups}
    </div>
    <div class="container footer-bottom">
      <p>© <span data-year>2026</span> ${SITE.name}. Free to use.</p>
      <div class="footer-bottom-links">
        <a href="/privacy/">Privacy</a>
        <a href="/sitemap.xml">Sitemap</a>
        <a href="/#tools">All tools</a>
      </div>
    </div>
  </footer>`;
}

function breadcrumbs(page) {
  if (page.home) return '';
  return `<nav class="breadcrumbs container" aria-label="Breadcrumb">
    <ol>
      <li><a href="/">Home</a></li>
      <li><a href="/#tools">Tools</a></li>
      <li aria-current="page">${esc(page.shortTitle)}</li>
    </ol>
  </nav>`;
}

function buildToc(articleHtml) {
  const re = /<h2 id="([^"]+)"[^>]*>(.*?)<\/h2>/g;
  const items = [];
  let m;
  while ((m = re.exec(articleHtml))) {
    items.push({ id: m[1], label: m[2].replace(/<[^>]+>/g, '') });
  }
  if (items.length < 3) return '';
  return `<aside class="toc" aria-label="On this page">
    <p class="toc-title">${icon('list')} On this page</p>
    <ol>${items.map(i => `<li><a href="#${i.id}">${esc(i.label)}</a></li>`).join('')}</ol>
  </aside>`;
}

function faqHtml(faq) {
  if (!faq || !faq.length) return '';
  return `<section class="faq-section" id="faq" aria-labelledby="faq-title">
    <div class="section-heading">
      <p class="eyebrow">${icon('info')} Quick answers</p>
      <h2 id="faq-title">Frequently asked questions</h2>
    </div>
    <div class="faq-list">
      ${faq.map(item => `<details class="faq-item">
        <summary><span>${item.q}</span>${icon('chevronDown', 'faq-chev')}</summary>
        <div class="faq-answer"><p>${item.a}</p></div>
      </details>`).join('')}
    </div>
  </section>`;
}

function relatedHtml(page, tools) {
  const related = (page.related || []).map(slug => tools.find(t => t.slug === slug)).filter(Boolean);
  if (!related.length) return '';
  return `<section class="related-section" aria-labelledby="related-title">
    <div class="section-heading">
      <p class="eyebrow">${icon('grid')} Keep going</p>
      <h2 id="related-title">Related Arabic tools</h2>
    </div>
    <div class="tool-grid tool-grid--related">
      ${related.map(t => toolLinkCard(t)).join('')}
    </div>
  </section>`;
}

function schemaFor(page) {
  const url = urlFor(page.slug);
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#org`,
      name: SITE.name,
      url: `${SITE.url}/`,
      logo: `${SITE.url}/assets/img/icon-512.png`
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: `${SITE.url}/`,
      name: SITE.name,
      description: SITE.tagline,
      inLanguage: 'en',
      publisher: { '@id': `${SITE.url}/#org` }
    },
    {
      '@type': 'WebApplication',
      '@id': `${url}#app`,
      name: page.appName || page.shortTitle,
      url,
      description: page.description,
      applicationCategory: 'UtilitiesApplication',
      applicationSubCategory: 'Text and language tools',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      inLanguage: 'en',
      datePublished: page.published,
      dateModified: page.modified,
      isPartOf: { '@id': `${SITE.url}/#website` },
      publisher: { '@id': `${SITE.url}/#org` }
    }
  ];
  if (page.faq && page.faq.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: page.faq.map(f => ({
        '@type': 'Question',
        name: f.q.replace(/<[^>]+>/g, ''),
        acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') }
      }))
    });
  }
  if (!page.home) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE.url}/#tools` },
        { '@type': 'ListItem', position: 3, name: page.shortTitle, item: url }
      ]
    });
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2);
}

function articleDates(page) {
  return `<div class="article-dates">
    <span>${icon('clock')} Published <time datetime="${page.published}">${fmtDate(page.published)}</time></span>
    <span>Updated <time datetime="${page.modified}">${fmtDate(page.modified)}</time></span>
  </div>`;
}

function pageShell(page, body, extraHead = '', noindex = false) {
  const url = urlFor(page.slug);
  const title = page.title;
  const desc = page.description;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">'}
<meta name="author" content="${SITE.name}">
<meta name="theme-color" content="${SITE.theme}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE.url}/assets/img/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Arabic Keyboard Online – free Arabic typing and text tools">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${SITE.url}/assets/img/og-image.png">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/img/icon-192.png" type="image/png" sizes="192x192">
<link rel="apple-touch-icon" href="/assets/img/icon-192.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Manrope:wght@400;500;600;700;800&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/style.css">
<script type="application/ld+json">
${schemaFor(page)}
</script>
${extraHead}
</head>
<body class="${page.home ? 'page-home' : 'page-tool'}">
${header()}
${body}
${footer()}
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script src="/assets/js/site.js" defer></script>
${(page.scripts || []).map(s => `<script src="/assets/js/${s}" defer></script>`).join('\n')}
</body>
</html>
`;
}

module.exports = {
  SITE,
  ICONS,
  GROUPS,
  setTools,
  icon,
  esc,
  fmtDate,
  urlFor,
  pathFor,
  toolLinkCard,
  header,
  footer,
  breadcrumbs,
  buildToc,
  faqHtml,
  relatedHtml,
  schemaFor,
  articleDates,
  pageShell
};
