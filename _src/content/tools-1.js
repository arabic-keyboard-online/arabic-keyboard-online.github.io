const darijaUi = `
<div class="mode-bar">
  <div class="segmented" role="radiogroup" aria-label="Typing mode">
    <input type="radio" name="kbMode" id="modeLayout" value="layout" checked>
    <label for="modeLayout">Arabic layout</label>
    <input type="radio" name="kbMode" id="modeArabizi" value="arabizi">
    <label for="modeArabizi">Darija Arabizi</label>
    <input type="radio" name="kbMode" id="modeLatin" value="latin">
    <label for="modeLatin">Latin</label>
  </div>
  <p class="mode-hint" id="modeHint"></p>
  <span class="buffer-chip" id="bufferChip" hidden>Buffer <span class="buf" id="bufferText"></span></span>
</div>
<div class="editor-wrap">
  <label class="sr-only" for="area">Darija text editor</label>
  <textarea class="editor editor--ar editor--tall" id="area" dir="rtl" lang="ar" spellcheck="false" placeholder="اكتب بالدارجة هنا…"></textarea>
  <div class="editor-tools"><span>ڭ · ڨ · پ · چ · ڥ are in the key rows below.</span><span class="count" id="kbCount"></span></div>
</div>
<div class="toolbar">
  <button class="btn btn-ghost btn-sm" type="button" data-kb-action="copy">Copy</button>
  <button class="btn btn-ghost btn-sm" type="button" data-kb-action="clear">Clear</button>
  <span class="sep" aria-hidden="true"></span>
  <button class="btn btn-ghost btn-sm" type="button" data-kb-action="font-plus">A+</button>
  <button class="btn btn-ghost btn-sm" type="button" data-kb-action="font-minus">A−</button>
  <span class="sep" aria-hidden="true"></span>
  <button class="btn btn-ghost btn-sm" type="button" data-kb-action="google">Search on Google</button>
  <button class="btn btn-ghost btn-sm" type="button" data-kb-action="youtube">Search on YouTube</button>
  <span class="grow"></span>
  <label class="check"><input type="checkbox" id="smartVowels" checked> Smart vowels</label>
</div>
<div class="kb">
  <div class="kb-scroll"><div class="kb-rows" id="keyboard"></div></div>
  <p class="kb-note">Physical keys follow the Arabic 101 layout. The extra row holds the Maghrebi letters.</p>
</div>`;

