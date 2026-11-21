const fs = require('fs');
const path = require('path');
const L = require('./lib');
const home = require('./content/home');
const toolSets = [
  ...require('./content/tools-1'),
  ...require('./content/tools-2'),
  ...require('./content/tools-3')
];

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'docs');
const tools = toolSets;
L.setTools(tools);

function fail(msg) {
  console.error('BUILD ERROR: ' + msg);
  process.exitCode = 1;
  throw new Error(msg);
}

function validate() {
  const seenSlugs = new Set();
  const seenPublished = new Map();
  const seenModified = new Map();
  const pages = [home, ...tools];
  const problems = [];

  for (const p of pages) {
    if (seenSlugs.has(p.slug)) problems.push(`duplicate slug: ${p.slug}`);
    seenSlugs.add(p.slug);

    if (seenPublished.has(p.published)) problems.push(`published date reused: ${p.published} (${p.slug} / ${seenPublished.get(p.published)})`);
    if (seenModified.has(p.modified)) problems.push(`modified date reused: ${p.modified} (${p.slug} / ${seenModified.get(p.modified)})`);
    seenPublished.set(p.published, p.slug);
    seenModified.set(p.modified, p.slug);

    if (!/^\d{4}-\d{2}-\d{2}$/.test(p.published) || !/^\d{4}-\d{2}-\d{2}$/.test(p.modified)) {
      problems.push(`bad date format on ${p.slug}`);
    }
    if (p.modified < p.published) problems.push(`modified before published on ${p.slug}`);

    const tLen = p.title.length;
    const dLen = p.description.length;
    if (tLen < 50 || tLen > 60) problems.push(`title length ${tLen} on ${p.slug}: ${p.title}`);
    if (dLen < 140 || dLen > 155) problems.push(`description length ${dLen} on ${p.slug}`);
    if (!p.title.toLowerCase().includes('arabic')) problems.push(`title missing "arabic" on ${p.slug}`);

    for (const rel of p.related || []) {
      if (!tools.some(t => t.slug === rel)) problems.push(`unknown related slug ${rel} on ${p.slug}`);
    }
    if (p.slug && !/^[a-z0-9-]+$/.test(p.slug)) problems.push(`bad slug ${p.slug}`);
  }

  for (const t of tools) {
    if (!t.group || !L.GROUPS.some(g => g.id === t.group)) problems.push(`bad group on ${t.slug}`);
    if (!t.icon) problems.push(`missing icon on ${t.slug}`);
    if (!t.ui) problems.push(`missing ui on ${t.slug}`);
    if (!t.article || t.article.length < 1500) problems.push(`article too short on ${t.slug}`);
    if (!t.faq || t.faq.length < 4) problems.push(`needs 4+ faqs on ${t.slug}`);
    if (!t.related || t.related.length < 3) problems.push(`needs 3+ related tools on ${t.slug}`);
  }

  if (problems.length) fail('validation failed:\n - ' + problems.join('\n - '));

  console.log('Metadata validation passed.');
  console.log(`Title lengths: ${pages.map(p => p.title.length).join(', ')}`);
  console.log(`Description lengths: ${pages.map(p => p.description.length).join(', ')}`);
}

function write(file, content) {
  const target = path.join(OUT, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, 'utf8');
}

