const replaceUi = `
<div class="field">
  <label for="inputBox">Source text</label>
  <textarea class="editor editor--ar editor--tall" id="inputBox" dir="rtl" lang="ar" spellcheck="false" placeholder="الصق النص الذي تريد تعديله…"></textarea>
</div>
<div class="split" style="margin-top:14px">
  <div class="field">
    <label for="findText">Find</label>
    <input class="input" id="findText" type="text" placeholder="كلمة أو عبارة" dir="auto" autocomplete="off">
  </div>
  <div class="field">
    <label for="replaceText">Replace with</label>
    <input class="input" id="replaceText" type="text" placeholder="البديل" dir="auto" autocomplete="off">
  </div>
</div>
<fieldset class="options options--plain">
  <legend>Matching</legend>
  <label class="check"><input type="checkbox" id="matchCase"> Match case exactly</label>
  <label class="check"><input type="checkbox" id="wholeWord"> Whole words only</label>
</fieldset>
<div class="field" style="margin-top:14px">
  <div class="split-label"><span>Result</span></div>
  <textarea class="editor editor--ar editor--tall" id="outputBox" dir="rtl" lang="ar" readonly placeholder="النتيجة تظهر هنا…"></textarea>
</div>
<div class="toolbar">
  <button class="btn btn-primary" type="button" data-action="replace">Replace all</button>
  <button class="btn btn-outline" type="button" data-action="copy">Copy result</button>
  <button class="btn btn-ghost" type="button" data-action="clear">Clear</button>
  <span class="grow"></span>
  <span class="tool-status" id="replaceStatus" role="status" aria-live="polite"></span>
</div>
<div class="note-box"><p>“Whole words only” uses Unicode word boundaries. Leave it off to replace fragments inside longer words.</p></div>`;

const replace = {
  slug: 'find-and-replace',
  group: 'fix',
  icon: 'search',
  shortTitle: 'Find and Replace',
  cardDesc: 'Rename terms across Arabic text with case and whole-word options.',
  title: 'Arabic Find and Replace – Bulk Edit Arabic Text Online',
  description: 'Find and replace Arabic words in bulk. Match case or whole words, replace every occurrence at once, and copy the edited text without touching a server.',
  h1: 'Arabic find and replace',
  lede: 'Change a name, fix a repeated typo, or rename a term everywhere in the text with one controlled replacement.',
  eyebrow: 'Bulk Arabic editing',
  published: '2026-10-28',
  modified: '2026-11-04',
  keywords: ['Arabic find and replace', 'replace Arabic text', 'bulk edit Arabic', 'Arabic search replace'],
  ui: replaceUi,
  scripts: ['tools/replace.js'],
  article: `
<p>Editing Arabic text often means changing the same term in a dozen places: a company name, a date, a spelling that the client prefers, or a word that was translated two different ways. Doing it by eye invites missed instances and accidental edits.</p>
<p>This tool replaces every occurrence in one pass and shows you the result before you copy it. It supports case-sensitive matching, whole-word matching, and plain text replacement. Special characters in the search term are escaped, so a dot or a bracket is treated as text rather than as a regular expression.</p>

<h2 id="how-to-use">How to replace text</h2>
<ol>
  <li>Paste the source text into the big editor.</li>
  <li>Type the word or phrase to find. Arabic, English, and mixed terms are all accepted.</li>
  <li>Type the replacement, or leave it empty to delete every match.</li>
  <li>Choose whether to match case and whether to match whole words.</li>
  <li>Press <strong>Replace all</strong>, check the result, then copy it.</li>
</ol>
<p>The result stays in a separate read-only box, so the original is preserved until you copy the new version.

<h2 id="whole-words">Whole words and fragments</h2>
<p>Arabic attaches prefixes and suffixes to words: <span class="ar-inline">و</span>, <span class="ar-inline">ال</span>, <span class="ar-inline">ب</span>, <span class="ar-inline">ل</span>, <span class="ar-inline">ك</span>, and possessive endings. If you search for <span class="ar-inline">كتاب</span> with whole-word matching on, a word such as <span class="ar-inline">الكتاب</span> may not match, depending on the word boundary. Turn whole-word matching off when you want to catch those attached forms.</p>
<p>With whole-word matching off, a search for a short term can also match inside a longer word. Check the count and skim the result before copying. The tool reports how many replacements it made, which helps you decide whether the scope is right.</p>

<h2 id="case">Case and mixed scripts</h2>
<p>Arabic has no letter case, but a mixed document may contain English names, product codes, or URLs. Case-sensitive matching applies to those Latin characters. If the source mixes <code>Photoshop</code> and <code>photoshop</code>, leave case matching off to replace both spellings with one chosen form.</p>

<h2 id="escape">Literal text, not regex</h2>
<p>The search term is escaped before it becomes a pattern. That means <code>3.14</code> matches the literal characters, not “3, any character, 14”. It also means a search for a bracket or a question mark works without special syntax. This is deliberate: most Arabic editing tasks are literal, and a surprise regex is a good way to damage a document.</p>

<h2 id="use-cases">Common uses</h2>
<ul>
  <li>Updating a brand name after a merger.</li>
  <li>Standardizing one spelling of a place name across a report.</li>
  <li>Removing a repeated phrase that a translation tool inserted.</li>
  <li>Changing Western digits to Arabic-Indic digits in a specific context.</li>
  <li>Replacing a placeholder such as <span class="ar-inline">[الاسم]</span> with a real name.</li>
</ul>
<p>For punctuation-only changes, the <a href="/arabic-punctuation-converter/">punctuation converter</a> is safer because it understands decimals. For whitespace, use the <a href="/arabic-text-cleaner/">text cleaner</a>.</p>

<h2 id="privacy">Local editing</h2>
<p>Replacement happens in your browser with JavaScript. No text is uploaded, and no history is kept. Copy the result before reloading the page.</p>`,
  faq: [
    {
      q: 'Does replace all work with Arabic text?',
      a: 'Yes. Arabic letters, harakat, punctuation, and mixed English terms are all supported. The search is plain text, so special characters are matched literally.'
    },
    {
      q: 'What does whole words only do?',
      a: 'It adds Unicode word boundaries around the search term, so a match must be a complete word. Turn it off to catch prefixes, suffixes, and fragments inside longer words.'
    },
    {
      q: 'Can I delete a word instead of replacing it?',
      a: 'Yes. Leave the replacement field empty and press Replace all. Every match is removed, including the surrounding spaces only where they are part of the match.'
    },
    {
      q: 'Does it support regular expressions?',
      a: 'No. The search term is treated as literal text and escaped automatically. That prevents accidental pattern behavior with dots, brackets, and question marks.'
    },
    {
      q: 'Is the original text preserved?',
      a: 'Yes. The source stays in the input box and the result appears in a separate read-only box until you copy it or clear the editor.'
    }
  ],
  related: ['arabic-text-cleaner', 'arabic-punctuation-converter', 'arabic-word-frequency']
};