const darija = {
  slug: 'darija-keyboard',
  group: 'keyboards',
  icon: 'compass',
  shortTitle: 'Darija Keyboard',
  cardDesc: 'Moroccan and Maghrebi Arabic with ڭ, ڨ, پ, چ, and Arabizi.',
  title: 'Darija Keyboard – Type Moroccan and Maghrebi Arabic',
  description: 'Type Moroccan and Maghrebi Arabic online with a free Darija keyboard. Add ڭ, ڨ, پ, and چ, switch to Arabizi, and copy the text in one click.',
  h1: 'Darija keyboard for Moroccan and Maghrebi Arabic',
  lede: 'Type Darija with the letters standard Arabic keyboards leave out, or write Arabizi and let the converter produce Arabic script.',
  eyebrow: 'Maghrebi and Darija typing',
  published: '2026-10-04',
  modified: '2026-11-16',
  keywords: ['Darija keyboard', 'Moroccan Arabic keyboard', 'Maghrebi keyboard', 'Arabizi Darija'],
  ui: darijaUi,
  scripts: ['keyboard.js', 'keyboards/darija.js'],
  article: `
<p>Darija is the Arabic dialect spoken in Morocco, Algeria, Tunisia, and large diaspora communities. It is written with the same Arabic script as Modern Standard Arabic, but everyday writing borrows sounds that the 28-letter core alphabet does not represent well. A phone keyboard usually forces a workaround, and a standard Arabic keyboard simply has no key for them.</p>
<p>This page gives those letters a home. It keeps the Arabic 101 layout you already know and adds a row for <span class="ar-inline">ڭ</span>, <span class="ar-inline">ڨ</span>, <span class="ar-inline">پ</span>, <span class="ar-inline">چ</span>, and <span class="ar-inline">ڥ</span>, then pairs the keyboard with an Arabizi converter tuned for Darija vocabulary.</p>

<h2 id="why-darija-keyboard">Why a standard Arabic keyboard is not enough</h2>
<p>Moroccan Arabic uses <span class="ar-inline">ڭ</span> for the hard g in words like <span class="ar-inline">ڭلس</span> or <span class="ar-inline">ڭاع</span>, and <span class="ar-inline">ڨ</span> for the qaf sound in Tunisia and eastern Algeria. It also uses <span class="ar-inline">پ</span> for p in loanwords such as <span class="ar-inline">پارك</span> and <span class="ar-inline">چ</span> for the ch sound in <span class="ar-inline">چاي</span>. Most Arabic keyboard layouts omit every one of these characters. People end up writing g as <span class="ar-inline">غ</span> or <span class="ar-inline">ق</span>, which changes the word, or they switch to Latin letters entirely.</p>
<p>Having the correct letter matters when the text is read aloud, searched, or parsed. A recipe that says <span class="ar-inline">ڭلس</span> is unambiguous; the same word spelled with <span class="ar-inline">غ</span> may be misread as a different root.</p>

<h2 id="maghrebi-letters">The five extra letters</h2>
<div class="mapping-grid">
  <div class="map-item"><span class="map-ar">ڭ</span><span class="map-en">g</span></div>
  <div class="map-item"><span class="map-ar">ڨ</span><span class="map-en">v / q</span></div>
  <div class="map-item"><span class="map-ar">پ</span><span class="map-en">p</span></div>
  <div class="map-item"><span class="map-ar">چ</span><span class="map-en">ch</span></div>
  <div class="map-item"><span class="map-ar">ڥ</span><span class="map-en">v (Maghreb)</span></div>
</div>
<p>Use <span class="ar-inline">ڭ</span> for the g sound, <span class="ar-inline">ڨ</span> for the qaf used in many Tunisian and Algerian words, <span class="ar-inline">پ</span> for p, <span class="ar-inline">چ</span> for ch, and <span class="ar-inline">ڥ</span> for the alternative Maghrebi v. All five are clickable below the editor and appear as normal Unicode characters once copied.</p>

<h2 id="arabizi">Arabizi to Arabic in one space bar</h2>
<p>Many people write Darija in Latin script: <code>mrhba</code>, <code>labas</code>, <code>bzaf</code>, <code>wach</code>, <code>kifach</code>, <code>3afak</code>, <code>9alb</code>. Switching to the keyboard's Arabizi mode makes that habit productive. Type the word, press Space, and it becomes Arabic script.</p>
<p>The converter treats the digits as letters: 2 is <span class="ar-inline">ء</span>, 3 is <span class="ar-inline">ع</span>, 5 is <span class="ar-inline">خ</span>, 6 is <span class="ar-inline">ط</span>, 7 is <span class="ar-inline">ح</span>, and 9 is <span class="ar-inline">ق</span>. It knows that Darija <code>g</code> is usually <span class="ar-inline">ڭ</span> rather than <span class="ar-inline">غ</span>, that <code>v</code> is usually <span class="ar-inline">ڨ</span>, and that <code>ch</code> is <span class="ar-inline">ش</span>. Frequent words such as <code>mzyan</code>, <code>safi</code>, <code>daba</code>, and <code>inshallah</code> are converted as whole words instead of letter by letter.</p>
<p>If a word comes out wrong, switch to Latin mode, correct it with normal letters, then switch back. The converter does not learn from corrections, but the mode switch is instant.</p>

<h2 id="typing-layout">Typing with a physical keyboard</h2>
<p>In layout mode, your keyboard behaves like a standard Arabic keyboard: Q is <span class="ar-inline">ض</span>, W is <span class="ar-inline">ص</span>, A is <span class="ar-inline">ش</span>, and so on. The extra Maghrebi letters are available on the on-screen row, which is often faster than remembering a custom shortcut. On a phone or tablet, tap the virtual keys directly.</p>
<p>The harakat row works for Darija too. Most everyday Darija is written without vocalization, but religious phrases and teaching material often need a fatha, damma, or shadda, and the editor keeps those marks in the correct order.</p>

<h2 id="copying">Copying text into other apps</h2>
<p>Press Copy and paste into WhatsApp, Instagram, a Word document, or a subtitle editor. The characters are standard Unicode, so they do not depend on this site or on a special font. If an app displays disconnected letters, run the line through the <a href="/photoshop-text-fixer/">Arabic text fixer for Photoshop</a> before pasting.</p>
<div class="callout"><p><strong>Privacy:</strong> typing happens in your browser. Nothing you write on this page is uploaded or saved.</p></div>`,
  faq: [
    {
      q: 'Which letters does the Darija keyboard add?',
      a: 'It adds ڭ for g, ڨ for the Tunisian and Algerian qaf, پ for p, چ for ch, and ڥ as an alternative v. They appear in an extra row under the main Arabic layout.'
    },
    {
      q: 'Is Darija written differently from Arabic?',
      a: 'It uses the same script and most of the same letters, but adds a few characters for sounds that do not exist in Modern Standard Arabic. Word order and vocabulary also differ, which is why the Arabizi dictionary includes Darija words.'
    },
    {
      q: 'Can I type Arabizi with numbers?',
      a: 'Yes. In Arabizi mode, 2 becomes ء, 3 becomes ع, 5 becomes خ, 6 becomes ط, 7 becomes ح, and 9 becomes ق. Type the word, then press Space to convert it.'
    },
    {
      q: 'Does this keyboard work on a phone?',
      a: 'Yes. Tap the virtual keys, including the extra Maghrebi letters and harakat. The layout is responsive and the editor keeps the text right-to-left.'
    },
    {
      q: 'Can I use the result in Instagram or WhatsApp?',
      a: 'Yes. Copy produces ordinary Unicode text, so it pastes correctly into social apps, messaging apps, email, and word processors.'
    }
  ],
  related: ['persian-keyboard', 'arabic-text-cleaner', 'arabic-text-to-speech']
};

const persianUi = `
<div class="mode-bar">
  <div class="segmented" role="radiogroup" aria-label="Typing mode">
    <input type="radio" name="kbMode" id="modeLayout" value="layout" checked>
    <label for="modeLayout">Persian layout</label>
    <input type="radio" name="kbMode" id="modeArabizi" value="arabizi">
    <label for="modeArabizi">Finglish</label>
    <input type="radio" name="kbMode" id="modeLatin" value="latin">
    <label for="modeLatin">Latin</label>
  </div>
  <p class="mode-hint" id="modeHint"></p>
  <span class="buffer-chip" id="bufferChip" hidden>Buffer <span class="buf" id="bufferText"></span></span>
</div>
<div class="editor-wrap">
  <label class="sr-only" for="area">Persian text editor</label>
  <textarea class="editor editor--ar editor--tall" id="area" dir="rtl" lang="fa" spellcheck="false" placeholder="متن فارسی را اینجا بنویسید…"></textarea>
  <div class="editor-tools"><span>پ · چ · ژ · گ are included in the layout.</span><span class="count" id="kbCount"></span></div>
</div>
<div class="toolbar">
  <button class="btn btn-ghost btn-sm" type="button" data-kb-action="copy">Copy</button>
  <button class="btn btn-ghost btn-sm" type="button" data-kb-action="clear">Clear</button>
  <span class="sep" aria-hidden="true"></span>
  <button class="btn btn-ghost btn-sm" type="button" data-kb-action="font-plus">A+</button>
  <button class="btn btn-ghost btn-sm" type="button" data-kb-action="font-minus">A−</button>
  <span class="sep" aria-hidden="true"></span>
  <button class="btn btn-ghost btn-sm" type="button" data-kb-action="google">Search on Google</button>
  <button class="btn btn-ghost btn-sm" type="button" data-kb-action="youtube">Search on YouTube</button>
  <span class="grow"></span>
  <label class="check"><input type="checkbox" id="smartVowels" checked> Smart vowels</label>
</div>
<div class="kb">
  <div class="kb-scroll"><div class="kb-rows" id="keyboard"></div></div>
  <p class="kb-note">The on-screen keys follow the standard Persian layout used in Iran and Afghanistan.</p>
</div>`;

