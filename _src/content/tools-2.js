const sorterUi = `
<div class="split">
  <div class="field">
    <div class="split-label"><span>Your list</span><span class="item-count" id="inputCount">0 lines</span></div>
    <textarea class="editor editor--tall" id="inputBox" dir="auto" placeholder="نخلة&#10;تفاحة&#10;برتقال&#10;موز"></textarea>
  </div>
  <div class="field">
    <div class="split-label"><span>Sorted list</span><span class="item-count" id="outputCount">0 lines</span></div>
    <textarea class="editor editor--tall" id="outputBox" dir="auto" readonly placeholder="النتيجة تظهر هنا…"></textarea>
  </div>
</div>
<fieldset class="options">
  <legend>Sorting rules</legend>
  <div class="segmented">
    <input type="radio" name="sortOrder" id="sortAsc" value="asc" checked>
    <label for="sortAsc">A → ي</label>
    <input type="radio" name="sortOrder" id="sortDesc" value="desc">
    <label for="sortDesc">ي → A</label>
  </div>
  <label class="check"><input type="checkbox" id="removeDuplicates"> Remove duplicate lines</label>
  <label class="check"><input type="checkbox" id="removeEmpty"> Skip empty lines</label>
</fieldset>
<div class="toolbar">
  <button class="btn btn-outline" type="button" data-action="copy">Copy sorted list</button>
  <button class="btn btn-ghost" type="button" data-action="clear">Clear</button>
</div>`;

const sorter = {
  slug: 'alphabetical-sorter',
  group: 'analyze',
  icon: 'sort',
  shortTitle: 'Arabic Alphabetical Sorter',
  cardDesc: 'Sort Arabic lines with proper collation and optional dedupe.',
  title: 'Arabic Alphabetical Sorter – Sort Any Arabic List Online',
  description: 'Sort Arabic lists online with true Arabic alphabetical order. Choose ascending or descending, remove duplicates, skip empty lines, and copy the result.',
  h1: 'Arabic alphabetical sorter',
  lede: 'Sort names, words, or any Arabic list by the Arabic alphabet, not by Unicode order or the Latin alphabet.',
  eyebrow: 'Order Arabic lists correctly',
  published: '2026-10-16',
  modified: '2026-11-10',
  keywords: ['Arabic alphabetical order', 'sort Arabic list', 'Arabic sorter', 'alphabetize Arabic'],
  ui: sorterUi,
  scripts: ['tools/sorter.js'],
  article: `
<p>Sorting Arabic with a basic character-code comparison produces the wrong order. Unicode code points do not follow the Arabic alphabet, and many letters have variants, diacritics, and presentation forms. A list that looks sorted to a computer can look random to an Arabic reader.</p>
<p>This tool uses the browser's Arabic collator, which implements the alphabet order used in dictionaries and directories. It sorts line by line, handles Arabic-Indic digits numerically, and can remove duplicates or empty lines before sorting.</p>

<h2 id="arabic-order">The Arabic alphabet order</h2>
<p>Arabic dictionary order starts with <span class="ar-inline">ا</span>, <span class="ar-inline">ب</span>, <span class="ar-inline">ت</span>, <span class="ar-inline">ث</span>, <span class="ar-inline">ج</span>, <span class="ar-inline">ح</span>, <span class="ar-inline">خ</span>, and continues through <span class="ar-inline">د</span>, <span class="ar-inline">ذ</span>, <span class="ar-inline">ر</span>, <span class="ar-inline">ز</span>, <span class="ar-inline">س</span>, <span class="ar-inline">ش</span>, <span class="ar-inline">ص</span>, <span class="ar-inline">ض</span>, <span class="ar-inline">ط</span>, <span class="ar-inline">ظ</span>, <span class="ar-inline">ع</span>, <span class="ar-inline">غ</span>, <span class="ar-inline">ف</span>, <span class="ar-inline">ق</span>, <span class="ar-inline">ك</span>, <span class="ar-inline">ل</span>, <span class="ar-inline">م</span>, <span class="ar-inline">ن</span>, <span class="ar-inline">ه</span>, <span class="ar-inline">و</span>, and <span class="ar-inline">ي</span>. The collator also places the hamza forms near their base letters and treats diacritics as secondary differences, which is what a phone book or index expects.</p>

<h2 id="collation">Why “sensitivity: base” matters</h2>
<p>The sorter compares words at the base-letter level. A word with a fatha and the same word without it land next to each other instead of being separated by every other entry. Numeric sorting is enabled too, so item 2 comes before item 10 rather than after it.</p>
<p>Case is irrelevant for Arabic, but it matters for mixed lists. Latin names are compared with the same collator, which keeps a bilingual list predictable instead of dropping English entries to the end alphabetically by byte value.</p>

<h2 id="how-to-use">How to sort a list</h2>
<ol>
  <li>Paste one item per line. Extra spaces at the edges are trimmed.</li>
  <li>Choose ascending (A → ي) or descending (ي → A).</li>
  <li>Turn on duplicate removal if the list came from a form or a merge.</li>
  <li>Turn on empty-line skipping if the paste includes blank rows.</li>
  <li>Copy the sorted list back into your spreadsheet, document, or code.</li>
</ol>
<p>The result updates as you type. The line counters show how many lines went in and how many remain after filtering.</p>

<h2 id="duplicates">Duplicates and near-duplicates</h2>
<p>Duplicate removal is case-insensitive for Latin and ignores nothing else. Two Arabic words that differ only in diacritics are treated as different strings, because the marks can change pronunciation and meaning. If you want to merge them, remove the harakat first with the <a href="/arabic-harakat-remover/">harakat remover</a>, then sort and deduplicate.</p>
<p>Whitespace inside a line is preserved. If a spreadsheet export adds trailing tabs, they remain visible in the output but do not usually affect the order. Clean them with the <a href="/arabic-text-cleaner/">text cleaner</a> if they matter.</p>

<h2 id="use-cases">Where an Arabic sorter helps</h2>
<ul>
  <li>Alphabetizing patient or student lists before printing.</li>
  <li>Sorting a glossary, index, or table of contents.</li>
  <li>Checking which names appear twice in a merged contact list.</li>
  <li>Arranging a vocabulary list for a class, from <span class="ar-inline">أ</span> to <span class="ar-inline">ي</span>.</li>
</ul>
<div class="callout"><p><strong>One item per line:</strong> the tool sorts lines, not comma-separated cells. Split a comma-separated list first, or paste it into a spreadsheet and copy the column.</p></div>`,
  faq: [
    {
      q: 'Does it use the real Arabic alphabet order?',
      a: 'Yes. It uses the browser Arabic collator, which follows dictionary order rather than Unicode code-point order. Hamza forms and diacritics are handled as secondary differences.'
    },
    {
      q: 'Can it sort numbers correctly?',
      a: 'Yes. Numeric sorting is enabled, so 2 comes before 10. Arabic-Indic and Western digits are compared as numbers, not as text characters.'
    },
    {
      q: 'How does duplicate removal work?',
      a: 'It compares trimmed lines and ignores Latin case. Two lines that differ only in Arabic harakat are kept as separate entries because the marks can change the word.'
    },
    {
      q: 'Can I sort a comma-separated list?',
      a: 'The tool works line by line. Replace commas with line breaks first, or paste the column from a spreadsheet, then sort.'
    },
    {
      q: 'Is there a limit on the number of lines?',
      a: 'There is no fixed limit beyond what your browser can handle. Very large pastes may take a moment; the sort runs locally and does not upload anything.'
    }
  ],
  related: ['arabic-word-frequency', 'arabic-text-cleaner', 'arabic-word-counter']
};

