const ui = `
<div class="mode-bar">
  <div class="segmented" role="radiogroup" aria-label="Typing mode">
    <input type="radio" name="kbMode" id="modeLayout" value="layout" checked>
    <label for="modeLayout">Arabic layout</label>
    <input type="radio" name="kbMode" id="modeArabizi" value="arabizi">
    <label for="modeArabizi">Arabizi</label>
    <input type="radio" name="kbMode" id="modeLatin" value="latin">
    <label for="modeLatin">Latin</label>
  </div>
  <p class="mode-hint" id="modeHint"></p>
  <span class="buffer-chip" id="bufferChip" hidden>Buffer <span class="buf" id="bufferText"></span></span>
</div>

<div class="editor-wrap">
  <label class="sr-only" for="area">Arabic text editor</label>
  <textarea class="editor editor--ar editor--tall" id="area" dir="rtl" lang="ar" spellcheck="false" placeholder="اكتب بالعربية هنا…"></textarea>
  <div class="editor-tools">
    <span>Your text stays in this browser tab.</span>
    <span class="count" id="kbCount"></span>
  </div>
</div>

<div class="toolbar">
  <button class="btn btn-ghost btn-sm" type="button" data-kb-action="copy">Copy</button>
  <button class="btn btn-ghost btn-sm" type="button" data-kb-action="clear">Clear</button>
  <span class="sep" aria-hidden="true"></span>
  <button class="btn btn-ghost btn-sm" type="button" data-kb-action="font-plus" aria-label="Increase font size">A+</button>
  <button class="btn btn-ghost btn-sm" type="button" data-kb-action="font-minus" aria-label="Decrease font size">A−</button>
  <span class="sep" aria-hidden="true"></span>
  <button class="btn btn-ghost btn-sm" type="button" data-kb-action="google">Search on Google</button>
  <button class="btn btn-ghost btn-sm" type="button" data-kb-action="youtube">Search on YouTube</button>
  <span class="grow"></span>
  <label class="check"><input type="checkbox" id="smartVowels" checked> Smart vowel handling</label>
</div>

<div class="kb">
  <div class="kb-scroll">
    <div class="kb-rows" id="keyboard"></div>
  </div>
  <p class="kb-note">Click a key to insert it. In layout mode, your physical keyboard follows the standard Arabic 101 mapping.</p>
</div>`;