const persian = {
  slug: 'persian-keyboard',
  group: 'keyboards',
  icon: 'keyboard',
  shortTitle: 'Persian Keyboard',
  cardDesc: 'Farsi and Dari typing with پ, چ, ژ, گ, and Finglish conversion.',
  title: 'Persian Keyboard – Type Farsi, Dari, and Arabic Online',
  description: 'Type Persian and Farsi online with a free keyboard that includes پ, چ, ژ, and گ. Use the Finglish transliterator or the Persian layout, then copy.',
  h1: 'Persian keyboard for Farsi and Dari',
  lede: 'Type Persian with the four extra letters, the correct yeh and kaf, and a Finglish converter that understands everyday words.',
  eyebrow: 'Farsi and Persian typing',
  published: '2026-10-06',
  modified: '2026-11-15',
  keywords: ['Persian keyboard', 'Farsi keyboard', 'type Persian online', 'Finglish keyboard'],
  ui: persianUi,
  scripts: ['keyboard.js', 'keyboards/persian.js'],
  article: `
<p>Persian, also called Farsi, uses the Arabic script with four additional letters: <span class="ar-inline">پ</span> for p, <span class="ar-inline">چ</span> for ch, <span class="ar-inline">ژ</span> for zh, and <span class="ar-inline">گ</span> for g. It also uses the Persian <span class="ar-inline">ک</span> and <span class="ar-inline">ی</span> rather than the Arabic kaf and ya. A keyboard that lacks those distinctions produces text that looks almost right but reads as Arabic, not Persian.</p>
<p>This page provides a standard Persian layout, a Finglish converter, and a harakat row for the cases where diacritics are needed in teaching or poetry. Everything runs in the browser.</p>

<h2 id="persian-letters">The four letters and the two lookalikes</h2>
<p>The extra letters carry real meaning. <span class="ar-inline">پدر</span> is father, not <span class="ar-inline">بدر</span>. <span class="ar-inline">چای</span> is tea, not <span class="ar-inline">جای</span>. <span class="ar-inline">ژاله</span> is dew or hail, not <span class="ar-inline">زاله</span>. <span class="ar-inline">گل</span> is flower, not <span class="ar-inline">کل</span>.</p>
<div class="mapping-grid">
  <div class="map-item"><span class="map-ar">پ</span><span class="map-en">p</span></div>
  <div class="map-item"><span class="map-ar">چ</span><span class="map-en">ch</span></div>
  <div class="map-item"><span class="map-ar">ژ</span><span class="map-en">zh</span></div>
  <div class="map-item"><span class="map-ar">گ</span><span class="map-en">g</span></div>
  <div class="map-item"><span class="map-ar">ک</span><span class="map-en">k</span></div>
  <div class="map-item"><span class="map-ar">ی</span><span class="map-en">y</span></div>
</div>
<p>The layout also places <span class="ar-inline">ی</span> on the key where an Arabic keyboard has <span class="ar-inline">ي</span>, and <span class="ar-inline">ک</span> where it has <span class="ar-inline">ك</span>. The two forms are visually similar but are different code points, and Persian search engines and fonts expect the Persian forms.</p>

<h2 id="finglish">Type Finglish, get Persian script</h2>
<p>Finglish is Persian written with Latin letters: <code>salam</code>, <code>chetori</code>, <code>merci</code>, <code>khoda hafez</code>. In Finglish mode, type the phrase and press Space. The converter maps <code>ch</code> to <span class="ar-inline">چ</span>, <code>zh</code> to <span class="ar-inline">ژ</span>, <code>sh</code> to <span class="ar-inline">ش</span>, <code>kh</code> to <span class="ar-inline">خ</span>, <code>g</code> to <span class="ar-inline">گ</span>, and <code>k</code> to the Persian <span class="ar-inline">ک</span>.</p>
<p>Common words and phrases are converted as units, so <code>chetori</code> becomes <span class="ar-inline">چطوری</span> rather than a literal letter-by-letter guess. The converter is not a full transliteration standard; it is a practical tool for chat, notes, and captions. For formal writing, type directly in layout mode or correct the result afterward.</p>

<h2 id="layout">Typing on a physical keyboard</h2>
<p>In layout mode, the physical keys follow the common Windows Persian layout: Q is <span class="ar-inline">ض</span>, W is <span class="ar-inline">ص</span>, A is <span class="ar-inline">ش</span>, and the four Persian letters sit where Iranian users expect them. If your muscle memory comes from an Arabic keyboard, the main differences are <span class="ar-inline">ی</span> on D, <span class="ar-inline">ک</span> on the semicolon, and <span class="ar-inline">گ</span> on the apostrophe.</p>
<p>Use Latin mode when you need to type a web address, an English name, or a number without conversion. The mode switch does not clear the editor.</p>

<h2 id="persian-punctuation">Punctuation and numbers</h2>
<p>Persian uses the Arabic comma <span class="ar-inline">،</span> and question mark <span class="ar-inline">؟</span>, plus the Persian Arabic-Indic digits <span class="ar-inline">۰۱۲۳۴۵۶۷۸۹</span>. The keyboard's extra row includes the punctuation marks; the <a href="/arabic-numerals-converter/">numeral converter</a> can change digits between Persian, Arabic-Indic, and Western forms if you paste a mixed document.</p>

<h2 id="copying">Copying and sharing</h2>
<p>Press Copy, then paste into Telegram, WhatsApp, Word, or a subtitle editor. The output is Unicode and does not need this site to display. If a design app shows disconnected letters, use the <a href="/photoshop-text-fixer/">Photoshop fixer</a> on the text first.</p>
<div class="callout"><p><strong>Note:</strong> Persian and Arabic share a script but not an alphabet. Keep the Persian <span class="ar-inline">ک</span> and <span class="ar-inline">ی</span> in Persian text; replacing them with Arabic forms can break search and spell-check.</p></div>`,
  faq: [
    {
      q: 'What is the difference between a Persian and an Arabic keyboard?',
      a: 'A Persian keyboard includes پ, چ, ژ, and گ, and it uses the Persian forms of kaf and yeh (ک and ی). The physical key positions also differ from the Arabic 101 layout.'
    },
    {
      q: 'Can I type Finglish and convert it to Persian?',
      a: 'Yes. Choose Finglish mode, type a word such as chetori or salam, then press Space. The converter produces Persian script and recognizes several common words as whole units.'
    },
    {
      q: 'Are the Persian and Arabic digits different?',
      a: 'Persian uses ۰۱۲۳۴۵۶۷۸۹, while Arabic-Indic digits are ٠١٢٣٤٥٦٧٨٩. They look similar but use different code points. The numeral converter can switch between them and Western digits.'
    },
    {
      q: 'Does the keyboard support Dari?',
      a: 'Dari uses the same Persian script and the same four extra letters, so the layout works for Dari text as well. Regional vocabulary and spelling preferences may differ.'
    },
    {
      q: 'Is my text sent anywhere?',
      a: 'No. The keyboard and converter run entirely in your browser. Copying places the text on your clipboard; nothing is uploaded.'
    }
  ],
  related: ['darija-keyboard', 'arabic-braille-translator', 'arabic-text-to-speech']
};