const extractorUi = `
<div class="field">
  <label for="inputBox">Mixed text</label>
  <textarea class="editor editor--ar editor--tall" id="inputBox" dir="auto" placeholder="الصق هنا نصاً مختلطاً بالإنجليزية والأرقام والرموز…"></textarea>
</div>
<fieldset class="options">
  <legend>Keep in the result</legend>
  <label class="check"><input type="checkbox" id="keepNumbers" checked> Numbers</label>
  <label class="check"><input type="checkbox" id="keepPunctuation" checked> Punctuation</label>
  <label class="check"><input type="checkbox" id="keepHarakat"> Harakat</label>
  <label class="check"><input type="checkbox" id="keepNewlines" checked> Line breaks</label>
</fieldset>
<div class="field" style="margin-top:14px">
  <div class="split-label"><span>Extracted Arabic</span></div>
  <textarea class="editor editor--ar editor--tall" id="outputBox" dir="rtl" lang="ar" readonly placeholder="النص العربي فقط يظهر هنا…"></textarea>
</div>
<div class="toolbar">
  <button class="btn btn-outline" type="button" data-action="copy">Copy result</button>
  <button class="btn btn-ghost" type="button" data-action="clear">Clear</button>
  <span class="grow"></span>
  <span class="tool-status" id="extractStatus" role="status" aria-live="polite"></span>
</div>`;

