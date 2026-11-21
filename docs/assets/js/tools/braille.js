(function () {
  'use strict';
  var $ = window.AR.$;
  var input = $('#inputBox');
  var output = $('#outputBox');
  var status = $('#brailleStatus');

  // Unified Arabic Braille (Unicode Braille Patterns).
  var letters = {
    'ا': '⠁', 'ب': '⠃', 'ت': '⠞', 'ث': '⠹', 'ج': '⠚', 'ح': '⠱', 'خ': '⠭',
    'د': '⠙', 'ذ': '⠮', 'ر': '⠗', 'ز': '⠵', 'س': '⠎', 'ش': '⠩', 'ص': '⠯',
    'ض': '⠫', 'ط': '⠾', 'ظ': '⠿', 'ع': '⠷', 'غ': '⠣', 'ف': '⠋', 'ق': '⠟',
    'ك': '⠅', 'ل': '⠇', 'م': '⠍', 'ن': '⠝', 'ه': '⠓', 'و': '⠺', 'ي': '⠊',
    'أ': '⠌', 'إ': '⠨', 'آ': '⠜', 'ء': '⠄', 'ؤ': '⠳', 'ئ': '⠽',
    'ة': '⠡', 'ى': '⠕', 'لا': '⠧'
  };
  var digits = {
    '0': '⠚', '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑',
    '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊'
  };
  var punct = {
    '.': '⠲', '،': '⠐', '؛': '⠰', '؟': '⠢', '!': '⠖', ':': '⠒',
    '-': '⠤', '(': '⠶', ')': '⠶', '«': '⠦', '»': '⠴', ' ': '⠀', '\n': '\n'
  };
  var harakat = {
    'َ': '⠂', 'ِ': '⠑', 'ُ': '⠥', 'ً': '⠢', 'ٍ': '⠔', 'ٌ': '⠢', 'ْ': '⠒', 'ّ': '⠠'
  };
  var EASTERN = { '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9', '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9' };
  var NUMBER_SIGN = '⠼';

  function convertBraille() {
    var text = input.value;
    if (!text) {
      output.value = '';
      status.textContent = '';
      return;
    }
    var withHarakat = $('#includeHarakat').checked;
    var out = '';
    var i = 0;

    while (i < text.length) {
      var ch = text.charAt(i);

      // digit runs: one number sign, digits in reading order
      if (digits[ch] || EASTERN[ch]) {
        var run = '';
        while (i < text.length && (digits[text.charAt(i)] || EASTERN[text.charAt(i)])) {
          var ch2 = text.charAt(i);
          var d = digits[ch2] ? ch2 : EASTERN[ch2];
          run += digits[d];
          i++;
        }
        out += NUMBER_SIGN + run;
        continue;
      }

      // Latin runs stay readable in left-to-right order
      if (/[A-Za-z]/.test(ch)) {
        var latin = '';
        while (i < text.length && /[A-Za-z'’-]/.test(text.charAt(i))) {
          latin += text.charAt(i);
          i++;
        }
        out += latin;
        continue;
      }

      if (text.substr(i, 2) === 'لا') {
        out += letters['لا'];
        i += 2;
        continue;
      }

      if (letters[ch]) {
        out += letters[ch];
        i++;
        continue;
      }

      if (harakat[ch]) {
        if (!withHarakat) { i++; continue; }
        if (ch === 'ّ' && out.length) {
          // In Arabic Braille the shadda is placed before its consonant.
          var last = out.slice(-1);
          out = out.slice(0, -1) + harakat[ch] + last;
        } else {
          out += harakat[ch];
        }
        i++;
        continue;
      }

      if (punct[ch] !== undefined) {
        out += punct[ch];
        i++;
        continue;
      }

      if (ch === '\r') { i++; continue; }
      out += ch;
      i++;
    }

    output.value = out;
    var cells = Array.from(out).filter(function (c) { return /[\u2800-\u28FF]/.test(c); }).length;
    status.textContent = cells.toLocaleString('en-US') + ' braille cells · cells read left to right in reading order.';
  }

  document.querySelectorAll('#includeHarakat').forEach(function (box) {
    box.addEventListener('change', convertBraille);
  });
  input.addEventListener('input', convertBraille);

  $('[data-action="copy"]').addEventListener('click', function () {
    window.AR.copy(output.value, 'Braille copied.');
  });
  $('[data-action="clear"]').addEventListener('click', function () {
    input.value = '';
    output.value = '';
    status.textContent = '';
    input.focus();
  });

  convertBraille();
})();