const numeralsUi = `
<div class="mode-bar">
  <div class="segmented" role="radiogroup" aria-label="Digit conversion direction">
    <input type="radio" name="numeralMode" id="numEastern" value="toEastern" checked>
    <label for="numEastern">Western → Arabic-Indic</label>
    <input type="radio" name="numeralMode" id="numWestern" value="toWestern">
    <label for="numWestern">Arabic-Indic → Western</label>
  </div>
</div>
<div class="split">
  <div class="field">
    <label for="inputBox">Text with digits</label>
    <textarea class="editor editor--ar editor--tall" id="inputBox" dir="auto" spellcheck="false" placeholder="2026، الساعة 14:30، السعر 1250 درهما"></textarea>
  </div>
  <div class="field">
    <div class="split-label"><span>Converted text</span></div>
    <textarea class="editor editor--ar editor--tall" id="outputBox" dir="auto" readonly placeholder="النتيجة تظهر هنا…"></textarea>
  </div>
</div>
<div class="example-chips">
  <button class="chip" type="button" data-example="2026">2026</button>
  <button class="chip" type="button" data-example="الساعة 14:30 يوم 21/11/2026">14:30 · 21/11/2026</button>
  <button class="chip" type="button" data-example="هاتف: +212 6 12 34 56 78">Phone number</button>
</div>
<div class="toolbar">
  <button class="btn btn-outline" type="button" data-action="copy">Copy result</button>
  <button class="btn btn-ghost" type="button" data-action="clear">Clear</button>
  <span class="grow"></span>
  <span class="tool-status" id="numeralStatus" role="status" aria-live="polite"></span>
</div>
<div class="note-box"><p>Only digits change. Letters, punctuation, spaces, and the plus sign in phone numbers stay as they are.</p></div>`;

