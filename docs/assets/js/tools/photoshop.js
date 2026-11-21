(function () {
  'use strict';
  var $ = window.AR.$;
  var input = $('#inputBox');
  var output = $('#outputBox');
  var status = $('#psStatus');

  // Arabic presentation forms: [isolated, final, initial, medial]
  var FORMS = {
    'ا': ['\uFE8D', '\uFE8E', '\uFE8D', '\uFE8E'],
    'أ': ['\uFE83', '\uFE84', '\uFE83', '\uFE84'],
    'إ': ['\uFE87', '\uFE88', '\uFE87', '\uFE88'],
    'آ': ['\uFE81', '\uFE82', '\uFE81', '\uFE82'],
    'ب': ['\uFE8F', '\uFE90', '\uFE91', '\uFE92'],
    'ت': ['\uFE95', '\uFE96', '\uFE97', '\uFE98'],
    'ث': ['\uFE99', '\uFE9A', '\uFE9B', '\uFE9C'],
    'ج': ['\uFE9D', '\uFE9E', '\uFE9F', '\uFEA0'],
    'ح': ['\uFEA1', '\uFEA2', '\uFEA3', '\uFEA4'],
    'خ': ['\uFEA5', '\uFEA6', '\uFEA7', '\uFEA8'],
    'د': ['\uFEA9', '\uFEAA', '\uFEA9', '\uFEAA'],
    'ذ': ['\uFEAB', '\uFEAC', '\uFEAB', '\uFEAC'],
    'ر': ['\uFEAD', '\uFEAE', '\uFEAD', '\uFEAE'],
    'ز': ['\uFEAF', '\uFEB0', '\uFEAF', '\uFEB0'],
    'س': ['\uFEB1', '\uFEB2', '\uFEB3', '\uFEB4'],
    'ش': ['\uFEB5', '\uFEB6', '\uFEB7', '\uFEB8'],
    'ص': ['\uFEB9', '\uFEBA', '\uFEBB', '\uFEBC'],
    'ض': ['\uFEBD', '\uFEBE', '\uFEBF', '\uFEC0'],
    'ط': ['\uFEC1', '\uFEC2', '\uFEC3', '\uFEC4'],
    'ظ': ['\uFEC5', '\uFEC6', '\uFEC7', '\uFEC8'],
    'ع': ['\uFEC9', '\uFECA', '\uFECB', '\uFECC'],
    'غ': ['\uFECD', '\uFECE', '\uFECF', '\uFED0'],
    'ف': ['\uFED1', '\uFED2', '\uFED3', '\uFED4'],
    'ق': ['\uFED5', '\uFED6', '\uFED7', '\uFED8'],
    'ك': ['\uFED9', '\uFEDA', '\uFEDB', '\uFEDC'],
    'ل': ['\uFEDD', '\uFEDE', '\uFEDF', '\uFEE0'],
    'م': ['\uFEE1', '\uFEE2', '\uFEE3', '\uFEE4'],
    'ن': ['\uFEE5', '\uFEE6', '\uFEE7', '\uFEE8'],
    'ه': ['\uFEE9', '\uFEEA', '\uFEEB', '\uFEEC'],
    'و': ['\uFEED', '\uFEEE', '\uFEED', '\uFEEE'],
    'ي': ['\uFEF1', '\uFEF2', '\uFEF3', '\uFEF4'],
    'ة': ['\uFEE3', '\uFEE4', '', ''],
    'ى': ['\uFEEF', '\uFEF0', '\uFEEF', '\uFEF0'],
    'ئ': ['\uFE89', '\uFE8A', '\uFE8B', '\uFE8C'],
    'ؤ': ['\uFE85', '\uFE86', '\uFE85', '\uFE86'],
    'ء': ['\uFE80', '\uFE80', '\uFE80', '\uFE80']
  };
  var LIGATURES = { 'لا': '\uFEFB', 'لأ': '\uFEF7', 'لإ': '\uFEF9', 'لآ': '\uFEF5' };
  var NON_CONNECTING = new Set(['ا', 'أ', 'إ', 'آ', 'د', 'ذ', 'ر', 'ز', 'و', 'ؤ', 'ء', 'ة', 'ى']);
  var MARK = /[\u064B-\u0652\u0670]/;
  var TATWEEL = '\u0640';

  function isLetter(ch) {
    return !!FORMS[ch];
  }
  function connects(ch) {
    return isLetter(ch) && !NON_CONNECTING.has(ch);
  }

  function fixLine(line) {
    var tokens = [];
    for (var i = 0; i < line.length; i++) {
      var ch = line.charAt(i);
      if (MARK.test(ch)) {
        if (tokens.length) tokens[tokens.length - 1].marks += ch;
        else tokens.push({ ch: ch, marks: '' });
        continue;
      }
      var pair = line.substr(i, 2);
      if (LIGATURES[pair]) {
        tokens.push({ ch: LIGATURES[pair], marks: '', ligature: true });
        i++;
        continue;
      }
      tokens.push({ ch: ch, marks: '' });
    }

    tokens.forEach(function (token, index) {
      if (token.ligature) { token.out = token.ch; return; }
      if (!isLetter(token.ch)) { token.out = token.ch; return; }
      var prev = tokens[index - 1];
      var next = tokens[index + 1];
      var prevCh = prev ? prev.ch : '';
      var nextCh = next ? next.ch : '';
      var connectBefore = prev && (isLetter(prevCh) || prevCh === TATWEEL) && !NON_CONNECTING.has(prevCh);
      var connectAfter = next && (isLetter(nextCh) || nextCh === TATWEEL);
      var forms = FORMS[token.ch];
      if (connectBefore && connectAfter && forms[3]) token.out = forms[3];
      else if (connectBefore && forms[1]) token.out = forms[1];
      else if (connectAfter && forms[2]) token.out = forms[2];
      else token.out = forms[0];
    });

    return tokens.reverse().map(function (token) {
      return (token.out || token.ch) + token.marks;
    }).join('');
  }

  function fixText() {
    var value = input.value;
    if (!value) {
      output.value = '';
      status.textContent = '';
      return;
    }
    output.value = value.split('\n').map(fixLine).join('\n');
    status.textContent = 'Ready — paste the right-hand result straight into a text layer.';
  }

  input.addEventListener('input', fixText);
  $('[data-action="copy"]').addEventListener('click', function () {
    window.AR.copy(output.value, 'Photoshop-ready text copied.');
  });
  $('[data-action="clear"]').addEventListener('click', function () {
    input.value = '';
    output.value = '';
    status.textContent = '';
    input.focus();
  });

  fixText();
})();