const extractor = {
  slug: 'arabic-text-extractor',
  group: 'analyze',
  icon: 'filter',
  shortTitle: 'Arabic Text Extractor',
  cardDesc: 'Strip Latin, symbols, and noise; keep only Arabic content.',
  title: 'Arabic Text Extractor – Keep Only Arabic Letters Online',
  description: 'Extract Arabic text from mixed content. Remove Latin letters, emoji, symbols, and markup while keeping the Arabic words, numbers, and punctuation you need.',
  h1: 'Arabic text extractor',
  lede: 'Paste a mixed page, table, or OCR dump and keep only the Arabic characters, with optional numbers, punctuation, and line breaks.',
  eyebrow: 'Separate Arabic from noise',
  published: '2026-10-18',
  modified: '2026-11-09',
  keywords: ['extract Arabic text', 'Arabic text extractor', 'remove English from Arabic', 'Arabic OCR cleanup'],
  ui: extractorUi,
  scripts: ['tools/extractor.js'],
  article: `
<p>Arabic content is often buried in material that is not Arabic: a bilingual web page, an OCR export with English interface labels, a spreadsheet with codes, or a PDF where every line includes a page number. Copying the useful part by hand is slow and error-prone.</p>
<p>This extractor scans the text and keeps only the characters you allow. By default it keeps Arabic letters, numbers, punctuation, spaces, and line breaks. Latin letters, emoji, symbols, markup, and control characters are removed. The result is a clean Arabic body that you can paste into a document, subtitle, or dataset.</p>

<h2 id="what-counts">What counts as Arabic</h2>
<p>The tool accepts the main Arabic block, the Arabic Supplement and Extended blocks, and the Arabic presentation forms. That covers ordinary letters, <span class="ar-inline">ڭ</span>, <span class="ar-inline">ڨ</span>, <span class="ar-inline">پ</span>, <span class="ar-inline">چ</span>, <span class="ar-inline">ژ</span>, and <span class="ar-inline">گ</span>, as well as Persian and Urdu additions. It does not keep Latin transliteration, Cyrillic, Hebrew, or CJK characters.</p>
<p>Spaces and tabs are always allowed because words need separation. Tabs are normalized to spaces when line breaks are off. Runs of spaces are collapsed, and three or more newlines are reduced to two when line breaks are on.</p>

<h2 id="options">Choosing what to keep</h2>
<ul>
  <li><strong>Numbers</strong> keeps both Western digits and Arabic-Indic digits. Turn it off when you want words only, such as a vocabulary list.</li>
  <li><strong>Punctuation</strong> keeps the common Arabic and Latin marks: comma, period, question mark, semicolon, colon, quotes, brackets, and guillemets.</li>
  <li><strong>Harakat</strong> keeps the short vowels and shadda. Leave it off to produce unvocalized text for search or word counting.</li>
  <li><strong>Line breaks</strong> preserves the paragraph structure. Turn it off to flatten everything into one paragraph.</li>
</ul>
<p>Each option changes the allowlist immediately, so you can compare results without re-pasting.</p>

<h2 id="use-cases">Practical uses</h2>
<h3 id="ocr">Cleaning OCR output</h3>
<p>OCR often inserts stray Latin characters where it misread a shape. Extracting only Arabic removes the noise but keeps the words and numbers you need to check.</p>
<h3 id="bilingual">Separating a bilingual page</h3>
<p>If a page alternates English navigation with Arabic content, extraction leaves the Arabic paragraphs in place and drops the interface text. Turn off line breaks to merge the result into a single block.</p>
<h3 id="datasets">Preparing a text dataset</h3>
<p>For frequency analysis or language modeling, remove markup, URLs, and Latin code first. The <a href="/arabic-word-frequency/">frequency counter</a> then sees only Arabic tokens, which produces a more meaningful word list.</p>

<h2 id="what-is-lost">What the extractor cannot preserve</h2>
<p>It is a character filter, not a parser. It does not know that a particular Latin word is a name that should stay, or that a symbol is meaningful in a mathematical formula. It also does not fix broken Arabic letters or reversed order; those need a shaping or bidi fix. If the source has disconnected presentation forms, use the <a href="/photoshop-text-fixer/">Photoshop fixer</a> or retype the line.</p>
<p>Because the filter is aggressive, keep the original text somewhere until you have checked the result. The editor does not keep a history.</p>

<h2 id="privacy">Local and instant</h2>
<p>The extraction runs in your browser. Nothing is uploaded, and the text disappears when the page is closed. That makes the tool suitable for internal documents and personal notes as well as public web content.</p>`,
  faq: [
    {
      q: 'Which characters does the extractor keep by default?',
      a: 'Arabic letters, spaces, line breaks, numbers, and common punctuation. Latin letters, emoji, symbols, markup, and control characters are removed unless they fall under an option you enable.'
    },
    {
      q: 'Can I keep the harakat in the result?',
      a: 'Yes. Turn on the Harakat option. Leave it off if you want plain, unvocalized Arabic for search, counting, or dataset preparation.'
    },
    {
      q: 'Does it remove English words only?',
      a: 'It removes every character outside the allowlist, including Latin letters, Cyrillic, emoji, and symbols. Numbers and punctuation can be kept with their own options.'
    },
    {
      q: 'Can it extract Arabic from a PDF?',
      a: 'Paste the text after copying it from the PDF. If the PDF uses images, run OCR first. The extractor cleans the copied text but does not read images itself.'
    },
    {
      q: 'Will it fix reversed or disconnected Arabic?',
      a: 'No. It filters characters. Reversed order is a bidirectional issue in the source app, and disconnected letters need presentation-form conversion.'
    }
  ],
  related: ['arabic-text-cleaner', 'arabic-word-frequency', 'photoshop-text-fixer']
};

const loremUi = `
<div class="number-inline">
  <div class="field">
    <label for="paraCount">Paragraphs (1–10)</label>
    <input class="input" id="paraCount" type="number" min="1" max="10" value="3" inputmode="numeric">
  </div>
  <label class="check" style="align-self:center"><input type="checkbox" id="addHtmlTags"> Wrap in &lt;p dir="rtl"&gt; tags</label>
</div>
<div class="field" style="margin-top:14px">
  <div class="split-label"><span>Generated Arabic text</span></div>
  <textarea class="editor editor--ar editor--tall" id="outputBox" dir="rtl" lang="ar" readonly></textarea>
</div>
<div class="toolbar">
  <button class="btn btn-primary" type="button" data-action="generate">Generate again</button>
  <button class="btn btn-outline" type="button" data-action="copy">Copy</button>
  <button class="btn btn-ghost" type="button" data-action="clear">Clear</button>
  <span class="grow"></span>
  <span class="tool-status" id="loremStatus" role="status" aria-live="polite"></span>
</div>`;