const cleanerUi = `
<div class="field">
  <label for="text">Arabic text to clean</label>
  <textarea class="editor editor--ar editor--tall" id="text" dir="rtl" lang="ar" spellcheck="false" placeholder="الصق النص العربي هنا…"></textarea>
</div>
<div class="editor-tools"><span>Rules run only when you press Clean text.</span><span class="count" id="charCount"></span></div>
<fieldset class="options">
  <legend>Cleanup rules</legend>
  <label class="check"><input type="checkbox" id="optSpaces" checked> Collapse repeated spaces</label>
  <label class="check"><input type="checkbox" id="optLines" checked> Limit consecutive blank lines</label>
  <label class="check"><input type="checkbox" id="optPunct" checked> Convert Latin punctuation to Arabic</label>
  <label class="check"><input type="checkbox" id="optPunctSpaces" checked> Fix spacing around punctuation</label>
</fieldset>
<div class="toolbar">
  <button class="btn btn-primary" type="button" data-action="clean">Clean text</button>
  <button class="btn btn-outline" type="button" data-action="copy">Copy</button>
  <button class="btn btn-ghost" type="button" data-action="clear">Clear</button>
  <span class="grow"></span>
  <span class="tool-status" id="cleanStatus" role="status" aria-live="polite"></span>
</div>
<div class="note-box"><p>The comma rule leaves decimal numbers alone: 3,14 and 1,250.00 are not treated as sentence commas.</p></div>`;

const cleaner = {
  slug: 'arabic-text-cleaner',
  group: 'fix',
  icon: 'broom',
  shortTitle: 'Arabic Text Cleaner',
  cardDesc: 'Collapse spaces, fix line breaks, and correct Arabic punctuation.',
  title: 'Arabic Text Cleaner – Fix Spacing and Punctuation Online',
  description: 'Clean Arabic text in your browser: collapse extra spaces, repair line breaks, convert Latin punctuation, and fix comma and question mark spacing.',
  h1: 'Arabic text cleaner',
  lede: 'Paste messy Arabic and get consistent spacing, line breaks, and punctuation without editing every line by hand.',
  eyebrow: 'Clean and repair Arabic',
  published: '2026-10-08',
  modified: '2026-11-14',
  keywords: ['Arabic text cleaner', 'fix Arabic spacing', 'Arabic punctuation', 'clean Arabic text'],
  ui: cleanerUi,
  scripts: ['tools/cleaner.js'],
  article: `
<p>Arabic text rarely arrives clean. It is copied from a PDF, pasted from a chat, exported from a spreadsheet, or dictated into a phone. The words are correct, but the layout is not: double spaces, stray line breaks, Latin commas inside Arabic sentences, and punctuation glued to the next word. Reading is possible; publishing is not.</p>
<p>This cleaner applies four targeted fixes. Each one can be switched off, so you can remove only the problem you actually have. The text never leaves your browser.</p>

<h2 id="what-it-fixes">What the cleaner fixes</h2>
<ul>
  <li><strong>Repeated spaces and tabs</strong> become a single space. This is the most common issue after a PDF copy.</li>
  <li><strong>Runs of blank lines</strong> are reduced to one empty line, keeping paragraph breaks while removing page-break noise.</li>
  <li><strong>Latin punctuation</strong> is converted to Arabic forms: comma to <span class="ar-inline">،</span>, question mark to <span class="ar-inline">؟</span>, and semicolon to <span class="ar-inline">؛</span>.</li>
  <li><strong>Punctuation spacing</strong> is normalized: no space before a mark, one space after it.</li>
</ul>
<p>The order matters. Spaces are collapsed first, punctuation is converted second, and spacing is fixed last. That sequence avoids creating new double spaces after a comma has been replaced.</p>

<h2 id="commas">Commas and decimals</h2>
<p>A blind comma replacement would destroy numbers. In English and French, a comma can be a decimal separator or a thousands separator. The cleaner uses a lookaround rule: a comma is converted only when it is not surrounded by digits. That means <span class="ar-inline">3,14</span> and <code>1,250.00</code> stay untouched, while the comma in <span class="ar-inline">مرحبا، كيف حالك</span> becomes Arabic.</p>
<p>If your document mixes French decimal commas and Arabic sentence commas, check a sample after cleaning. When in doubt, turn off the punctuation rule and convert sentence commas with the <a href="/arabic-punctuation-converter/">punctuation converter</a>, where you can see the result live.</p>

<h2 id="line-breaks">Line breaks from PDFs and emails</h2>
<p>PDF extraction often inserts a line break at the end of every visual line. The cleaner reduces three or more newlines to two, but it does not join wrapped lines automatically. Joining is risky because Arabic paragraphs legitimately start on a new line. If you need to rebuild paragraphs, use the <a href="/find-and-replace/">find and replace</a> tool to remove single newlines, then restore paragraph breaks manually.</p>

<h2 id="punctuation-spacing">Why spacing around punctuation matters</h2>
<p>Arabic typesetting follows the same basic rule as Latin: punctuation attaches to the preceding word, with a space after it. A comma floating between two words looks like a separate token and can confuse search, screen readers, and word counters. The cleaner removes the space before <span class="ar-inline">،</span> <span class="ar-inline">؛</span> <span class="ar-inline">؟</span> and adds a space after, but it avoids adding a space before a closing bracket or quote.</p>

<h2 id="before-after">A short before-and-after</h2>
<div class="example">
  <span class="example-label">Before</span>
  <p><span class="ar-inline">كان  الجو  جميلا , فقررنا الخروج ; لكننا عدنا سريعا ؟</span></p>
  <span class="example-label">After</span>
  <p><span class="ar-inline">كان الجو جميلا، فقررنا الخروج؛ لكننا عدنا سريعا؟</span></p>
</div>
<p>The words are identical. Only spaces and punctuation changed, which is exactly the point: the cleaner should not rewrite your Arabic, only its presentation.</p>

<h2 id="when-not">When not to clean</h2>
<p>Do not run the punctuation rule on source code, URLs, or bilingual tables where the Latin comma is part of the data. For those, disable punctuation conversion and use only the space and line-break rules. The checkboxes exist so the tool can be as narrow as the job requires.</p>`,
  faq: [
    {
      q: 'Does the cleaner change the meaning of my text?',
      a: 'No. It only changes whitespace and punctuation. Words and letters are untouched, and every rule can be disabled before you run it.'
    },
    {
      q: 'Will it break decimal numbers that use a comma?',
      a: 'No. A comma between two digits is left alone, so 3,14 and 1,250.00 survive. Only commas used as sentence punctuation are converted to the Arabic comma.'
    },
    {
      q: 'Can it join lines that were split by a PDF?',
      a: 'It reduces long runs of blank lines but does not join wrapped lines automatically. Use find and replace to remove single newlines, then add paragraph breaks where needed.'
    },
    {
      q: 'Is the cleaning reversible?',
      a: 'Not automatically. Keep a copy of the original if you may need it. The editor itself does not keep a history, and reloading the page clears it.'
    },
    {
      q: 'Does it work with mixed Arabic and English?',
      a: 'Yes, but decide about punctuation first. Disable Latin-to-Arabic punctuation conversion if the English sentences need to keep Latin commas and question marks.'
    }
  ],
  related: ['arabic-punctuation-converter', 'find-and-replace', 'arabic-word-counter']
};

