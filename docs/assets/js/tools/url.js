(function () {
  'use strict';
  var $ = window.AR.$;
  var input = $('#inputBox');
  var output = $('#outputBox');
  var status = $('#urlStatus');

  function mode() {
    var checked = document.querySelector('input[name="urlMode"]:checked');
    return checked ? checked.value : 'encode';
  }

  function convert() {
    var value = input.value;
    if (!value) {
      output.value = '';
      status.textContent = '';
      return;
    }
    try {
      if (mode() === 'encode') {
        output.value = encodeURI(value);
        status.textContent = 'Encoded with encodeURI — safe for full URLs and query strings.';
      } else {
        output.value = decodeURI(value);
        status.textContent = 'Decoded URI back to readable Arabic.';
      }
      output.classList.remove('is-error');
    } catch (error) {
      output.value = '';
      output.classList.add('is-error');
      status.textContent = 'This is not a valid URI sequence: ' + error.message;
    }
  }

  document.querySelectorAll('input[name="urlMode"]').forEach(function (radio) {
    radio.addEventListener('change', convert);
  });
  input.addEventListener('input', convert);

  $('[data-action="copy"]').addEventListener('click', function () {
    window.AR.copy(output.value, 'URL copied.');
  });
  $('[data-action="clear"]').addEventListener('click', function () {
    input.value = '';
    output.value = '';
    status.textContent = '';
    input.focus();
  });

  convert();
})();