const lorem = {
  slug: 'arabic-lorem-ipsum',
  group: 'generate',
  icon: 'fileText',
  shortTitle: 'Arabic Lorem Ipsum',
  cardDesc: 'Realistic RTL placeholder paragraphs for mockups and layouts.',
  title: 'Arabic Lorem Ipsum Generator – RTL Dummy Text Online',
  description: 'Generate Arabic placeholder text for mockups, wireframes, and RTL layouts. Choose 1 to 10 paragraphs, add HTML tags, and copy realistic dummy Arabic.',
  h1: 'Arabic lorem ipsum generator',
  lede: 'Fill a design with readable right-to-left placeholder text instead of Latin lorem ipsum that hides spacing and font problems.',
  eyebrow: 'Arabic placeholder text',
  published: '2026-10-20',
  modified: '2026-11-08',
  keywords: ['Arabic lorem ipsum', 'Arabic placeholder text', 'RTL dummy text', 'Arabic filler text'],
  ui: loremUi,
  scripts: ['tools/lorem.js'],
  article: `
<p>Lorem ipsum is a Latin placeholder, which makes it a poor test for Arabic design. Latin text has different letter heights, no cursive joins, and a left-to-right flow. An Arabic layout tested with Latin dummy text can look balanced while the real Arabic version has clipped diacritics, uneven line spacing, or a broken right margin.</p>
<p>This generator produces Arabic placeholder paragraphs that read as normal text. The sentences are generic, so they do not distract a client during a design review, but they use real Arabic words, joins, and punctuation. You choose the number of paragraphs and whether to wrap them in HTML tags.</p>

<h2 id="why-arabic">Why use Arabic placeholder text</h2>
<p>Arabic fonts vary a lot in vertical metrics. A font with tall ascenders and deep descenders needs more line height than a Latin font at the same size. Placeholder Arabic reveals that immediately. It also shows whether the design handles the right-to-left alignment of punctuation, the width of connected words, and the shape of headings.</p>
<p>For a bilingual product, test both directions. A card that looks fine in English can break when the Arabic title is longer or when a number sits at the start of a line. Realistic filler is the cheapest way to catch that before development.</p>

<h2 id="how-to-use">How to generate text</h2>
<ol>
  <li>Set the number of paragraphs. Each paragraph contains three to six sentences, chosen at random.</li>
  <li>Turn on HTML tags if you need markup for a web page or an email template. The output becomes <code>&lt;p dir="rtl"&gt;…&lt;/p&gt;</code> blocks.</li>
  <li>Press <strong>Generate again</strong> for a new combination. The generator never repeats the same sentence inside one paragraph.</li>
  <li>Copy the result into Figma, Photoshop, a CMS, or a code editor.</li>
</ol>
<p>The paragraph counter updates when you change the number. The output area switches between right-to-left plain text and left-to-right markup so the tags remain readable.</p>

<h2 id="design-checks">What to check with the filler</h2>
<ul>
  <li><strong>Line height:</strong> do the marks and descenders collide with the next line?</li>
  <li><strong>Wrapping:</strong> does a long connected word overflow its container?</li>
  <li><strong>Alignment:</strong> is the right edge of the paragraph stable across lines?</li>
  <li><strong>Punctuation:</strong> does the Arabic comma sit correctly at the end of a phrase?</li>
  <li><strong>Mixed content:</strong> add a number or an English product name and see whether the direction holds.</li>
</ul>
<p>For a realistic test, replace one paragraph with actual content from the project. Filler is a starting point, not a substitute for the longest and shortest strings in the interface.</p>

<h2 id="seo">Do not publish it</h2>
<p>Placeholder text should never reach a live page. Search engines can index it, and a missing translation can leave a paragraph of generic Arabic on a production site. Treat the generated text as a design asset and remove it before launch.</p>

<h2 id="privacy">Generated locally</h2>
<p>The sentences are stored in the page's JavaScript. No request is sent, no API is called, and nothing is saved. You can generate as many variations as you need without an account.</p>`,
  faq: [
    {
      q: 'Is the generated Arabic real text?',
      a: 'It is real Arabic prose made of generic sentences about design, language, and placeholder content. It reads naturally but is not a quotation from a specific source.'
    },
    {
      q: 'Can I use it in a commercial mockup?',
      a: 'Yes. The sentences are generic filler written for this tool. Replace them with the client’s real content before publishing the final product.'
    },
    {
      q: 'What do the HTML tags add?',
      a: 'They wrap each paragraph in a p element with dir="rtl", which is useful for a web page, an email template, or a CMS field that expects markup.'
    },
    {
      q: 'How many paragraphs can I generate?',
      a: 'Between one and ten per click. Press Generate again for a different combination of sentences.'
    },
    {
      q: 'Does the generator need an internet connection?',
      a: 'No, after the page has loaded. The sentences are local, and no text is sent to a server.'
    }
  ],
  related: ['arabic-word-counter', 'arabic-text-cleaner', 'arabic-text-to-speech']
};