const numerals = {
  slug: 'arabic-numerals-converter',
  group: 'convert',
  icon: 'hash',
  shortTitle: 'Arabic Numerals Converter',
  cardDesc: 'Switch between Western, Arabic-Indic, and Persian digits.',
  title: 'Arabic Numerals Converter – Eastern and Western Digits',
  description: 'Convert Arabic-Indic and Western digits both ways. Change ٠١٢٣ to 0123 or 2026 to ٢٠٢٦ while keeping punctuation, phone numbers, and text intact.',
  h1: 'Arabic numerals converter',
  lede: 'Switch a whole document between 0–9 and ٠–٩ without retyping a single number.',
  eyebrow: 'Eastern and Western digits',
  published: '2026-10-30',
  modified: '2026-11-03',
  keywords: ['Arabic numerals', 'Arabic-Indic digits', 'convert Arabic numbers', 'Eastern Arabic numerals'],
  ui: numeralsUi,
  scripts: ['tools/numerals.js'],
  article: `
<p>Arabic text can use two sets of digits. Western digits (0–9) are common in Morocco, Algeria, Tunisia, and much of the web. Arabic-Indic digits (٠–٩) are standard in Egypt, the Gulf, and many print publications. Persian adds a third set (۰–۹). None of them is more correct; the right choice depends on the audience and the publication style.</p>
<p>This converter changes digits only. It leaves letters, punctuation, spaces, currency symbols, and phone-number formatting where they are, so you can switch a paragraph or an invoice without rebuilding it.</p>

<h2 id="two-sets">The two digit sets</h2>
<div class="table-wrap">
  <table>
    <thead><tr><th>Value</th><th>Western</th><th>Arabic-Indic</th><th>Persian</th></tr></thead>
    <tbody>
      <tr><td>0</td><td>0</td><td><span class="ar-inline">٠</span></td><td><span class="ar-inline">۰</span></td></tr>
      <tr><td>1</td><td>1</td><td><span class="ar-inline">١</span></td><td><span class="ar-inline">۱</span></td></tr>
      <tr><td>2</td><td>2</td><td><span class="ar-inline">٢</span></td><td><span class="ar-inline">۲</span></td></tr>
      <tr><td>3</td><td>3</td><td><span class="ar-inline">٣</span></td><td><span class="ar-inline">۳</span></td></tr>
      <tr><td>4</td><td>4</td><td><span class="ar-inline">٤</span></td><td><span class="ar-inline">۴</span></td></tr>
      <tr><td>5</td><td>5</td><td><span class="ar-inline">٥</span></td><td><span class="ar-inline">۵</span></td></tr>
      <tr><td>6</td><td>6</td><td><span class="ar-inline">٦</span></td><td><span class="ar-inline">۶</span></td></tr>
      <tr><td>7</td><td>7</td><td><span class="ar-inline">٧</span></td><td><span class="ar-inline">۷</span></td></tr>
      <tr><td>8</td><td>8</td><td><span class="ar-inline">٨</span></td><td><span class="ar-inline">۸</span></td></tr>
      <tr><td>9</td><td>9</td><td><span class="ar-inline">٩</span></td><td><span class="ar-inline">۹</span></td></tr>
    </tbody>
  </table>
</div>
<p>The tool converts Western digits to Arabic-Indic and back. Persian digits are accepted as input on the way to Western, because they share the same positions but use different code points.</p>

<h2 id="how-to-use">How to convert</h2>
<ol>
  <li>Paste the text into the left editor.</li>
  <li>Choose the direction: Western to Arabic-Indic, or Arabic-Indic to Western.</li>
  <li>Read the result on the right and press Copy.</li>
</ol>
<p>The result updates as you type. The status line reports how many digits were converted, so you can tell at a glance whether the text contained numbers at all.</p>

<h2 id="mixed">Mixed digits in one document</h2>
<p>If a document mixes both systems, run it in one direction first, then fix exceptions manually. A single direction pass turns every digit, including years, prices, and phone numbers. If a phone number must keep Western digits for dialing, copy it out before converting and paste it back afterward, or keep the number on a separate line and convert only the body text.</p>

<h2 id="seo">Digits and search</h2>
<p>Search engines usually normalize digit variants, but not always for Arabic queries. A product code written with Arabic-Indic digits may not match a user who types the same code with Western digits. If the number is an identifier, keep the form that matches the original. If it is prose, choose the form your audience expects and stay consistent within the page.</p>

<h2 id="limits">What does not change</h2>
<p>Only the ten digit characters are replaced. Decimal separators, thousands separators, the Arabic decimal separator <span class="ar-inline">٫</span>, time colons, slashes in dates, and the plus sign in international phone numbers are untouched. That keeps the structure of the number intact while changing its script.</p>
<div class="callout"><p><strong>Currency:</strong> if the amount also needs words, use the <a href="/tafqit/">tafqit converter</a> after converting the digits, or write the amount in words directly.</p></div>`,
  faq: [
    {
      q: 'What are Arabic-Indic digits?',
      a: 'They are the digits ٠١٢٣٤٥٦٧٨٩ used in Arabic-speaking countries. They represent the same values as 0–9 but are different Unicode characters.'
    },
    {
      q: 'Can I convert in both directions?',
      a: 'Yes. Choose Western to Arabic-Indic or Arabic-Indic to Western. Persian digits are also accepted when converting to Western.'
    },
    {
      q: 'Does it change punctuation or phone numbers?',
      a: 'It changes every digit it finds, but it leaves punctuation, spaces, and symbols alone. A phone number with a plus sign keeps the plus; only its digits change.'
    },
    {
      q: 'Which digit style should I use?',
      a: 'Match your audience. Western digits are common in the Maghreb and online; Arabic-Indic digits are standard in Egypt, the Gulf, and much print media. Consistency matters more than the choice.'
    },
    {
      q: 'Will converting break dates or times?',
      a: 'The separators stay the same, so a date such as 21/11/2026 becomes ٢١/١١/٢٠٢٦ with the same structure. Check the result if the destination app expects a specific digit set.'
    }
  ],
  related: ['tafqit', 'arabic-word-counter', 'arabic-url-encoder']
};

const counterUi = `
<div class="field">
  <label for="text">Arabic or mixed text</label>
  <textarea class="editor editor--ar editor--tall" id="text" dir="auto" spellcheck="false" placeholder="اكتب أو الصق النص هنا…"></textarea>
</div>
<div class="stats-grid">
  <div class="stat"><span class="stat-value" id="countChars">0</span><span class="stat-label">Characters</span></div>
  <div class="stat"><span class="stat-value" id="countNoSpaces">0</span><span class="stat-label">Without spaces</span></div>
  <div class="stat"><span class="stat-value" id="countWords">0</span><span class="stat-label">Words</span></div>
  <div class="stat"><span class="stat-value" id="countLines">0</span><span class="stat-label">Lines</span></div>
  <div class="stat"><span class="stat-value" id="countSentences">0</span><span class="stat-label">Sentences</span></div>
  <div class="stat"><span class="stat-value" id="countParagraphs">0</span><span class="stat-label">Paragraphs</span></div>
  <div class="stat"><span class="stat-value" id="countReading">—</span><span class="stat-label">Reading time</span></div>
</div>
<div class="toolbar">
  <button class="btn btn-outline" type="button" data-action="copy">Copy text</button>
  <button class="btn btn-ghost" type="button" data-action="clear">Clear</button>
</div>
<div class="note-box"><p>Characters are counted as Unicode code points, so an Arabic letter with a separate haraka counts as two characters. Remove harakat for a letter-only count.</p></div>`;

