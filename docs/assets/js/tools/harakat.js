(function () {
  'use strict';
  var $ = window.AR.$;
  var text = $('#text');
  var status = $('#harakatStatus');
  var regex = /[\u064B-\u065F\u0670]/g;

  function updateCount() {
    var found = text.value.match(regex);
    status.textContent = found ? found.length + ' harakat in the text.' : 'No harakat detected yet.';
  }

  function remove() {
    var original = text.value;
    if (!original.trim()) {
      window.AR.toast('Paste some vocalized Arabic first.');
      return;
    }
    var found = original.match(regex);
    var clean = original.replace(regex, '');
    text.value = clean;
    status.textContent = found
      ? 'Removed ' + found.length + ' marks · ' + clean.length.toLocaleString('en-US') + ' characters remain.'
      : 'No harakat found — the text is already unvocalized.';
    window.AR.toast(found ? 'Harakat removed.' : 'No harakat found.');
    text.focus();
  }

  $('[data-action="remove"]').addEventListener('click', remove);
  $('[data-action="copy"]').addEventListener('click', function () {
    window.AR.copy(text.value, 'Text copied.');
  });
  $('[data-action="clear"]').addEventListener('click', function () {
    text.value = '';
    updateCount();
    text.focus();
  });

  text.addEventListener('input', updateCount);
  updateCount();
})();