const brailleUi = `
<div class="split">
  <div class="field">
    <label for="inputBox">Arabic text</label>
    <textarea class="editor editor--ar editor--tall" id="inputBox" dir="rtl" lang="ar" spellcheck="false" placeholder="مرحبا بالعالم"></textarea>
  </div>
  <div class="field">
    <div class="split-label"><span>Braille cells</span><span class="item-count">LTR</span></div>
    <textarea class="editor editor--mono editor--tall" id="outputBox" dir="ltr" readonly placeholder="⠍⠗⠓⠃⠁"></textarea>
  </div>
</div>
<fieldset class="options">
  <legend>Braille options</legend>
  <label class="check"><input type="checkbox" id="includeHarakat" checked> Include harakat and shadda</label>
</fieldset>
<div class="toolbar">
  <button class="btn btn-outline" type="button" data-action="copy">Copy braille</button>
  <button class="btn btn-ghost" type="button" data-action="clear">Clear</button>
  <span class="grow"></span>
  <span class="tool-status" id="brailleStatus" role="status" aria-live="polite"></span>
</div>
<div class="note-box"><p>Braille is read left to right in the order the Arabic text is read. Numbers use one number sign per digit run, and Latin runs stay left to right.</p></div>`;

const braille = {
  slug: 'arabic-braille-translator',
  group: 'convert',
  icon: 'braille',
  shortTitle: 'Arabic Braille Translator',
  cardDesc: 'Turn Arabic letters into Unified Arabic Braille cells.',
  title: 'Arabic Braille Translator – Convert Arabic to Braille',
  description: 'Translate Arabic text into Unicode braille cells for embossers and learning. Keep or drop harakat, copy the cells, and check the reading order instantly.',
  h1: 'Arabic Braille translator',
  lede: 'Convert Arabic letters, numbers, and punctuation into Unicode braille cells that read in the correct order for a blind reader.',
  eyebrow: 'Arabic to Unified Braille',
  published: '2026-10-22',
  modified: '2026-11-07',
  keywords: ['Arabic braille', 'Arabic to braille', 'Unified Arabic Braille', 'braille translator'],
  ui: brailleUi,
  scripts: ['tools/braille.js'],
  article: `
<p>Arabic Braille uses the same six-dot cell as Latin Braille but assigns different patterns to Arabic letters. A braille reader moves left to right across the cells, following the order of the Arabic text, not the visual right-to-left direction of the printed page. That distinction is the source of many broken converters: reversing the whole string produces cells that look plausible but read backward.</p>
<p>This translator keeps the reading order. It maps each Arabic letter to its Unified Arabic Braille cell, groups digit runs under a number sign, keeps Latin runs readable, and places shadda before its consonant as Arabic Braille requires. The output is Unicode braille, ready to copy into a braille editor or send to an embosser.</p>

<h2 id="reading-order">Reading order, not visual order</h2>
<p>In print, Arabic starts on the right. In braille, the reader starts on the left and follows the sequence of letters. The first letter of an Arabic word is therefore the leftmost cell of that word in the braille line. The converter writes cells in logical reading order, so <span class="ar-inline">مرحبا</span> becomes the cells for <span class="ar-inline">م</span>, <span class="ar-inline">ر</span>, <span class="ar-inline">ح</span>, <span class="ar-inline">ب</span>, <span class="ar-inline">ا</span> in that order.</p>
<p>If a legacy workflow expects a mirrored visual string, this tool is not the right fit. Mirrored output is a niche compatibility mode, not standard Arabic Braille.</p>

<h2 id="letters">The Arabic Braille alphabet</h2>
<p>Unified Arabic Braille assigns a distinct cell to each Arabic letter, including the hamza forms and the letters used in Persian and Urdu. The mapping covers <span class="ar-inline">ا</span> through <span class="ar-inline">ي</span>, the ta marbuta, alef maqsura, and the additional letters. The tool also recognizes the lam-alef ligature as a single cell rather than two separate letters.</p>
<p>Punctuation has its own cells: the Arabic comma, semicolon, question mark, and the usual period and colon. A space becomes a blank braille cell, which preserves word boundaries for the reader.</p>

<h2 id="harakat">Harakat and shadda</h2>
<p>Vowel marks are optional in the output. With harakat enabled, each fatha, kasra, damma, tanwin, sukun, and shadda gets its braille cell. The shadda is placed before the consonant it doubles, following Arabic Braille convention, rather than after it as in print. With harakat disabled, the output is shorter and easier to scan but loses pronunciation information.</p>
<p>For a beginner learning the alphabet, keep the marks on. For a long document where the print original is unvocalized, turn them off to match the source.</p>

<h2 id="numbers">Numbers and number signs</h2>
<p>Braille digits reuse the letters <span class="ar-inline">ا</span> to <span class="ar-inline">ي</span>, so a number sign is needed to tell the reader that the next cells are digits. The converter inserts one number sign at the start of each digit run and then writes the digits in their normal order. A number such as 2026 becomes a single sign followed by four digit cells, not four signs.</p>
<p>Western digits and Arabic-Indic digits are both accepted. Latin words inside the text stay in left-to-right order, because reversing an English name would make it unreadable.</p>

<h2 id="output">Using the output</h2>
<p>Press Copy and paste the cells into a braille editor, a print workflow, or a teaching document. The Unicode braille block displays with a font that contains braille patterns; some default fonts show empty boxes. On Windows, Segoe UI Symbol includes the block. If you plan to emboss, import the text into software that understands Unicode braille rather than printing the screen.</p>
<div class="callout"><p><strong>Check before embossing:</strong> braille standards vary by country and by whether the text is literary or scientific. Confirm the local convention, especially for numbers and foreign words.</p></div>`,
  faq: [
    {
      q: 'Is this Unified Arabic Braille?',
      a: 'Yes. The letters use the Unified Arabic Braille assignments, with a lam-alef ligature cell, Arabic punctuation, and a number sign for digit runs.'
    },
    {
      q: 'Why are the cells not reversed?',
      a: 'Braille is read left to right in the order the Arabic text is read. Reversing the string would make the reader start at the last letter of the sentence.'
    },
    {
      q: 'Can I remove the harakat from the braille?',
      a: 'Yes. Uncheck “Include harakat and shadda”. The letters remain, but the vowel and doubling information is dropped.'
    },
    {
      q: 'Does it handle English words and numbers?',
      a: 'Yes. Latin runs stay in left-to-right order, and digit runs get one number sign followed by the digits. Arabic-Indic and Western digits are both accepted.'
    },
    {
      q: 'Can I send the result to a braille embosser?',
      a: 'The output is Unicode braille. Import it into braille production software that supports the braille block; printing the screen does not produce embossed dots.'
    }
  ],
  related: ['arabic-text-to-speech', 'arabic-numerals-converter', 'arabic-text-cleaner']
};