const counter = {
  slug: 'arabic-word-counter',
  group: 'analyze',
  icon: 'calculator',
  shortTitle: 'Word and Character Counter',
  cardDesc: 'Live counts for characters, words, sentences, and reading time.',
  title: 'Arabic Word Counter – Characters, Words, Sentences Online',
  description: 'Count Arabic characters, words, sentences, lines, and paragraphs as you type. See reading time and a character count without spaces for social posts.',
  h1: 'Arabic word and character counter',
  lede: 'See how long your Arabic text really is, in characters, words, sentences, and estimated reading time.',
  eyebrow: 'Measure Arabic text',
  published: '2026-11-01',
  modified: '2026-11-02',
  keywords: ['Arabic word counter', 'Arabic character counter', 'count Arabic words', 'Arabic reading time'],
  ui: counterUi,
  scripts: ['tools/counter.js'],
  article: `
<p>Character limits, word counts, and reading-time estimates are part of publishing. Arabic makes them less obvious: a short sentence can contain long connected words, and a single letter can carry two or three separate marks. A counter built for English counts the wrong things or breaks on right-to-left text.</p>
<p>This counter updates as you type and reports seven measures: characters, characters without spaces, words, lines, sentences, paragraphs, and estimated reading time. It counts Unicode code points, which is the same unit most platforms use for a limit.</p>

<h2 id="counts">What each number means</h2>
<ul>
  <li><strong>Characters:</strong> every code point, including spaces, punctuation, and separate harakat. This is the number to compare with a platform limit.</li>
  <li><strong>Without spaces:</strong> the same count minus whitespace. Useful for design width and for estimating how much room a heading needs.</li>
  <li><strong>Words:</strong> runs of non-whitespace characters. Arabic words are separated by spaces, so this is reliable even when the text mixes scripts.</li>
  <li><strong>Lines and paragraphs:</strong> based on line breaks. A blank line starts a new paragraph.</li>
  <li><strong>Sentences:</strong> split on periods, question marks, exclamation marks, Arabic question marks, and ellipses. Abbreviations can inflate the count, so treat it as an estimate.</li>
  <li><strong>Reading time:</strong> words divided by 170 words per minute, rounded up. Arabic reading speed varies; use it as a rough guide, not a promise.</li>
</ul>

<h2 id="harakat">Why harakat change the count</h2>
<p>A fatha is a separate Unicode character. <span class="ar-inline">مَرْحَبًا</span> contains the letters plus five marks, so it counts as more characters than <span class="ar-inline">مرحبا</span>. If a platform limit is tight, remove the harakat with the <a href="/arabic-harakat-remover/">harakat remover</a> before counting. If the text needs vocalization, keep the marks and accept the larger count.</p>
<p>Presentation forms, which are used for design compatibility, also count as one character each. They do not reduce the count, even though they may look like a single glyph.</p>

<h2 id="social">Social media and meta descriptions</h2>
<p>Platforms count characters, not words. A post with a 280-character limit can hold a surprisingly long Arabic sentence because Arabic words are often short. Paste the draft here and compare the character count with the limit before adding a link. For a meta description, aim for roughly 140 to 160 characters; the exact truncation depends on the search engine and the display width.</p>

<h2 id="reading">Reading time and subtitles</h2>
<p>For a video script, reading time is more useful than a word count. Read the text aloud once and compare it with the estimate. Arabic dialects differ in rhythm, and a formal paragraph may take longer than the same number of words in a casual one. For subtitles, line and character counts matter more; use the line count and split long sentences manually.</p>

<h2 id="privacy">Local counting</h2>
<p>There is no upload and no account. The numbers are calculated in your browser as you type, and the editor is cleared when you close the page. Copy the text elsewhere if you need to keep it.</p>`,
  faq: [
    {
      q: 'How does the counter count Arabic words?',
      a: 'It splits the text on whitespace. Each run of non-space characters is one word, which works for Arabic, English, numbers, and mixed text.'
    },
    {
      q: 'Why is the character count higher than the number of visible letters?',
      a: 'Harakat, spaces, and punctuation are separate Unicode characters. A vocalized word contains the letters plus the marks, so it is longer than the unvocalized spelling.'
    },
    {
      q: 'Is the reading time accurate for Arabic?',
      a: 'It is an estimate based on 170 words per minute. Reading speed varies by dialect, content, and reader. Use it as a rough guide and check with a timed reading for important scripts.'
    },
    {
      q: 'Does it count emoji as one character?',
      a: 'Emoji are counted as code points; a multi-code-point emoji may add more than one. For a platform-specific limit, paste the text into the platform preview to confirm.'
    },
    {
      q: 'Can I count only the text without punctuation?',
      a: 'Not directly. You can remove punctuation with the text cleaner or extractor, then count the result. The counter itself measures what is in the editor.'
    }
  ],
  related: ['arabic-word-frequency', 'arabic-harakat-remover', 'arabic-text-cleaner']
};

