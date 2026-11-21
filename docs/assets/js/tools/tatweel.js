(function () {
  'use strict';
  var $ = window.AR.$;
  var input = $('#inputBox');
  var output = $('#outputBox');
  var status = $('#tatweelStatus');
  var TATWEEL = '\u0640';
  var NON_CONNECTING = new Set(['ا', 'أ', 'إ', 'آ', 'د', 'ذ', 'ر', 'ز', 'و', 'ؤ', 'ء', 'ة', 'ى']);
  var HARAKAT = /[\u064B-\u065F\u0670]/;
  var ARABIC = /[\u0621-\u064A\u0671-\u06D3]/;

  function isConnecting(ch) {
    return ARABIC.test(ch) && !NON_CONNECTING.has(ch);
  }

  function mode() {
    var checked = document.querySelector('input[name="tatMode"]:checked');
    return checked ? checked.value : 'add';
  }

  function length() {
    var checked = document.querySelector('input[name="tatLength"]:checked');
    return checked ? parseInt(checked.value, 10) : 1;
  }

  function updateLengthState() {
    var wrap = document.getElementById('lengthOptions');
    var disabled = mode() !== 'add';
    wrap.classList.toggle('is-disabled', disabled);
    wrap.querySelectorAll('input').forEach(function (r) { r.disabled = disabled; });
  }

  function process() {
    var value = input.value;
    if (!value) {
      output.value = '';
      status.textContent = '';
      return;
    }

    if (mode() === 'remove') {
      var cleaned = value.replace(new RegExp(TATWEEL, 'g'), '');
      output.value = cleaned;
      status.textContent = 'Tatweel characters removed.';
      return;
    }

    var clean = value.replace(new RegExp(TATWEEL, 'g'), '');
    var stretch = new Array(length() + 1).join(TATWEEL);
    var result = '';
    var count = 0;
    for (var i = 0; i < clean.length; i++) {
      var ch = clean.charAt(i);
      result += ch;
      if (!isConnecting(ch)) continue;

      var j = i + 1;
      var marks = '';
      while (j < clean.length && HARAKAT.test(clean.charAt(j))) {
        marks += clean.charAt(j);
        j++;
      }
      if (j < clean.length && ARABIC.test(clean.charAt(j))) {
        result += marks + stretch;
        count++;
        i = j - 1;
      }
    }
    output.value = result;
    status.textContent = count + ' kashida joins added · ' + length() + ' tatweel mark' + (length() > 1 ? 's' : '') + ' per join.';
  }

  document.querySelectorAll('input[name="tatMode"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      updateLengthState();
      process();
    });
  });
  document.querySelectorAll('input[name="tatLength"]').forEach(function (radio) {
    radio.addEventListener('change', process);
  });
  input.addEventListener('input', process);

  $('[data-action="copy"]').addEventListener('click', function () {
    window.AR.copy(output.value, 'Result copied.');
  });
  $('[data-action="clear"]').addEventListener('click', function () {
    input.value = '';
    output.value = '';
    status.textContent = '';
    input.focus();
  });

  updateLengthState();
  process();
})();