const harakatUi = `
<div class="field">
  <label for="text">Vocalized Arabic text</label>
  <textarea class="editor editor--ar editor--tall" id="text" dir="rtl" lang="ar" spellcheck="false" placeholder="مَرْحَبًا بِكَ فِي الْعَالَمِ الْعَرَبِيِّ"></textarea>
</div>
<div class="toolbar">
  <button class="btn btn-primary" type="button" data-action="remove">Remove harakat</button>
  <button class="btn btn-outline" type="button" data-action="copy">Copy</button>
  <button class="btn btn-ghost" type="button" data-action="clear">Clear</button>
  <span class="grow"></span>
  <span class="tool-status" id="harakatStatus" role="status" aria-live="polite"></span>
</div>
<div class="callout"><p>The tool removes fatha, kasra, damma, tanwin, sukun, shadda, and the superscript alef. Letters and punctuation stay untouched.</p></div>`;

const harakat = {
  slug: 'arabic-harakat-remover',
  group: 'fix',
  icon: 'eraser',
  shortTitle: 'Harakat Remover',
  cardDesc: 'Strip tashkeel marks from Arabic while keeping every letter.',
  title: 'Arabic Harakat Remover – Strip Tashkeel From Text Online',
  description: 'Remove harakat and tashkeel from Arabic text online. Strip fatha, kasra, damma, tanwin, sukun, and shadda while keeping every letter and punctuation mark.',
  h1: 'Arabic harakat remover',
  lede: 'Turn fully vocalized Arabic into plain text by removing the vowel marks, without touching a single letter.',
  eyebrow: 'Remove Arabic diacritics',
  published: '2026-10-24',
  modified: '2026-11-06',
  keywords: ['remove harakat', 'remove tashkeel', 'Arabic diacritics remover', 'unvocalized Arabic'],
  ui: harakatUi,
  scripts: ['tools/harakat.js'],
  article: `
<p>Harakat are the small marks above and below Arabic letters that indicate short vowels, doubling, and the absence of a vowel. They are essential for children, poetry, the Quran, and any text where pronunciation is ambiguous. They are usually omitted in newspapers, websites, and everyday writing.</p>
<p>This tool removes every harakat mark in one pass. It is useful when a vocalized source must match an unvocalized house style, when a search index needs plain letters, or when diacritics copied from a religious text interfere with word counting.</p>

<h2 id="what-is-removed">What is removed</h2>
<ul>
  <li>Fatha <span class="ar-inline">َ</span>, kasra <span class="ar-inline">ِ</span>, and damma <span class="ar-inline">ُ</span>.</li>
  <li>The three tanwin forms: <span class="ar-inline">ً</span>, <span class="ar-inline">ٍ</span>, and <span class="ar-inline">ٌ</span>.</li>
  <li>Sukun <span class="ar-inline">ْ</span>, which marks a consonant with no vowel.</li>
  <li>Shadda <span class="ar-inline">ّ</span>, which marks a doubled consonant.</li>
  <li>The superscript alef <span class="ar-inline">ٰ</span>, used in a few words and in Quranic orthography.</li>
</ul>
<p>Letters, spaces, punctuation, digits, and tatweel are not affected. The output is the same sentence with the marks lifted off.</p>

<h2 id="when-to-remove">When to remove harakat</h2>
<p>Most modern Arabic writing is unvocalized. If you are publishing a news article, a product page, or a social post, removing the marks gives the text the expected look and avoids inconsistent vocalization. If you are preparing text for search, stemming, or frequency analysis, removing harakat lets <span class="ar-inline">كِتَاب</span> and <span class="ar-inline">كتاب</span> count as the same word.</p>
<p>Do not remove them from a Quranic passage, a poem, a grammar lesson, or a children's book without a specific reason. The marks carry meaning and are part of the intended reading experience.</p>

<h2 id="order">Mark order and shadda</h2>
<p>In properly encoded Arabic, a shadda comes before the vowel it accompanies: <span class="ar-inline">مُحَمَّد</span> has the shadda followed by a fatha on the same letter. Some copied text has the order reversed. This remover simply deletes both, so the letter remains and the word stays valid. If you need to keep vocalization, use the keyboard's diacritic cleanup instead, which normalizes the order.</p>

<h2 id="counting">Harakat and word counts</h2>
<p>Word counters that count characters often treat a fatha as a character, which inflates the total. Removing harakat first gives a count that matches the visible letters. The <a href="/arabic-word-counter/">word and character counter</a> can measure both versions if you want to compare.</p>

<h2 id="before-after">Before and after</h2>
<div class="example">
  <span class="example-label">Vocalized</span>
  <p><span class="ar-inline">ذَهَبَ الطَّالِبُ إِلَى الْمَدْرَسَةِ مُبَكِّرًا.</span></p>
  <span class="example-label">Unvocalized</span>
  <p><span class="ar-inline">ذهب الطالب إلى المدرسة مبكرا.</span></p>
</div>
<p>Readability changes; the words do not. For a search index or a plain-text export, that is exactly what you want.</p>

<h2 id="privacy">Nothing leaves the page</h2>
<p>The removal runs as a regular expression in your browser. There is no server, no account, and no history. Copy the result before closing the tab if you need it later.</p>`,
  faq: [
    {
      q: 'Does the remover change the letters?',
      a: 'No. It deletes only diacritic marks. Every Arabic letter, space, number, and punctuation mark stays exactly where it was.'
    },
    {
      q: 'Is shadda removed too?',
      a: 'Yes. Shadda is a diacritic, so it is removed along with the short vowels. If you need to keep doubling information, do not run the tool on that text.'
    },
    {
      q: 'Can I remove harakat from only part of the text?',
      a: 'The tool processes the whole editor. Copy the section you want to clean into the editor, run it, then paste the result back into your document.'
    },
    {
      q: 'Why would I remove harakat from a search index?',
      a: 'Removing the marks makes vocalized and unvocalized spellings match, so a search for كتاب also finds كِتَاب. It also reduces the character count and avoids duplicate tokens.'
    },
    {
      q: 'Does it keep the superscript alef?',
      a: 'No. The superscript alef is treated as a haraka and removed. The base alef remains if it is present in the text.'
    }
  ],
  related: ['arabic-text-cleaner', 'arabic-word-counter', 'arabic-word-frequency']
};