const article = `
<p><strong>An Arabic keyboard you can use right now</strong> solves a very specific problem: the computer in front of you has no Arabic layout, no Arabic language pack, and no administrator rights to install one. This page puts a full Arabic keyboard in the browser. You click the letters, or you map your existing physical keyboard to Arabic, and the text appears in the editor above.</p>

<p>Everything runs locally as JavaScript. The text is not sent to a server, not saved to an account, and not uploaded anywhere. When you close the tab, it is gone. That makes the page safe for private messages, client documents, subtitles, and homework alike.</p>

<h2 id="type-arabic-online">How to type Arabic online</h2>
<ol>
  <li>Click inside the editor so the cursor is active.</li>
  <li>Pick a mode: <strong>Arabic layout</strong> for a normal Arabic keyboard, <strong>Arabizi</strong> to type Latin letters and convert them, or <strong>Latin</strong> to type English and numbers normally.</li>
  <li>Type with the on-screen keys, or use your own keyboard. In layout mode, the letters on your physical keys produce Arabic characters.</li>
  <li>Add harakat from the gold row when you need vocalization, then press <strong>Copy</strong> and paste the result into any app.</li>
</ol>
<p>The character counter under the editor updates as you type, so you always know how much text you have before pasting it into a field with a limit. Once the basics feel comfortable, you can measure your progress with an <a href="https://www.clavier-arabe.org/en/p/test-dactylographie-arabe.html">Arabic typing test</a>.</p>

<h2 id="typing-modes">Three typing modes for three habits</h2>
<p>People arrive at an Arabic keyboard from very different starting points. The mode selector covers all three.</p>
<ul>
  <li><strong>Arabic layout</strong> is the familiar 101 layout. If you have ever used an Arabic keyboard, the keys will feel correct: <span class="ar-inline">ض</span> on Q, <span class="ar-inline">ش</span> on A, <span class="ar-inline">ي</span> on D, and so on. Use it when you can touch-type Arabic or when you want the on-screen keys to match a physical Arabic keyboard.</li>
  <li><strong>Arabizi</strong> lets you write the way many people text: <code>marhaba</code>, <code>kifak</code>, <code>3afak</code>, <code>9alb</code>. Press Space and the word is converted to Arabic script. Numbers stand in for letters that have no Latin equivalent, and common words are recognized as whole units.</li>
  <li><strong>Latin</strong> turns the conversion off. Use it for an English sentence, a phone number, or a URL inside otherwise Arabic text.</li>
</ul>
<p>Smart vowel handling is on by default. It avoids the classic transliteration mess where every Latin <em>a</em> becomes an alef and every <em>e</em> becomes a ya. Instead, it uses the position of the vowel in the word, common consonant clusters, and the end of the word to choose a sensible Arabic spelling.</p>

<h2 id="harakat">Adding harakat without breaking the word</h2>
<p>Arabic diacritics are marks, not letters. They attach to the letter before them, and only one short vowel can sit on a letter at a time. The editor enforces those rules as you type:</p>
<ul>
  <li>A second vowel on the same letter replaces the first one instead of stacking.</li>
  <li>Shadda is placed before the vowel it doubles, so <span class="ar-inline">مُحَمَّد</span> comes out in the right order.</li>
  <li>Shadda plus sukun collapses to the more useful combination rather than producing an unreadable pair.</li>
</ul>
<p>If you paste vocalized text from elsewhere, the same cleanup runs on the pasted content. That is useful when a document mixes several sources and the mark order has drifted.</p>

<h2 id="arabizi">Arabizi numbers and dialect letters</h2>
<p>Arabizi uses digits because they resemble Arabic letters. The main substitutions are:</p>
<div class="mapping-grid">
  <div class="map-item"><span class="map-ar">ء</span><span class="map-en">2</span></div>
  <div class="map-item"><span class="map-ar">ع</span><span class="map-en">3</span></div>
  <div class="map-item"><span class="map-ar">خ</span><span class="map-en">5</span></div>
  <div class="map-item"><span class="map-ar">ط</span><span class="map-en">6</span></div>
  <div class="map-item"><span class="map-ar">ح</span><span class="map-en">7</span></div>
  <div class="map-item"><span class="map-ar">ق</span><span class="map-en">9</span></div>
</div>
<p>The converter also understands digraphs such as <code>kh</code>, <code>sh</code>, <code>th</code>, <code>dh</code>, and <code>gh</code>, and it keeps a small dictionary of frequent words so that <code>inshallah</code> or <code>shukran</code> do not come out letter by letter. If a conversion is not what you wanted, switch to Latin mode, fix the word, and continue.</p>

<h2 id="keyboard-problems">Common Arabic typing problems</h2>
<p>Most complaints about typing Arabic come from four issues, and none of them require reinstalling Windows or macOS.</p>
<h3 id="no-arabic-pack">No Arabic language pack</h3>
<p>Use this page and copy the result. A browser keyboard does not change your system settings, so it works on locked-down work computers and school laptops.</p>
<h3 id="disconnected-letters">Letters look disconnected after pasting</h3>
<p>Some design programs, especially older Photoshop versions, do not shape Arabic text correctly. They show isolated letter forms instead of joined words. The <a href="/photoshop-text-fixer/">Photoshop Arabic text fixer</a> converts a line into presentation forms in visual order, which those programs can display correctly.</p>
<h3 id="mixed-direction">Numbers and English words jump around</h3>
<p>Arabic is right-to-left, but numbers and Latin words inside it are left-to-right. Browsers usually handle this with the Unicode bidirectional algorithm. When a field or app does not, keep Latin fragments on their own line or add a neutral character such as a space around them.</p>
<h3 id="punctuation-shape">Commas and question marks look wrong</h3>
<p>Arabic uses <span class="ar-inline">،</span> and <span class="ar-inline">؟</span> rather than <code>,</code> and <code>?</code>. The <a href="/arabic-punctuation-converter/">punctuation converter</a> swaps them without touching decimal separators, and the <a href="/arabic-text-cleaner/">text cleaner</a> fixes spacing around them.</p>

<h2 id="toolkit">Eighteen tools beyond the keyboard</h2>
<p>The keyboard is the center of the site, but Arabic text work rarely stops at typing. The other tools cover the tasks that come next:</p>
<ul>
  <li><strong>Keyboards:</strong> a <a href="/darija-keyboard/">Darija keyboard</a> with Maghrebi letters and a <a href="/persian-keyboard/">Persian keyboard</a> with the four extra letters.</li>
  <li><strong>Clean and fix:</strong> remove harakat, stretch words with tatweel, replace words in bulk, and repair punctuation.</li>
  <li><strong>Convert:</strong> write amounts in Arabic words with <a href="/tafqit/">tafqit</a>, translate to braille, change numeral systems, and encode links.</li>
  <li><strong>Analyze and generate:</strong> sort lists, count words, measure frequency, create placeholder text, and listen to the result.</li>
</ul>
<p>Each tool has its own guide and answers, so you can open the one you need without reading a manual. If you are new to Arabic script, start with the keyboard, type a sentence, then use the cleaner and the counter to check your work.</p>

<div class="callout">
  <p><strong>Tip:</strong> Bookmark this page on the device where you type most. The browser remembers the bookmark, not your text, which is exactly the privacy trade you want for a shared computer.</p>
</div>`;