const frequencyUi = `
<div class="field">
  <label for="inputBox">Arabic text to analyze</label>
  <textarea class="editor editor--ar editor--tall" id="inputBox" dir="rtl" lang="ar" spellcheck="false" placeholder="الصق عدة فقرات لتحليل الكلمات المتكررة…"></textarea>
</div>
<fieldset class="options">
  <legend>Analysis options</legend>
  <label class="check"><input type="checkbox" id="ignoreStopWords" checked> Ignore common function words</label>
  <div class="field">
    <label for="minLength">Minimum word length</label>
    <input class="input" id="minLength" type="number" min="1" max="8" value="2" inputmode="numeric" style="max-width:120px">
  </div>
</fieldset>
<div class="stats-grid">
  <div class="stat"><span class="stat-value" id="totalWords">0</span><span class="stat-label">Words analyzed</span></div>
  <div class="stat"><span class="stat-value" id="uniqueWords">0</span><span class="stat-label">Unique words</span></div>
</div>
<div class="result-card">
  <div class="result-card-head"><span>Most frequent words</span><span class="meta" id="freqStatus" role="status" aria-live="polite"></span></div>
  <div class="table-wrap">
    <table class="data">
      <thead><tr><th>#</th><th>Word</th><th>Count</th><th>Share</th></tr></thead>
      <tbody id="freqBody"></tbody>
    </table>
  </div>
</div>
<div class="toolbar">
  <button class="btn btn-outline" type="button" data-action="copy">Copy table as TSV</button>
  <button class="btn btn-ghost" type="button" data-action="clear">Clear</button>
</div>`;

const frequency = {
  slug: 'arabic-word-frequency',
  group: 'analyze',
  icon: 'chart',
  shortTitle: 'Word Frequency Counter',
  cardDesc: 'Rank repeated Arabic words and copy the table as TSV.',
  title: 'Arabic Word Frequency Counter – Find Repeated Words',
  description: 'Count repeated Arabic words and rank them by frequency. Ignore stop words, filter short tokens, and copy a clean TSV table for editing or analysis.',
  h1: 'Arabic word frequency counter',
  lede: 'See which Arabic words dominate a text, with counts, shares, and a stop-word filter that removes the noise.',
  eyebrow: 'Find repeated Arabic words',
  published: '2026-10-03',
  modified: '2026-11-01',
  keywords: ['Arabic word frequency', 'count repeated Arabic words', 'Arabic text analysis', 'word list Arabic'],
  ui: frequencyUi,
  scripts: ['tools/frequency.js'],
  article: `
<p>Word frequency is a simple measurement with many uses. It shows what a text is really about, reveals repetition in a translation, helps build a vocabulary list, and catches a keyword that was overused in an article. In Arabic, frequency analysis has an extra wrinkle: the same word can carry different diacritics, and common particles make up a large share of every page.</p>
<p>This counter normalizes harakat, ignores tatweel, lowercases Latin tokens, and can filter a list of common Arabic function words. The result is a ranked table with a count and a percentage share, updated as you type.</p>

<h2 id="how-it-works">How the analysis works</h2>
<ol>
  <li>The text is split into Arabic and Latin tokens. Punctuation and symbols separate tokens but are not counted.</li>
  <li>Harakat and tatweel are removed so <span class="ar-inline">كِتَاب</span> and <span class="ar-inline">كتاب</span> count as the same word.</li>
  <li>Tokens shorter than the minimum length are skipped. The default is two characters, which drops single-letter particles.</li>
  <li>If the stop-word filter is on, common words such as <span class="ar-inline">في</span>, <span class="ar-inline">من</span>, <span class="ar-inline">على</span>, and <span class="ar-inline">هذا</span> are ignored.</li>
  <li>The remaining tokens are grouped, counted, and sorted by count, then alphabetically for ties.</li>
</ol>
<p>The table shows the top 100 words. The two counters above it report how many tokens were analyzed and how many unique words were found.</p>

<h2 id="stop-words">Should you ignore stop words?</h2>
<p>Stop words are the glue of a language: prepositions, pronouns, conjunctions, and demonstratives. In a long Arabic text they often occupy the top of the frequency list, which hides the content words you care about. The filter removes a practical list of these particles and leaves nouns, verbs, and adjectives.</p>
<p>For a keyword analysis, leave the filter on. For a readability or style study, turn it off and look at the full distribution. For a language-learning list, a middle ground works better: keep the filter on but lower the minimum length to one, so short content words are not lost.</p>

<h2 id="normalization">Normalization choices</h2>
<p>The counter strips harakat but does not lemmatize. <span class="ar-inline">يكتب</span>, <span class="ar-inline">كتب</span>, and <span class="ar-inline">الكتاب</span> are different entries even though they share a root. Stemming Arabic is a linguistic task with real trade-offs, and a simple tool that pretends to do it would mislead more than it helps. If you need root analysis, export the table and process it with a dedicated Arabic NLP library.</p>
<p>Latin case is normalized, so <code>Arabic</code> and <code>arabic</code> merge. Arabic has no case, so nothing else changes.</p>

<h2 id="uses">Practical uses</h2>
<ul>
  <li>Check whether a keyword appears often enough in an article, and whether a synonym is used more.</li>
  <li>Find accidental repetition in a translation or a student essay.</li>
  <li>Build a vocabulary list from a short story or a news corpus.</li>
  <li>Compare two drafts by pasting each one and noting the top words.</li>
  <li>Prepare data for a word cloud or a search index.</li>
</ul>

<h2 id="copy">Copying the table</h2>
<p>Press <strong>Copy table as TSV</strong> to put the ranking, word, count, and share on the clipboard as tab-separated values. Paste it into Excel, Google Sheets, or a script. The table is generated locally; nothing is uploaded.</p>`,
  faq: [
    {
      q: 'What counts as a word?',
      a: 'A run of Arabic letters or Latin letters. Punctuation and symbols separate tokens. Harakat and tatweel are removed before counting, so vocalized and plain spellings merge.'
    },
    {
      q: 'What are stop words in Arabic?',
      a: 'They are common function words such as في, من, على, هذا, and كان. The filter removes a practical list so content words rise to the top of the ranking.'
    },
    {
      q: 'Does it find the root of each word?',
      a: 'No. It groups exact normalized tokens. Related forms such as يكتب and كتب remain separate. Root analysis requires a linguistic stemmer, not a frequency counter.'
    },
    {
      q: 'Why are some short words missing?',
      a: 'The minimum length filter defaults to two characters. Lower it to one if you want to include single-letter words, or raise it to focus on longer terms.'
    },
    {
      q: 'Can I export the results?',
      a: 'Yes. Copy table as TSV places the visible top 100 on the clipboard in a format that pastes cleanly into a spreadsheet.'
    }
  ],
  related: ['arabic-word-counter', 'alphabetical-sorter', 'arabic-text-extractor']
};