const tatweelUi = `
<div class="mode-bar">
  <div class="segmented" role="radiogroup" aria-label="Tatweel action">
    <input type="radio" name="tatMode" id="tatAdd" value="add" checked>
    <label for="tatAdd">Add kashida</label>
    <input type="radio" name="tatMode" id="tatRemove" value="remove">
    <label for="tatRemove">Remove kashida</label>
  </div>
  <div class="segmented" id="lengthOptions" role="radiogroup" aria-label="Tatweel length">
    <input type="radio" name="tatLength" id="len1" value="1" checked><label for="len1">1 mark</label>
    <input type="radio" name="tatLength" id="len3" value="3"><label for="len3">3 marks</label>
    <input type="radio" name="tatLength" id="len5" value="5"><label for="len5">5 marks</label>
  </div>
  <span class="buffer-chip" id="tatCountChip" hidden></span>
</div>
<div class="split">
  <div class="field">
    <label for="inputBox">Original text</label>
    <textarea class="editor editor--ar editor--tall" id="inputBox" dir="rtl" lang="ar" spellcheck="false" placeholder="العربية لغة جميلة"></textarea>
  </div>
  <div class="field">
    <div class="split-label"><span>Stretched text</span></div>
    <textarea class="editor editor--ar editor--tall" id="outputBox" dir="rtl" lang="ar" readonly placeholder="النتيجة تظهر هنا…"></textarea>
  </div>
</div>
<div class="toolbar">
  <button class="btn btn-outline" type="button" data-action="copy">Copy result</button>
  <button class="btn btn-ghost" type="button" data-action="clear">Clear</button>
  <span class="grow"></span>
  <span class="tool-status" id="tatweelStatus" role="status" aria-live="polite"></span>
</div>
<div class="note-box"><p>Kashida is added only after letters that can connect to the next letter, so the word stays typographically valid.</p></div>`;

