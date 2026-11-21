(function () {
  'use strict';
  var $ = window.AR.$;
  var input = $('#inputBox');
  var output = $('#outputBox');
  var status = $('#extractStatus');

  function extract() {
    var value = input.value;
    if (!value) {
      output.value = '';
      status.textContent = '';
      return;
    }

    var chars = '\\u0621-\\u064A\\u0671-\\u06D3';
    if ($('#keepNumbers').checked) chars += '0-9\\u0660-\\u0669\\u06F0-\\u06F9';
    if ($('#keepPunctuation').checked) chars += ".,!?:;'\\\"\\-()\\[\\]{}«»\\u060C\\u061B\\u061F";
    if ($('#keepHarakat').checked) chars += '\\u064B-\\u065F\\u0670';

    var keepNewlines = $('#keepNewlines').checked;
    var whitespace = ' \\t' + (keepNewlines ? '\\r\\n' : '');
    var re = new RegExp('[^' + chars + whitespace + ']', 'g');
    var result = value.replace(re, '');

    if (keepNewlines) {
      result = result
        .replace(/[ \t]{2,}/g, ' ')
        .replace(/\n{3,}/g, '\n\n');
    } else {
      result = result.replace(/\s+/g, ' ');
    }
    result = result.trim();
    output.value = result;
    status.textContent = result.length.toLocaleString('en-US') + ' characters kept.';
  }

  document.querySelectorAll('#keepNumbers, #keepPunctuation, #keepHarakat, #keepNewlines').forEach(function (box) {
    box.addEventListener('change', extract);
  });
  input.addEventListener('input', extract);

  $('[data-action="copy"]').addEventListener('click', function () {
    window.AR.copy(output.value, 'Extracted Arabic text copied.');
  });
  $('[data-action="clear"]').addEventListener('click', function () {
    input.value = '';
    output.value = '';
    status.textContent = '';
    input.focus();
  });

  extract();
})();