const punctuationUi = `
<div class="segmented" role="radiogroup" aria-label="Conversion direction">
  <input type="radio" name="pmode" id="pmodeAr" value="toArabic" checked>
  <label for="pmodeAr">Latin → Arabic</label>
  <input type="radio" name="pmode" id="pmodeLat" value="toLatin">
  <label for="pmodeLat">Arabic → Latin</label>
</div>
<div class="split">
  <div class="field">
    <div class="split-label"><span id="inputLabel">Latin punctuation</span></div>
    <textarea class="editor editor--ar" id="inputBox" dir="rtl" lang="ar" spellcheck="false" placeholder="Hello, how are you?"></textarea>
  </div>
  <div class="field">
    <div class="split-label"><span id="outputLabel">Arabic punctuation</span></div>
    <textarea class="editor editor--ar" id="outputBox" dir="rtl" lang="ar" readonly placeholder="النتيجة تظهر هنا…"></textarea>
  </div>
</div>
<div class="toolbar">
  <button class="btn btn-outline" type="button" data-action="copy">Copy result</button>
  <button class="btn btn-ghost" type="button" data-action="clear">Clear</button>
  <span class="grow"></span>
  <span class="tool-status" id="punctStatus" role="status" aria-live="polite"></span>
</div>`;

const punctuation = {
  slug: 'arabic-punctuation-converter',
  group: 'fix',
  icon: 'quote',
  shortTitle: 'Punctuation Converter',
  cardDesc: 'Switch commas, question marks, and semicolons between scripts.',
  title: 'Arabic Punctuation Converter – Commas and Marks Online',
  description: 'Convert Arabic and Latin punctuation both ways. Replace commas, question marks, and semicolons without changing decimals, phone numbers, or URLs.',
  h1: 'Arabic punctuation converter',
  lede: 'Swap Latin commas, question marks, and semicolons for their Arabic equivalents, or go back the other way, without touching numbers.',
  eyebrow: 'Punctuation that fits the script',
  published: '2026-10-10',
  modified: '2026-11-13',
  keywords: ['Arabic punctuation', 'Arabic comma', 'convert punctuation', 'Arabic question mark'],
  ui: punctuationUi,
  scripts: ['tools/punctuation.js'],
  article: `
<p>Arabic has its own punctuation marks. The comma is <span class="ar-inline">،</span>, the question mark is <span class="ar-inline">؟</span>, and the semicolon is <span class="ar-inline">؛</span>. They occupy the same role as the Latin marks but use different Unicode characters. A document that uses <code>,</code> and <code>?</code> inside Arabic text is readable, yet it looks foreign to Arabic typesetting and may fail a simple character check.</p>
<p>This converter changes only those three marks. It leaves letters, spaces, numbers, quotes, and brackets alone. You can go from Latin to Arabic or from Arabic back to Latin, and the result updates as you type.</p>

<h2 id="why-arabic-marks">Why use Arabic punctuation?</h2>
<p>Punctuation is part of the script's visual grammar. The Arabic comma sits on the baseline and points in the direction of the text; the Latin comma hangs below it. In a right-to-left paragraph, the Arabic question mark mirrors the Latin shape. Using the correct marks produces a page that looks native to Arabic readers, whether it is a school essay, a product label, or a subtitle.</p>
<p>There is also a technical reason. Search engines, screen readers, and text-to-speech engines can use punctuation to decide where a sentence ends. A Latin question mark inside Arabic may be spoken with a different intonation or ignored by a language model trained on Arabic text.</p>

<h2 id="what-converts">What gets converted</h2>
<div class="table-wrap">
  <table>
    <thead><tr><th>Latin</th><th>Arabic</th><th>Name</th></tr></thead>
    <tbody>
      <tr><td><code>,</code></td><td><span class="ar-inline">،</span></td><td>Comma</td></tr>
      <tr><td><code>;</code></td><td><span class="ar-inline">؛</span></td><td>Semicolon</td></tr>
      <tr><td><code>?</code></td><td><span class="ar-inline">؟</span></td><td>Question mark</td></tr>
    </tbody>
  </table>
</div>
<p>Exclamation marks, colons, periods, parentheses, and quotation marks are not changed, because Arabic commonly uses the same characters for those. That keeps the conversion focused and avoids surprising side effects.</p>

<h2 id="decimals">Decimals stay intact</h2>
<p>The comma rule uses a negative lookbehind and lookahead: a comma is converted only when it is not between two digits. A French decimal comma in <code>3,14</code> or a thousands separator in <code>1,250.00</code> remains a Latin comma. This is important when the text contains prices, measurements, or coordinates.</p>
<p>If your Arabic text legitimately uses a Latin comma between digits as sentence punctuation, the tool will skip it. That is rare, and the alternative, corrupting every number, is worse.</p>

<h2 id="direction">Converting back to Latin</h2>
<p>The reverse direction is useful when an Arabic sentence must be pasted into an English document or a form that only accepts ASCII punctuation. It converts <span class="ar-inline">،</span> to a comma, <span class="ar-inline">؟</span> to a question mark, and <span class="ar-inline">؛</span> to a semicolon. The text direction is a separate matter; this tool changes characters, not the paragraph direction.</p>
<p>The output box stays right-to-left so Arabic remains readable, but you can copy the content into a left-to-right field. If the field displays the sentence in the wrong order, that is a bidirectional layout issue in the destination app, not a punctuation problem.</p>

<h2 id="copy">A safe, local conversion</h2>
<p>Type or paste on the left, read the result on the right, then press Copy. The conversion runs in JavaScript in your browser. Nothing is uploaded, and the editor is cleared when you reload the page.</p>
<div class="callout"><p><strong>Related:</strong> if the text also has extra spaces or broken line breaks, run it through the <a href="/arabic-text-cleaner/">Arabic text cleaner</a> first, then convert punctuation here.</p></div>`,
  faq: [
    {
      q: 'Which punctuation marks are converted?',
      a: 'Only the comma, question mark, and semicolon, in both directions. Periods, exclamation marks, colons, quotes, and brackets are left as they are.'
    },
    {
      q: 'Will my decimal commas be changed?',
      a: 'No. A comma between two digits is not converted, so 3,14 and 1,250.00 remain unchanged. Only sentence commas become the Arabic comma.'
    },
    {
      q: 'Can I convert Arabic punctuation back to Latin?',
      a: 'Yes. Choose the Arabic to Latin direction. The tool replaces ، with a comma, ؟ with a question mark, and ؛ with a semicolon.'
    },
    {
      q: 'Does it change the direction of the text?',
      a: 'No. It only changes characters. The output box remains right-to-left for readability; direction in another app depends on that app.'
    },
    {
      q: 'Is the conversion instant?',
      a: 'Yes. The result updates as you type or paste, so you can check each change before copying.'
    }
  ],
  related: ['arabic-text-cleaner', 'find-and-replace', 'arabic-url-encoder']
};