const tatweel = {
  slug: 'arabic-tatweel-stretcher',
  group: 'fix',
  icon: 'stretch',
  shortTitle: 'Tatweel Stretcher',
  cardDesc: 'Add or remove kashida to justify and stretch Arabic words.',
  title: 'Arabic Tatweel Stretcher – Add or Remove Kashida Online',
  description: 'Add or remove Arabic tatweel (kashida) to justify headings and balance lines. Choose one, three, or five marks, with valid letter joins only.',
  h1: 'Arabic tatweel and kashida tool',
  lede: 'Stretch Arabic words with valid kashida joins, or strip every tatweel character from text that already has too many.',
  eyebrow: 'Justify Arabic the old way',
  published: '2026-10-26',
  modified: '2026-11-05',
  keywords: ['Arabic tatweel', 'kashida', 'stretch Arabic text', 'remove tatweel'],
  ui: tatweelUi,
  scripts: ['tools/tatweel.js'],
  article: `
<p>Tatweel, also called kashida, is the horizontal line that extends a connection between two Arabic letters. Typographers use it to justify a line, balance a heading, or give a logo a deliberate rhythm. In Unicode it is the character U+0640, and it is a real character rather than a font feature, which means it survives copy and paste but can also accumulate in text where it was never intended.</p>
<p>This tool does two jobs: it inserts kashida only where a letter can legally connect to the next one, or it removes every tatweel character from a block of text.</p>

<h2 id="what-is-kashida">What kashida can and cannot do</h2>
<p>Arabic letters connect on a baseline. Some letters connect only to the preceding letter, not to the following one: <span class="ar-inline">ا</span>, <span class="ar-inline">د</span>, <span class="ar-inline">ذ</span>, <span class="ar-inline">ر</span>, <span class="ar-inline">ز</span>, <span class="ar-inline">و</span>, and a few others. You cannot stretch after those letters without breaking the word. The tool checks the next letter and inserts kashida only after a connecting letter, so <span class="ar-inline">بيت</span> can be stretched between <span class="ar-inline">ب</span> and <span class="ar-inline">ي</span>, but <span class="ar-inline">دار</span> cannot be stretched between <span class="ar-inline">د</span> and <span class="ar-inline">ا</span>.</p>
<p>The result is typographically valid but not a replacement for a proper justification engine. A layout program distributes kashida with aesthetic rules; this tool applies a mechanical, even insertion.</p>

<h2 id="add">Adding kashida</h2>
<p>Choose one, three, or five marks per join. One mark is subtle and works for body text. Three or five marks create a visible stretch for a title or a poster. The converter removes any existing tatweel before adding new marks, so repeated clicks do not multiply the length.</p>
<p>Harakat are preserved and stay attached to their letter. The insertion happens after any marks, so a fatha is not separated from its consonant by the stretch.</p>

<h2 id="remove">Removing kashida</h2>
<p>Switch to Remove and the output drops every U+0640 character. This is useful for text copied from a justified PDF, where the kashida used for alignment becomes visible garbage in a new layout, or for search fields where the extra character prevents a match. Removing tatweel does not change the letters or the meaning.</p>

<h2 id="when-to-use">When to stretch and when not</h2>
<ul>
  <li><strong>Headlines and logotypes:</strong> a controlled stretch can make a short Arabic title fill its line.</li>
  <li><strong>Print justification:</strong> for a paragraph, prefer the justification engine in InDesign or a CSS text-align setting. Manual kashida in body text quickly looks uneven.</li>
  <li><strong>Formal documents:</strong> avoid it. Modern Arabic typesetting rarely uses manual kashida in contracts or reports.</li>
  <li><strong>Cleanup:</strong> remove it when a PDF export leaves visible gaps or when a search fails on an otherwise identical word.</li>
</ul>

<h2 id="copy">Copying the result</h2>
<p>The output updates live. Press Copy and paste into your design or document. Tatweel is a normal Unicode character, so it displays in any Arabic font, though the visual length depends on the font's design. Check the result in the final font before approving a print file.</p>
<div class="callout"><p><strong>Accessibility note:</strong> screen readers may read tatweel as a pause or ignore it. Do not use it to fake spacing in a sentence that will be read aloud.</p></div>`,
  faq: [
    {
      q: 'What is tatweel or kashida?',
      a: 'It is the horizontal line that stretches the connection between two Arabic letters. In Unicode it is U+0640. Typographers use it to justify lines and balance short headings.'
    },
    {
      q: 'Why are some letters not stretched?',
      a: 'Letters such as ا, د, ذ, ر, ز, and و do not connect to the following letter. Inserting kashida after them would break the word, so the tool skips those positions.'
    },
    {
      q: 'Can I remove existing tatweel?',
      a: 'Yes. Choose Remove kashida. Every U+0640 character is deleted while letters, harakat, and punctuation remain.'
    },
    {
      q: 'Does the tool preserve harakat?',
      a: 'Yes. Marks stay attached to their letter, and the kashida is inserted after them so the vowel is not separated from the consonant.'
    },
    {
      q: 'Is manual kashida good for body text?',
      a: 'Usually not. Use the justification engine of your layout program for paragraphs. Manual kashida is best for short headings, logos, and deliberate display typography.'
    }
  ],
  related: ['arabic-text-cleaner', 'arabic-harakat-remover', 'photoshop-text-fixer']
};

module.exports = [sorter, extractor, lorem, braille, harakat, tatweel];
