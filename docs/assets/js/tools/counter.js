(function () {
  'use strict';
  var $ = window.AR.$;
  var text = $('#text');
  var els = {
    chars: $('#countChars'),
    noSpaces: $('#countNoSpaces'),
    words: $('#countWords'),
    lines: $('#countLines'),
    sentences: $('#countSentences'),
    paragraphs: $('#countParagraphs'),
    reading: $('#countReading')
  };
  var wordsRegex = /[^\s\u200B-\u200D\uFEFF]+/g;

  function countWords(value) {
    var matches = value.match(wordsRegex);
    return matches ? matches.length : 0;
  }

  function countSentences(value) {
    return value
      .replace(/\n+/g, ' ')
      .split(/[.!?؟…]+/)
      .filter(function (part) { return part.trim().length > 0; }).length;
  }

  function countParagraphs(value) {
    return value.split(/\n\s*\n/).filter(function (p) { return p.trim().length > 0; }).length;
  }

  function update() {
    var value = text.value;
    var chars = Array.from(value).length;
    var words = countWords(value);
    els.chars.textContent = chars.toLocaleString('en-US');
    els.noSpaces.textContent = Array.from(value.replace(/\s/g, '')).length.toLocaleString('en-US');
    els.words.textContent = words.toLocaleString('en-US');
    els.lines.textContent = value ? value.split('\n').length.toLocaleString('en-US') : '0';
    els.sentences.textContent = countSentences(value).toLocaleString('en-US');
    els.paragraphs.textContent = countParagraphs(value).toLocaleString('en-US');
    var minutes = Math.ceil(words / 170);
    els.reading.textContent = words ? '≈ ' + (minutes < 1 ? 'under 1' : minutes) + ' min' : '—';
  }

  text.addEventListener('input', update);
  $('[data-action="copy"]').addEventListener('click', function () {
    window.AR.copy(text.value, 'Text copied.');
  });
  $('[data-action="clear"]').addEventListener('click', function () {
    text.value = '';
    update();
    text.focus();
  });

  update();
})();