function homeBody() {
  const ui = home.ui;
  const groupsHtml = L.GROUPS.map(g => {
    const items = tools.filter(t => t.group === g.id);
    return `<div class="tool-group">
      <div class="tool-group-head">
        <h3>${L.esc(g.title)}</h3>
        <p>${L.esc(g.note)}</p>
      </div>
      <div class="tool-grid">${items.map(t => L.toolLinkCard(t, g.id === 'keyboards' && t.slug === 'persian-keyboard')).join('')}</div>
    </div>`;
  }).join('');

  return `<main id="main">
  <section class="hero">
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">${L.icon('keyboard')} Free online Arabic keyboard</p>
        <h1>Arabic Keyboard <span class="h1-accent">for fast, accurate typing</span></h1>
        <p class="hero-lede">Type Arabic without installing a language pack. Click the virtual keys, map your own keyboard to Arabic, or write in Arabizi and let the transliterator build the words for you.</p>
        <div class="hero-actions">
          <a class="btn btn-primary btn-lg" href="#typing">Start typing ${L.icon('arrowRight')}</a>
          <a class="btn btn-outline btn-lg" href="#tools">Browse 18 tools</a>
        </div>
        <ul class="hero-facts" role="list">
          <li>${L.icon('check')} 28 letters + harakat</li>
          <li>${L.icon('check')} 3 typing modes</li>
          <li>${L.icon('check')} Nothing uploaded</li>
        </ul>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="hero-card">
          <div class="hero-card-top"><span class="hero-lights"><i></i><i></i><i></i></span><span>لوحة المفاتيح العربية</span></div>
          <div class="hero-keys">
            <span>ض</span><span>ص</span><span>ث</span><span>ق</span><span>ف</span><span>غ</span><span>ع</span><span>ه</span><span>خ</span><span>ح</span>
            <span class="w">ش</span><span>س</span><span>ي</span><span>ب</span><span>ل</span><span>ا</span><span>ت</span><span>ن</span><span>م</span><span class="w">ك</span>
          </div>
          <div class="hero-card-foot"><span>ا ب ت ث ج ح خ د ذ ر ز</span><span class="hero-cursor"></span></div>
        </div>
        <div class="hero-chip hero-chip--one">ع</div>
        <div class="hero-chip hero-chip--two">؟</div>
      </div>
    </div>
  </section>

  <section class="tool-band" id="typing">
    <div class="container">
      <article class="tool-card tool-card--keyboard">
        <header class="tool-head">
          <p class="eyebrow">${L.icon('type')} Live Arabic keyboard</p>
          <h2 class="h2-tool">Type in Arabic right now</h2>
          <p class="lede">Choose how your keyboard behaves, then type here or tap the letters below. Your text stays on this page until you clear it.</p>
        </header>
        ${ui}
        <p class="privacy-note">${L.icon('shield')} Runs entirely in your browser. No text is uploaded, stored, or shared.</p>
      </article>
    </div>
  </section>

  <section class="tools-section" id="tools">
    <div class="container">
      <div class="section-heading section-heading--center">
        <p class="eyebrow">${L.icon('grid')} 18 free tools</p>
        <h2>A complete Arabic writing toolkit</h2>
        <p class="section-lede">Each tool solves one specific problem: typing, cleaning, converting, counting, or repairing Arabic text. No sign-up and no file uploads.</p>
      </div>
      ${groupsHtml}
    </div>
  </section>

  <section class="container content-layout" id="guide">
    <article class="prose">
      ${home.article}
      ${L.articleDates(home)}
    </article>
    ${L.buildToc(home.article)}
  </section>

  <div class="container">
    ${L.faqHtml(home.faq)}
  </div>
</main>`;
}

function toolBody(t) {
  return `<main id="main">
  ${L.breadcrumbs(t)}
  <section class="tool-band">
    <div class="container">
      <article class="tool-card">
        <header class="tool-head">
          <p class="eyebrow">${L.icon(t.icon)} ${L.esc(t.eyebrow || 'Arabic text tool')}</p>
          <h1>${t.h1}</h1>
          <p class="lede">${t.lede}</p>
        </header>
        ${t.ui}
        <p class="privacy-note">${L.icon('shield')} Everything runs locally in your browser. Nothing is uploaded to a server.</p>
      </article>
    </div>
  </section>

  <section class="container content-layout">
    <article class="prose" id="guide">
      ${t.article}
      ${L.articleDates(t)}
    </article>
    ${L.buildToc(t.article)}
  </section>

  <div class="container">
    ${L.faqHtml(t.faq)}
    ${L.relatedHtml(t, tools)}
  </div>
</main>`;
}

