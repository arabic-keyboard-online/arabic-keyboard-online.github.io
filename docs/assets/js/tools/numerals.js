(function () {
  'use strict';
  var $ = window.AR.$;
  var input = $('#inputBox');
  var output = $('#outputBox');
  var status = $('#numeralStatus');
  var EASTERN = '٠١٢٣٤٥٦٧٨٩';
  var WESTERN = '0123456789';

  function mode() {
    var checked = document.querySelector('input[name="numeralMode"]:checked');
    return checked ? checked.value : 'toEastern';
  }

  function convertDigits(text, from, to) {
    var map = {};
    for (var i = 0; i < 10; i++) map[from.charAt(i)] = to.charAt(i);
    var count = 0;
    var result = text.replace(/[0-9٠-٩]/g, function (d) {
      if (map[d]) { count++; return map[d]; }
      return d;
    });
    return { text: result, count: count };
  }

  function update() {
    var value = input.value;
    if (!value) {
      output.value = '';
      status.textContent = '';
      return;
    }
    var result = mode() === 'toEastern'
      ? convertDigits(value, WESTERN, EASTERN)
      : convertDigits(value, EASTERN, WESTERN);
    output.value = result.text;
    status.textContent = result.count
      ? result.count + ' digits converted to ' + (mode() === 'toEastern' ? 'Arabic-Indic (٠–٩).' : 'Western (0–9).')
      : 'No digits found in the text.';
  }

  document.querySelectorAll('input[name="numeralMode"]').forEach(function (radio) {
    radio.addEventListener('change', update);
  });
  input.addEventListener('input', update);

  $('[data-action="copy"]').addEventListener('click', function () {
    window.AR.copy(output.value, 'Converted text copied.');
  });
  $('[data-action="clear"]').addEventListener('click', function () {
    input.value = '';
    output.value = '';
    status.textContent = '';
    input.focus();
  });

  document.querySelectorAll('[data-example]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      input.value = chip.getAttribute('data-example');
      update();
      input.focus();
    });
  });

  update();
})();