const faq = [
  {
    q: 'Is this Arabic keyboard free to use?',
    a: 'Yes. Every keyboard and text tool on the site is free, with no account, no trial period, and no download. The page is a static site, so there is nothing to install.'
  },
  {
    q: 'Do I need to install an Arabic language pack?',
    a: 'No. The keyboard runs in the browser and produces normal Unicode Arabic text. You can paste that text into Word, Google Docs, WhatsApp, email, or any other app without changing your system language settings.'
  },
  {
    q: 'Does the site store or upload my text?',
    a: 'No. Conversion happens in JavaScript on your device. The editor is cleared when you reload or close the page, and there is no account or database behind the tools.'
  },
  {
    q: 'Can I use my physical keyboard to type Arabic?',
    a: 'Yes. Choose Arabic layout and type on your normal keyboard; the letters are mapped to the standard Arabic 101 positions. You can also click the on-screen keys, which is easier on a phone or tablet.'
  },
  {
    q: 'Why does pasted Arabic look broken in Photoshop?',
    a: 'Older design software does not apply Arabic shaping. Use the Photoshop text fixer on this site to convert the line into connected presentation forms before pasting it into a text layer.'
  },
  {
    q: 'Can I type Moroccan Darija or Persian here?',
    a: 'Yes. The Darija keyboard adds ڭ, ڨ, پ, چ, and ڥ, while the Persian keyboard adds پ, چ, ژ, and گ. Each has its own transliteration rules and on-screen layout.'
  }
];

module.exports = {
  slug: '',
  home: true,
  title: 'Arabic Keyboard Online – Type Arabic Without Installing',
  description: 'Type Arabic online with a free Arabic keyboard. Choose the Arabic layout, Arabizi, or Latin mode, add harakat, and use 18 text tools in your browser.',
  shortTitle: 'Arabic Keyboard',
  appName: 'Arabic Keyboard Online',
  lede: 'Type Arabic in your browser with a full keyboard, Arabizi transliteration, and harakat support.',
  published: '2026-10-02',
  modified: '2026-11-18',
  keywords: ['Arabic keyboard', 'Arabic keyboard online', 'type Arabic', 'Arabizi keyboard', 'Arabic typing'],
  ui,
  scripts: ['keyboard.js', 'keyboards/arabic.js'],
  article,
  faq
};
