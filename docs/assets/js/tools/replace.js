(function () {
  'use strict';
  var $ = window.AR.$;
  var input = $('#inputBox');
  var find = $('#findText');
  var replace = $('#replaceText');
  var output = $('#outputBox');
  var status = $('#replaceStatus');

  function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function replaceAll() {
    var source = input.value;
    var needle = find.value;
    if (!needle) {
      output.value = source;
      status.textContent = 'Type something to find first.';
      return;
    }
    var flags = 'gu' + ($('#matchCase').checked ? '' : 'i');
    var pattern = escapeRegex(needle);
    if ($('#wholeWord').checked) {
      pattern = '(?<![\\p{L}\\p{N}])' + pattern + '(?![\\p{L}\\p{N}])';
    }
    var regex = new RegExp(pattern, flags);
    var matches = source.match(regex);
    var result = source.replace(regex, function () { return replace.value; });
    output.value = result;
    status.textContent = matches
      ? matches.length + ' replacement' + (matches.length > 1 ? 's' : '') + ' made.'
      : 'No match found.';
    if (!matches) window.AR.toast('No match found.');
  }

  $('[data-action="replace"]').addEventListener('click', replaceAll);
  $('[data-action="copy"]').addEventListener('click', function () {
    window.AR.copy(output.value, 'Result copied.');
  });
  $('[data-action="clear"]').addEventListener('click', function () {
    input.value = '';
    output.value = '';
    find.value = '';
    replace.value = '';
    status.textContent = '';
    input.focus();
  });

  input.addEventListener('input', function () {
    if (output.value) replaceAll();
  });
  find.addEventListener('input', function () {
    if (output.value) replaceAll();
  });
  replace.addEventListener('input', function () {
    if (output.value) replaceAll();
  });
  ['#matchCase', '#wholeWord'].forEach(function (sel) {
    var box = $(sel);
    if (box) box.addEventListener('change', function () { if (output.value) replaceAll(); });
  });
})();