const urlUi = `
<div class="segmented" role="radiogroup" aria-label="URL conversion direction">
  <input type="radio" name="urlMode" id="urlEncode" value="encode" checked>
  <label for="urlEncode">Encode</label>
  <input type="radio" name="urlMode" id="urlDecode" value="decode">
  <label for="urlDecode">Decode</label>
</div>
<div class="split">
  <div class="field">
    <label for="inputBox">Text or URL</label>
    <textarea class="editor editor--short" id="inputBox" dir="ltr" spellcheck="false" placeholder="https://example.com/search?q=لوحة مفاتيح عربية"></textarea>
  </div>
  <div class="field">
    <div class="split-label"><span>Result</span></div>
    <textarea class="editor editor--mono editor--short" id="outputBox" dir="ltr" readonly placeholder="%D9%84%D9%88%D8%AD%D8%A9..."></textarea>
  </div>
</div>
<div class="toolbar">
  <button class="btn btn-outline" type="button" data-action="copy">Copy result</button>
  <button class="btn btn-ghost" type="button" data-action="clear">Clear</button>
  <span class="grow"></span>
  <span class="tool-status" id="urlStatus" role="status" aria-live="polite"></span>
</div>
<div class="note-box"><p>encodeURI keeps URL structure intact (slashes, colons, question marks). Use it for a full link, not for a single query value.</p></div>`;