const photoshopUi = `
<div class="split">
  <div class="field">
    <label for="inputBox">Normal Arabic text</label>
    <textarea class="editor editor--ar editor--tall" id="inputBox" dir="rtl" lang="ar" spellcheck="false" placeholder="اكتب أو الصق النص هنا…"></textarea>
  </div>
  <div class="field">
    <div class="split-label"><span>Photoshop-ready result</span><span class="item-count">visual order</span></div>
    <textarea class="editor editor--mono editor--tall" id="outputBox" dir="ltr" readonly placeholder="النتيجة تظهر هنا…"></textarea>
  </div>
</div>
<div class="toolbar">
  <button class="btn btn-outline" type="button" data-action="copy">Copy for Photoshop</button>
  <button class="btn btn-ghost" type="button" data-action="clear">Clear</button>
  <span class="grow"></span>
  <span class="tool-status" id="psStatus" role="status" aria-live="polite"></span>
</div>
<div class="note-box"><p>Paste the right-hand result into a text layer with a font that contains Arabic presentation forms. Keep the layer direction left-to-right.</p></div>`;

const photoshop = {
  slug: 'photoshop-text-fixer',
  group: 'fix',
  icon: 'sparkles',
  shortTitle: 'Photoshop Text Fixer',
  cardDesc: 'Turn disconnected Arabic letters into joined forms for design apps.',
  title: 'Arabic Photoshop Text Fixer – Fix Disconnected Letters',
  description: 'Fix Arabic text for Photoshop and older design apps. Convert disconnected letters into joined presentation forms, line by line, ready for any text layer.',
  h1: 'Arabic text fixer for Photoshop',
  lede: 'Paste Arabic that appears as isolated letters and get a joined, visual-order string that older design software can display correctly.',
  eyebrow: 'Design-app text repair',
  published: '2026-10-12',
  modified: '2026-11-12',
  keywords: ['Photoshop Arabic text', 'Arabic letters disconnected', 'Arabic presentation forms', 'Arabic design text'],
  ui: photoshopUi,
  scripts: ['tools/photoshop.js'],
  article: `
<p>Photoshop, Illustrator, and several older design programs do not always apply Arabic shaping. Instead of joining letters into words, they draw each letter in its isolated form. The result looks like <span class="ar-inline">م ح م د</span> instead of <span class="ar-inline">محمد</span>. Typing the text again does not help, because the problem is in the shaping engine, not the keyboard.</p>
<p>This tool works around the problem. It converts each Arabic letter to the correct Unicode presentation form, chooses initial, medial, final, or isolated shapes based on its neighbors, then writes the line in visual order. The output is a string of characters that a non-shaping text layer can display as connected Arabic.</p>

<h2 id="why-it-happens">Why the letters separate</h2>
<p>Arabic letters change shape depending on whether they connect to the letter before, after, both, or neither. A proper text engine performs this shaping automatically using contextual rules. Some design applications, especially versions configured for Latin-only text, skip the rules and render the base characters. The font may also lack the OpenType tables needed for Arabic.</p>
<p>The workaround is older than Unicode: use the Arabic Presentation Forms block. Those code points already contain the isolated, final, initial, and medial shape of each letter. If the software cannot shape, it can still draw the pre-shaped glyph.</p>

<h2 id="how-to-use">How to use the fixer</h2>
<ol>
  <li>Paste the Arabic line into the left box. One line per text layer works best.</li>
  <li>Read the right-hand result. It is shown left-to-right because that is the visual order the design app needs.</li>
  <li>Press <strong>Copy for Photoshop</strong>.</li>
  <li>Create a text layer, set the direction to left-to-right, and paste. Choose an Arabic font that includes presentation forms.</li>
</ol>
<p>The conversion is live, so each new line updates immediately. If the text contains English words or numbers, they are kept as normal characters and placed in the same visual order.</p>

<h2 id="ligatures">Lam-alef and other ligatures</h2>
<p>The combination of lam and alef is normally written as a single ligature, not two letters. The tool handles <span class="ar-inline">لا</span>, <span class="ar-inline">لأ</span>, <span class="ar-inline">لإ</span>, and <span class="ar-inline">لآ</span> as ligature tokens before shaping the surrounding letters. That prevents the common bug where the lam and alef both take isolated forms and the word looks broken in a different way.</p>
<p>Diacritics are attached to their letter after the shape is chosen, so a fatha stays with the consonant it belongs to. Tatweel is treated as a joining character, which preserves deliberate stretching in the source.</p>

<h2 id="limits">What this method cannot do</h2>
<p>This is a compatibility fix, not a substitute for proper Arabic text support. The output is no longer normal logical-order Arabic: searching, editing, and screen readers will not treat it as a sentence. Keep the original text in a separate document. If your design app has a Middle Eastern text engine or a recent version with Arabic support, use that first.</p>
<p>The output also depends on the font. Some fonts include only a subset of presentation forms, and a few modern fonts drop them entirely. Test one word before setting a whole poster.</p>

<h2 id="alternatives">Better alternatives when available</h2>
<p>If you control the design file, enable the Middle Eastern text engine in Photoshop, or set the paragraph direction to right-to-left and choose an Arabic-capable font. In Illustrator, use the World-Ready composer. In InDesign, use the Middle East version or the Adobe World-Ready paragraph composer. The fixer is for the cases where none of those options exist, such as an old template, a locked file, or a plugin that only understands Latin text.</p>
<div class="callout"><p><strong>Keep a copy:</strong> store the original logical Arabic somewhere safe. The visual-order result is for display only.</p></div>`,
  faq: [
    {
      q: 'Why does Arabic look disconnected in Photoshop?',
      a: 'The application is not applying Arabic shaping rules, so each letter is drawn in its isolated form. Older Photoshop versions and some templates with Latin-only text settings cause this.'
    },
    {
      q: 'How does the fixer solve it?',
      a: 'It replaces each letter with the correct Unicode presentation form (initial, medial, final, or isolated) and arranges the line in visual order, which a non-shaping text layer can display as connected Arabic.'
    },
    {
      q: 'Can I edit the result as normal Arabic afterward?',
      a: 'No. The result is a display string, not logical-order Arabic. Keep the original text for editing, search, and accessibility, and use the fixed string only inside the design.'
    },
    {
      q: 'Does it work for multiple lines?',
      a: 'Yes. Each line is processed separately, so you can paste a paragraph and copy it line by line into separate text layers, or paste the whole block at once.'
    },
    {
      q: 'Why do some words still look wrong?',
      a: 'The font may lack the needed presentation forms, or the layer direction may be set to right-to-left. Use an Arabic-capable font and keep the layer left-to-right for this visual-order output.'
    }
  ],
  related: ['arabic-text-cleaner', 'arabic-punctuation-converter', 'darija-keyboard']
};

