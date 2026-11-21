(function () {
  'use strict';
  var $ = window.AR.$;
  var text = $('#text');
  var status = $('#cleanStatus');
  var count = $('#charCount');

  function updateCount() {
    var raw = text.value;
    var words = raw.trim() ? raw.trim().split(/\s+/).length : 0;
    count.textContent = raw.length.toLocaleString('en-US') + ' characters · ' + words.toLocaleString('en-US') + ' words';
  }

  function clean() {
    var value = text.value;
    if (!value.trim()) {
      window.AR.toast('Paste some Arabic text first.');
      return;
    }
    var before = value;
    var notes = [];

    if ($('#optSpaces').checked) {
      var collapsed = value.replace(/[ \t]{2,}/g, ' ');
      if (collapsed !== value) notes.push('repeated spaces');
      value = collapsed;
    }
    if ($('#optLines').checked) {
      var lines = value.replace(/\n{3,}/g, '\n\n');
      if (lines !== value) notes.push('extra line breaks');
      value = lines;
    }
    if ($('#optPunct').checked) {
      var punct = value
        .replace(/(?<!\d),(?!\d)/g, '،')
        .replace(/\?/g, '؟')
        .replace(/;/g, '؛');
      if (punct !== value) notes.push('Latin punctuation');
      value = punct;
    }
    if ($('#optPunctSpaces').checked) {
      var spaced = value
        .replace(/\s+([،؛؟!.:])/g, '$1')
        .replace(/([،؛؟!.:])(?=[^\s"')\]}>])/g, '$1 ');
      if (spaced !== value) notes.push('punctuation spacing');
      value = spaced;
    }

    value = value.trim();
    text.value = value;
    updateCount();

    if (value === before) {
      status.textContent = 'No changes were needed — the text already follows the selected rules.';
    } else {
      status.textContent = 'Cleaned: ' + notes.join(', ') + '.';
    }
    window.AR.toast('Text cleaned.');
    text.focus();
  }

  $('[data-action="clean"]').addEventListener('click', clean);
  $('[data-action="copy"]').addEventListener('click', function () {
    window.AR.copy(text.value, 'Clean text copied.');
  });
  $('[data-action="clear"]').addEventListener('click', function () {
    text.value = '';
    status.textContent = '';
    updateCount();
    text.focus();
  });

  text.addEventListener('input', updateCount);
  updateCount();
})();