const url = {
  slug: 'arabic-url-encoder',
  group: 'convert',
  icon: 'link',
  shortTitle: 'Arabic URL Encoder',
  cardDesc: 'Percent-encode or decode Arabic links and query strings.',
  title: 'Arabic URL Encoder and Decoder – Percent Encoding Online',
  description: 'Encode Arabic text for URLs or decode percent-encoded links back to readable Arabic. Keep slashes and query strings intact with encodeURI in your browser.',
  h1: 'Arabic URL encoder and decoder',
  lede: 'Turn an Arabic link into a safe percent-encoded URL, or decode a copied link back into readable Arabic.',
  eyebrow: 'Links that survive the trip',
  published: '2026-10-05',
  modified: '2026-10-31',
  keywords: ['Arabic URL encoder', 'percent encode Arabic', 'decode Arabic URL', 'Arabic query string'],
  ui: urlUi,
  scripts: ['tools/url.js'],
  article: `
<p>URLs are limited to a small set of ASCII characters. Arabic letters, spaces, and many punctuation marks must be percent-encoded before they can travel safely through browsers, email clients, analytics tools, and server logs. A raw Arabic URL often works when pasted into a browser, then breaks in a chat app, a redirect, or an API request.</p>
<p>This tool encodes with <code>encodeURI</code>, which converts the Arabic characters while leaving the structure of the URL intact: <code>https://</code>, slashes, the question mark, and the separators between query parameters. It can also reverse the process and turn a percent-encoded link back into readable Arabic.</p>

<h2 id="encode">Encoding a full link</h2>
<p>Paste a complete URL such as <code>https://example.com/search?q=لوحة مفاتيح</code> and choose Encode. The Arabic text becomes a sequence of <code>%D9...</code> triplets, while the scheme, host, path slashes, and query punctuation remain readable. That is the correct behavior for a full link.</p>
<p>If you need to encode a single value rather than a complete URL, use your programming language's <code>encodeURIComponent</code> instead. It also encodes slashes and question marks, which would break a full URL but is correct inside one query parameter. This page deliberately uses the full-URL variant so you can paste a link and get a working link back.</p>

<h2 id="decode">Decoding a copied link</h2>
<p>Choose Decode to turn percent triplets back into characters. This is useful when a link arrives from a redirect, an email tracker, or a social app and you want to see the Arabic query before opening it. Decoding also reveals the destination path, which is a simple privacy check before you click.</p>
<p>If the input contains an invalid sequence, the tool reports an error instead of producing a half-decoded link. That usually means the link was truncated when it was copied.</p>

<h2 id="arabic">Why Arabic needs encoding</h2>
<p>Each Arabic letter is two bytes in UTF-8, and each byte becomes a percent triplet. A short Arabic phrase can turn into a long string. The length is normal; it is not a sign that the link is corrupted. Keep the encoded form when you store the URL in a database, a QR code, or an email template, and decode it only for display.</p>
<p>Spaces are another common failure. A raw space ends a URL in many parsers, so it must become <code>%20</code>. The Arabic comma and question mark have their own triplets. Encoding handles all of them consistently.</p>

<h2 id="seo">Canonical URLs and slugs</h2>
<p>For a public page, a readable slug is better for users and for search engines. Percent-encoded Arabic in the path works, but it is hard to share and can be rewritten by different tools. Many Arabic sites use a transliterated Latin slug and keep the Arabic title in the page content. Use this encoder for query strings, tracking parameters, and links that must preserve an exact Arabic value, not as a substitute for a clean site structure.</p>

<h2 id="privacy">Local conversion</h2>
<p>Encoding and decoding happen in your browser. The link is not fetched, opened, or sent anywhere. That matters when the URL contains a private search term or an internal document path.</p>
<div class="callout"><p><strong>Check before sharing:</strong> decode a shortened or tracked link to see the real Arabic query. If it contains private text, remove it before forwarding the link.</p></div>`,
  faq: [
    {
      q: 'What does percent encoding do?',
      a: 'It replaces characters that are not allowed in a URL with a percent sign and two hexadecimal digits. Arabic letters become sequences such as %D9%84.'
    },
    {
      q: 'Does it encode the whole URL or just the Arabic part?',
      a: 'It uses encodeURI, so the URL structure stays intact (https, slashes, question mark) and the Arabic characters are encoded. Use encodeURIComponent in code if you need to encode a single query value.'
    },
    {
      q: 'Can I decode a link before opening it?',
      a: 'Yes. Choose Decode and paste the link. The tool shows the readable Arabic and the destination path without fetching the page.'
    },
    {
      q: 'Why is the encoded link so long?',
      a: 'Each Arabic letter uses two UTF-8 bytes, and each byte becomes three characters in percent form. The length is expected and does not mean the link is broken.'
    },
    {
      q: 'Is the link opened or sent anywhere?',
      a: 'No. Conversion is local JavaScript. The URL is not requested, logged, or shared by this site.'
    }
  ],
  related: ['arabic-text-cleaner', 'arabic-numerals-converter', 'arabic-text-to-speech']
};

const ttsUi = `
<div class="field">
  <label for="text">Arabic text to read aloud</label>
  <textarea class="editor editor--ar editor--tall" id="text" dir="rtl" lang="ar" spellcheck="false" placeholder="الصق النص العربي هنا ثم اضغط استمع…"></textarea>
</div>
<div class="mode-bar" style="margin-top:14px">
  <div class="field" style="min-width:260px">
    <label for="voiceSelect">Voice</label>
    <select class="select" id="voiceSelect"></select>
  </div>
  <div class="field" style="min-width:220px">
    <div class="slider-row">
      <label for="rateRange">Speed <output id="rateValue">1.0×</output></label>
      <input type="range" id="rateRange" min="0.5" max="1.5" step="0.1" value="1">
    </div>
  </div>
</div>
<div class="visualizer" aria-hidden="true"><span class="bar"></span><span class="bar"></span><span class="bar"></span><span class="bar"></span><span class="bar"></span><span class="bar"></span><span class="bar"></span></div>
<div class="toolbar">
  <button class="btn btn-primary" type="button" data-action="speak">Listen</button>
  <button class="btn btn-outline" type="button" data-action="pause">Pause</button>
  <button class="btn btn-outline" type="button" data-action="stop">Stop</button>
  <button class="btn btn-ghost" type="button" data-action="clear">Clear</button>
  <span class="grow"></span>
  <span class="tool-status" id="ttsStatus" role="status" aria-live="polite"></span>
</div>
<details class="tts-help">
  <summary>No Arabic voice on this device?</summary>
  <div>
    <p>Speech synthesis uses voices installed in your operating system or browser. If the list has no Arabic entry:</p>
    <ul>
      <li>Windows: Settings → Time &amp; Language → Speech → Add voices, then restart the browser.</li>
      <li>Android: Settings → System → Languages → Text-to-speech output, and install an Arabic voice.</li>
      <li>macOS: System Settings → Accessibility → Spoken Content → System Voice → Manage Voices.</li>
    </ul>
    <p>You can still choose a non-Arabic voice, but pronunciation will be poor.</p>
  </div>
</details>`;