const tafqitUi = `
<div class="number-inline">
  <div class="field">
    <label for="numberInput">Amount or number</label>
    <input class="input" id="numberInput" type="text" inputmode="numeric" value="1250" autocomplete="off" spellcheck="false">
  </div>
  <div class="field">
    <label for="currency">Currency</label>
    <select class="select" id="currency">
      <option value="none">No currency</option>
      <option value="eur">Euro (يورو)</option>
      <option value="usd">US dollar (دولار أمريكي)</option>
      <option value="mad" selected>Moroccan dirham (درهم مغربي)</option>
      <option value="dzd">Algerian dinar (دينار جزائري)</option>
      <option value="tnd">Tunisian dinar (دينار تونسي)</option>
      <option value="aed">UAE dirham (درهم إماراتي)</option>
      <option value="sar">Saudi riyal (ريال سعودي)</option>
      <option value="qar">Qatari riyal (ريال قطري)</option>
      <option value="egp">Egyptian pound (جنيه مصري)</option>
    </select>
  </div>
</div>
<div class="example-chips">
  <button class="chip" type="button" data-example="0">0</button>
  <button class="chip" type="button" data-example="1250">1,250</button>
  <button class="chip" type="button" data-example="2026">2,026</button>
  <button class="chip" type="button" data-example="150000">150,000</button>
</div>
<label class="check" style="margin-top:12px"><input type="checkbox" id="wrapPhrase" checked> Add فقط … لا غير for cheques and contracts</label>
<div class="result-box result-box--ar" id="outputBox" aria-live="polite">…</div>
<div class="toolbar">
  <button class="btn btn-outline" type="button" data-action="copy">Copy wording</button>
  <button class="btn btn-ghost" type="button" data-action="clear">Clear</button>
  <span class="grow"></span>
  <span class="tool-status" id="tafqitStatus" role="status" aria-live="polite"></span>
</div>`;