function writeSitemap() {
  const homeUrl = L.urlFor('');
  const items = [
    { url: homeUrl, lastmod: home.modified, priority: '1.0' },
    ...tools.map(t => ({ url: L.urlFor(t.slug), lastmod: t.modified, priority: '0.8' })),
    { url: L.urlFor('privacy'), lastmod: '2026-11-21', priority: '0.3' }
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items.map(i => `  <url>
    <loc>${i.url}</loc>
    <lastmod>${i.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${i.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
  write('sitemap.xml', xml);
  const lastmods = items.map(i => i.lastmod);
  if (new Set(lastmods).size !== lastmods.length) fail('sitemap lastmod dates are not unique');
}

function privacyPage() {
  const page = {
    slug: 'privacy',
    shortTitle: 'Privacy',
    title: 'Privacy Policy',
    description: 'How Arabic Keyboard Online handles your text and data.',
    published: '2026-11-19',
    modified: '2026-11-21',
    home: false
  };
  const body = `<main id="main">
  ${L.breadcrumbs(page)}
  <section class="tool-band">
    <div class="container narrow">
      <article class="tool-card prose prose--card">
        <p class="eyebrow">${L.icon('shield')} Privacy</p>
        <h1>Privacy Policy</h1>
        <p>Arabic Keyboard Online does not collect, transmit, or store the text you enter. Every tool on this site runs as JavaScript inside your browser, so your words never reach a server.</p>
        <h2>What we do not collect</h2>
        <p>We do not ask for an account, an email address, or a payment method. We do not upload your text, files, or images to any database. We do not sell data.</p>
        <h2>External services</h2>
        <p>The site loads fonts from Google Fonts. Those requests send standard technical information such as your IP address to Google, as any website request does. When you open a link to Google Search, YouTube, or another site, that site's own privacy policy applies.</p>
        <h2>Local browser storage</h2>
        <p>The tools do not save your text in cookies or local storage. Closing or reloading the page clears the editor. Clipboard access happens only when you press a copy button.</p>
        <h2>Contact</h2>
        <p>This is a free static site published with GitHub Pages. For privacy questions about GitHub's own logging, see GitHub's privacy statement.</p>
        ${L.articleDates(page)}
      </article>
    </div>
  </section>
</main>`;
  return L.pageShell(page, body);
}

function notFound() {
  const page = {
    slug: '404',
    shortTitle: 'Page not found',
    title: 'Page Not Found | Arabic Keyboard Online',
    description: 'The page you requested does not exist. Use the Arabic keyboard or browse the full tool list.',
    published: '2026-11-21',
    modified: '2026-11-21',
    home: false
  };
  const body = `<main id="main" class="notfound">
    <div class="container narrow">
      <p class="eyebrow">404</p>
      <h1>This page is not on the keyboard</h1>
      <p>The address may be mistyped, or the page may have moved. Start from the Arabic keyboard or open the full tool list.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="/">Arabic keyboard</a>
        <a class="btn btn-outline" href="/#tools">All tools</a>
      </div>
    </div>
  </main>`;
  return L.pageShell(page, body, '', true);
}

function main() {
  validate();
  fs.mkdirSync(OUT, { recursive: true });

  write('index.html', L.pageShell(home, homeBody()));
  for (const t of tools) {
    write(`${t.slug}/index.html`, L.pageShell(t, toolBody(t)));
  }
  write('privacy/index.html', privacyPage());
  write('404.html', notFound());
  write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${L.SITE.url}/sitemap.xml\n`);
  write('.nojekyll', '');
  writeSitemap();

  console.log(`Built ${tools.length + 1} pages + privacy + 404 into docs/`);
  console.log('Sitemap lastmods:', [home, ...tools].map(p => `${p.slug || 'home'}:${p.modified}`).join(' | '));
}

main();