const tts = {
  slug: 'arabic-text-to-speech',
  group: 'generate',
  icon: 'volume',
  shortTitle: 'Arabic Text to Speech',
  cardDesc: 'Listen to Arabic with the voices installed on your device.',
  title: 'Arabic Text to Speech – Listen to Arabic Voices Online',
  description: 'Listen to Arabic text read aloud with the voices installed on your device. Pick a voice, adjust the speed, pause or resume, and hear your text instantly.',
  h1: 'Arabic text to speech',
  lede: 'Hear your Arabic text read aloud by the best voice on your device, at the speed you choose.',
  eyebrow: 'Listen to Arabic',
  published: '2026-10-07',
  modified: '2026-11-22',
  keywords: ['Arabic text to speech', 'Arabic TTS', 'listen to Arabic', 'Arabic voice reader'],
  ui: ttsUi,
  scripts: ['tools/tts.js'],
  article: `
<p>Reading Arabic aloud is useful for checking pronunciation, proofreading a translation, learning a dialogue, or listening to a document while doing something else. This page uses the speech synthesis engine built into your browser, so there is nothing to download and no audio is uploaded.</p>
<p>The quality depends on the voices installed on your device. A modern phone usually has a natural Arabic voice; a desktop browser may have none until you add one in the operating system. The tool lists what is available and puts Arabic voices first.</p>

<h2 id="how-to-use">How to listen</h2>
<ol>
  <li>Paste or type Arabic text into the editor.</li>
  <li>Open the voice list and choose an Arabic voice. The language code appears next to each name.</li>
  <li>Adjust the speed if the default is too fast or too slow.</li>
  <li>Press <strong>Listen</strong>. Use <strong>Pause</strong> to stop temporarily and <strong>Stop</strong> to end the reading.</li>
</ol>
<p>Long text is split into passages so the browser does not cut off in the middle. The next passage starts automatically when the current one ends.</p>

<h2 id="voices">Finding an Arabic voice</h2>
<p>The browser can only use voices that are installed in the operating system. If the list contains no Arabic entry, the page cannot synthesize Arabic properly, even though it can still read the characters with a non-Arabic voice. On Windows, add a voice under Settings → Time &amp; Language → Speech. On Android, use Settings → System → Languages → Text-to-speech output. On macOS, open System Settings → Accessibility → Spoken Content → System Voice → Manage Voices.</p>
<p>After installing a voice, reload the page. Some browsers update the list without a reload; others need a fresh tab.</p>

<h2 id="quality">What affects quality</h2>
<ul>
  <li><strong>The voice:</strong> a native Arabic voice handles hamza, ta marbuta, and sun letters correctly. A fallback voice reads them as a foreign language.</li>
  <li><strong>Vocalization:</strong> harakat help the engine choose short vowels. Unvocalized text relies on the engine's language model and may misread ambiguous words.</li>
  <li><strong>Dialect:</strong> most installed voices read Modern Standard Arabic. A Moroccan or Gulf dialect word may be pronounced with standard phonology.</li>
  <li><strong>Speed:</strong> a slower rate can improve clarity, but too slow sounds unnatural and loses sentence rhythm.</li>
</ul>

<h2 id="privacy">Text stays local</h2>
<p>Speech synthesis runs through the browser and the operating system. This site does not receive or store the text, and no audio is sent to a server by the page. The browser vendor's own speech service may be involved depending on the browser and the installed voice; check the browser's privacy settings if that matters for your content.</p>

<h2 id="uses">Good uses</h2>
<p>Listen to a paragraph before publishing to catch a missing word. Use it to practice listening comprehension with a short news text. For a presentation, hear how long a script takes at a normal speed. For a language learner, slow the rate down and repeat a sentence until the rhythm is familiar.</p>
<p>If you need the opposite direction, dictating Arabic with your voice instead of listening to it, the <a href="https://www.speech-typing.com/p/alkitabat-alsawtia.html">Arabic voice typing tool</a> converts speech to text in the browser.</p>
<div class="callout"><p><strong>Not a replacement for a human reader:</strong> synthesized Arabic can misplace stress and pause at the wrong place. Use it as a checking tool, not as a final voice-over.</p></div>`,
  faq: [
    {
      q: 'Why is there no Arabic voice in the list?',
      a: 'The browser uses voices installed in your operating system. Add an Arabic text-to-speech voice in your system settings, then reload the page. The tool cannot download a voice by itself.'
    },
    {
      q: 'Is my text sent to a server?',
      a: 'This page does not upload your text. Speech is produced by the browser and the operating system. Depending on the browser and voice, the vendor’s speech service may be involved.'
    },
    {
      q: 'Can I change the reading speed?',
      a: 'Yes. Use the speed slider from 0.5× to 1.5×. A slower speed can help with learning; a faster speed is useful for skimming a long text.'
    },
    {
      q: 'Does it read Modern Standard Arabic or a dialect?',
      a: 'Most installed voices read Modern Standard Arabic. Dialect words are usually pronounced with standard phonology, so a Darija or Gulf sentence may sound formal.'
    },
    {
      q: 'Why does the reading stop in the middle?',
      a: 'Some browsers limit the length of a single utterance. The tool splits long text into passages and speaks them in sequence, but a very long document can still hit a browser limit.'
    }
  ],
  related: ['arabic-lorem-ipsum', 'darija-keyboard', 'arabic-word-counter']
};

module.exports = [replace, numerals, counter, frequency, url, tts];