const tafqit = {
  slug: 'tafqit',
  group: 'convert',
  icon: 'banknote',
  shortTitle: 'Tafqit Converter',
  cardDesc: 'Write numbers in Arabic words for cheques and invoices.',
  title: 'Tafqit Tool – Arabic Number to Words Converter Online',
  description: 'Convert Arabic numbers to written words for cheques, invoices, and contracts. Choose a currency, add the formal only phrase, and copy the result.',
  h1: 'Tafqit: convert numbers to Arabic words',
  lede: 'Turn 1,250 into one thousand two hundred and fifty in Arabic, with the right grammar, currency name, and formal cheque wrapper.',
  eyebrow: 'Numbers in Arabic words',
  published: '2026-10-14',
  modified: '2026-11-11',
  keywords: ['tafqit', 'Arabic number to words', 'Arabic cheque amount', 'number to Arabic words'],
  ui: tafqitUi,
  scripts: ['tools/tafqit.js'],
  article: `
<p>Tafqit is the process of writing a number in words, usually for a cheque, invoice, or contract. A bank may accept a numeral, but the written amount is what protects both parties when handwriting is unclear or a digit is altered. Arabic tafqit follows grammar rules: the unit, the decade, and the scale word change form depending on the number.</p>
<p>This converter handles whole numbers from zero to 999,999,999,999,999 and adds the Arabic name of a currency. The result is normal Arabic text that you can copy into any document.</p>

<h2 id="how-to-use">How to write an Arabic amount</h2>
<ol>
  <li>Enter the amount without spaces or separators. Commas are accepted but not required.</li>
  <li>Choose a currency, or leave it as “No currency” if you only need the number in words.</li>
  <li>Leave the formal phrase option on if the result is for a cheque or contract.</li>
  <li>Press Copy and paste the wording next to the numeral.</li>
</ol>
<p>For 1,250 Moroccan dirhams, the output is <span class="ar-inline">ألف ومائتان وخمسون درهم مغربي</span>, wrapped as <span class="ar-inline">فقط ألف ومائتان وخمسون درهم مغربي لا غير</span>. The wrapper means “only”, which is the standard way to close a cheque amount and prevent additions.</p>

<h2 id="grammar">The grammar behind the words</h2>
<p>Arabic numbers are not a simple substitution table. The converter applies the main rules:</p>
<ul>
  <li>Units from one to nine use the basic forms: <span class="ar-inline">واحد، اثنان، ثلاثة…</span>.</li>
  <li>Teens from eleven to nineteen have their own forms: <span class="ar-inline">أحد عشر، اثنا عشر…</span>.</li>
  <li>Tens are <span class="ar-inline">عشرون، ثلاثون…</span>, and a unit before a ten is joined with <span class="ar-inline">و</span>: <span class="ar-inline">خمسة وعشرون</span>.</li>
  <li>Hundreds are <span class="ar-inline">مائة، مائتان، ثلاثمائة…</span>.</li>
  <li>Thousands, millions, billions, and trillions switch between singular, dual, and plural forms depending on the group: <span class="ar-inline">ألف، ألفان، آلاف</span>.</li>
</ul>
<p>The result is not a word-for-word translation of English. It follows how an Arabic speaker writes the amount, which is why the scale words change and why the conjunction appears before the last group.</p>

<h2 id="currencies">Currency names</h2>
<p>The currency list covers the euro, US dollar, Moroccan dirham, Algerian dinar, Tunisian dinar, UAE dirham, Saudi riyal, Qatari riyal, and Egyptian pound. The name is appended in the masculine singular, which is the common form on cheques. If your bank requires a specific grammatical form or a subdivision such as centimes or halalas, copy the number in words without a currency and add the required wording yourself.</p>

<h2 id="limits">Limits and decimals</h2>
<p>The converter accepts whole, non-negative numbers only. It does not handle fractional amounts or negative values. For a price such as 1,250.50, write the whole amount here, then add the fraction manually in the currency's subdivision. The maximum is 999,999,999,999,999; larger values are rejected to avoid a misleading result.</p>

<h2 id="checking">Checking the result</h2>
<p>Read the output aloud or compare it with a known invoice. Check three things: the scale word (thousand, million), the final unit, and the currency name. Then confirm that the numeral and the written amount match. A written amount is a legal statement, so a second human check is always worth the minute it takes.</p>
<div class="callout"><p><strong>Tip:</strong> keep the digits in Western form for the numeral field and use this tool only for the written line. Mixing Arabic-Indic digits and words is fine, but consistency makes the document easier to audit.</p></div>`,
  faq: [
    {
      q: 'What does tafqit mean?',
      a: 'Tafqit is writing a number in words, especially the amount on a cheque or contract. In Arabic it follows specific grammar rules for units, tens, hundreds, and scale words.'
    },
    {
      q: 'Which currencies are supported?',
      a: 'The tool supports the euro, US dollar, Moroccan dirham, Algerian dinar, Tunisian dinar, UAE dirham, Saudi riyal, Qatari riyal, and Egyptian pound, plus a no-currency option.'
    },
    {
      q: 'Can it convert decimals or negative numbers?',
      a: 'No. It accepts whole, non-negative numbers only. For a fractional amount, convert the whole part and add the subdivision manually.'
    },
    {
      q: 'What does فقط … لا غير mean?',
      a: 'It means “only” and is the traditional wrapper for cheque amounts. It closes the sentence and makes it harder to add words or digits after the written amount.'
    },
    {
      q: 'What is the largest number it accepts?',
      a: '999,999,999,999,999, which covers trillions. Larger numbers are rejected so the output is not misleading.'
    }
  ],
  related: ['arabic-numerals-converter', 'arabic-word-frequency', 'arabic-text-cleaner']
};

module.exports = [darija, persian, cleaner, punctuation, photoshop, tafqit];
