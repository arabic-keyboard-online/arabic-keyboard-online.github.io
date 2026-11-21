(function () {
  'use strict';
  var $ = window.AR.$;
  var input = $('#inputBox');
  var output = $('#outputBox');
  var inputLabel = $('#inputLabel');
  var outputLabel = $('#outputLabel');
  var status = $('#punctStatus');

  function mode() {
    var checked = document.querySelector('input[name="pmode"]:checked');
    return checked ? checked.value : 'toArabic';
  }

  function convert() {
    var value = input.value;
    var m = mode();
    var labels = m === 'toArabic'
      ? ['Latin punctuation', 'Arabic punctuation']
      : ['Arabic punctuation', 'Latin punctuation'];
    inputLabel.textContent = labels[0];
    outputLabel.textContent = labels[1];

    if (!value) {
      output.value = '';
      status.textContent = '';
      return;
    }

    var result = value;
    if (m === 'toArabic') {
      result = result
        .replace(/(?<!\d),(?!\d)/g, '،')
        .replace(/\?/g, '؟')
        .replace(/;/g, '؛');
    } else {
      result = result
        .replace(/،/g, ',')
        .replace(/؟/g, '?')
        .replace(/؛/g, ';');
    }
    output.value = result;
    status.textContent = value === result ? 'No punctuation to change.' : 'Converted punctuation where needed.';
  }

  document.querySelectorAll('input[name="pmode"]').forEach(function (radio) {
    radio.addEventListener('change', convert);
  });
  input.addEventListener('input', convert);

  $('[data-action="copy"]').addEventListener('click', function () {
    window.AR.copy(output.value, 'Converted text copied.');
  });
  $('[data-action="clear"]').addEventListener('click', function () {
    input.value = '';
    output.value = '';
    status.textContent = '';
    input.focus();
  });

  convert();
})();
