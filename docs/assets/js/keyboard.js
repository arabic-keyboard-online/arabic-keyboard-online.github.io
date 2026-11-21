(function () {
  'use strict';

  var VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);
  var VOWEL_COMBOS = {
    aa: 'ا', ee: 'ي', ii: 'ي', oo: 'و', uu: 'و', ou: 'و',
    ai: 'ي', ay: 'ي', au: 'و', aw: 'و', ea: 'ي', ie: 'ي'
  };
  var EASTERN = { '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤', '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩' };
  var PRIMARY = 'ًٌٍَُِْ';
  var SHADDA = 'ّ';

  function toEasternDigits(str) {
    return str.replace(/[0-9]/g, function (d) { return EASTERN[d]; });
  }

  function sortEntries(entries) {
    return entries.slice().sort(function (a, b) {
      if (b[0].length !== a[0].length) return b[0].length - a[0].length;
      return a[0] < b[0] ? 1 : -1;
    });
  }

  window.initKeyboard = function (config) {
    var area = document.querySelector(config.textarea || '#area');
    var kb = document.querySelector(config.keyboard || '#keyboard');
    if (!area || !kb) return;

    var entries = sortEntries(config.translit || []);
    var smartEntries = entries.filter(function (pair) {
      var lat = pair[0];
      var low = lat.toLowerCase();
      if (lat.length > 1) return !VOWEL_COMBOS[low];
      if (lat !== low) return true;
      return !VOWELS.has(low);
    });
    var overrides = config.overrides || {};
    var layout = config.layout || {};
    var buffer = '';
    var mode = 'layout';

    var modeInputs = document.querySelectorAll('input[name="kbMode"]');
    var hintEl = document.getElementById('modeHint');
    var bufferChip = document.getElementById('bufferChip');
    var bufferText = document.getElementById('bufferText');
    var countEl = document.getElementById('kbCount');
    var smartBox = config.smartCheckbox ? document.querySelector(config.smartCheckbox) : null;

    var hints = config.hints || {
      layout: 'Your physical keyboard now types Arabic letters. Keys below use the Arabic 101 layout.',
      arabizi: 'Write Arabizi, then press Space. Example: mrhba → مرحبا',
      latin: 'Latin mode. Type English, numbers, or a URL normally.'
    };

    // ---- rendering ---------------------------------------------------------
    function keyHtml(k, extraClass) {
      var ch = k[0], hint = k[1] || '', cls = (k[2] || '') + (extraClass ? ' ' + extraClass : '');
      return '<button type="button" class="key ' + cls + '" data-char="' + ch.replace(/"/g, '&quot;') +
        '" data-hint="' + hint.replace(/"/g, '&quot;') + '" aria-label="Insert ' + ch.replace(/"/g, '&quot;') + (hint ? ' (' + hint + ')' : '') + '">' +
        '<span class="key-ar" aria-hidden="true">' + ch + '</span>' +
        (hint ? '<span class="key-hint" aria-hidden="true">' + hint + '</span>' : '') +
        '</button>';
    }

    var html = '';
    (config.rows || []).forEach(function (row) {
      html += '<div class="kb-row">' + row.map(function (k) { return keyHtml(k); }).join('') + '</div>';
    });
    if (config.extra && config.extra.length) {
      html += '<div class="kb-row kb-row--extra">' + config.extra.map(function (k) { return keyHtml(k, 'key--extra'); }).join('') + '</div>';
    }
    if (config.diacritics && config.diacritics.length) {
      html += '<div class="kb-row kb-row--diacritics">' + config.diacritics.map(function (k) { return keyHtml(k, 'key--diacritic'); }).join('') + '</div>';
    }
    html += '<div class="kb-row kb-row--actions">' +
      '<button type="button" class="key key--action key--space" data-kb-action="space">Space</button>' +
      '<button type="button" class="key key--action" data-kb-action="backspace">Backspace</button>' +
      '</div>';
    kb.innerHTML = html;

    // ---- helpers -----------------------------------------------------------
    function setMode(next) {
      if (buffer) flushBuffer('');
      mode = next;
      if (hintEl) hintEl.textContent = hints[next] || '';
      updateBuffer();
      area.focus();
    }

    function currentMode() {
      var checked = document.querySelector('input[name="kbMode"]:checked');
      return checked ? checked.value : 'layout';
    }

    function updateBuffer() {
      if (!bufferChip || !bufferText) return;
      bufferChip.hidden = buffer.length === 0;
      bufferText.textContent = buffer;
    }

    function updateCount() {
      if (!countEl) return;
      var text = area.value;
      var chars = text.replace(/\s/g, '').length;
      var words = text.trim() ? text.trim().split(/\s+/).length : 0;
      countEl.textContent = chars.toLocaleString('en-US') + ' characters · ' + words.toLocaleString('en-US') + ' words';
    }

    function dispatchInput() {
      area.dispatchEvent(new Event('input', { bubbles: true }));
      updateCount();
    }

    function insertRaw(text) {
      var start = area.selectionStart;
      var end = area.selectionEnd;
      area.setRangeText(text, start, end, 'end');
      sanitize();
      dispatchInput();
    }

    function sanitize() {
      var text = area.value;
      if (!/[\u064B-\u0652]/.test(text)) return;
      var pos = area.selectionStart;
      var out = '';
      for (var i = 0; i < text.length; i++) {
        var ch = text.charAt(i);
        var last = out.slice(-1);
        if (ch === SHADDA) {
          if (last === SHADDA) continue;
          if (PRIMARY.indexOf(last) !== -1) {
            if (last === 'ْ') out = out.slice(0, -1) + SHADDA;
            else out = out.slice(0, -1) + SHADDA + last;
          } else {
            out += ch;
          }
        } else if (PRIMARY.indexOf(ch) !== -1) {
          if (PRIMARY.indexOf(last) !== -1) {
            out = out.slice(0, -1) + ch;
          } else if (last === SHADDA && ch === 'ْ') {
            out = out.slice(0, -1) + ch;
          } else {
            out += ch;
          }
        } else {
          out += ch;
        }
      }
      if (out !== text) {
        var next = Math.max(0, pos + (out.length - text.length));
        area.value = out;
        area.setSelectionRange(next, next);
      }
    }

    // ---- transliteration ---------------------------------------------------
    function matchAt(word, i, list, caseInsensitive) {
      for (var e = 0; e < list.length; e++) {
        var lat = list[e][0];
        var slice = word.substr(i, lat.length);
        if (caseInsensitive ? slice.toLowerCase() === lat.toLowerCase() : slice === lat) {
          return list[e];
        }
      }
      return null;
    }

    function directConvert(word) {
      var out = '';
      var i = 0;
      while (i < word.length) {
        var hit = matchAt(word, i, entries, false);
        if (hit) {
          out += hit[1];
          i += hit[0].length;
        } else {
          out += word.charAt(i);
          i++;
        }
      }
      return out;
    }

    function smartConvert(word) {
      var lower = word.toLowerCase();
      if (overrides[lower]) return overrides[lower];
      if (/^[0-9]+$/.test(word)) return toEasternDigits(word);

      var suffix = '';
      var base = word;
      var m = lower.match(/(an|un|in)$/);
      if (m && word.length > 3) {
        var stem = word.slice(0, -2);
        if (stem && !/[aeiou]$/i.test(stem)) {
          suffix = m[1] === 'an' ? 'اً' : (m[1] === 'un' ? 'ٌ' : 'ٍ');
          base = stem;
        }
      }

      var out = '';
      var i = 0;
      while (i < base.length) {
        var two = base.substr(i, 2).toLowerCase();
        if (two.length === 2 && VOWEL_COMBOS[two]) {
          out += VOWEL_COMBOS[two];
          i += 2;
          continue;
        }
        var hit = matchAt(base, i, smartEntries, false);
        if (!hit) hit = matchAt(base, i, smartEntries, true);
        if (hit) {
          out += hit[1];
          i += hit[0].length;
          continue;
        }
        var ch = base.charAt(i);
        var low = ch.toLowerCase();
        if (VOWELS.has(low)) {
          var isStart = out.length === 0;
          var isEnd = i === base.length - 1;
          if (isStart) out += (low === 'i' || low === 'e') ? 'إ' : 'ا';
          else if (isEnd) out += low === 'a' ? 'ا' : ((low === 'i' || low === 'e') ? 'ي' : 'و');
          i++;
          continue;
        }
        out += ch;
        i++;
      }

      if (/ya$/i.test(base) && /يا$/.test(out)) out = out.replace(/يا$/, 'ية');
      return out + suffix;
    }

    function isSmart() {
      return !smartBox || smartBox.checked;
    }

    function convertWord(word) {
      if (!word) return word;
      if (/^[0-9]+$/.test(word)) return toEasternDigits(word);
      if (isSmart()) return smartConvert(word);
      return directConvert(word);
    }

    function convertPhrase(text) {
      return text.split(/(\s+)/).map(function (part) {
        return /^\s+$/.test(part) ? part : convertWord(part);
      }).join('');
    }

    function flushBuffer(delimiter) {
      if (!buffer) {
        if (delimiter) insertRaw(delimiter);
        return;
      }
      var converted = convertPhrase(buffer);
      buffer = '';
      updateBuffer();
      insertRaw(converted + (delimiter || ''));
    }

    // ---- events ------------------------------------------------------------
    modeInputs.forEach(function (input) {
      input.addEventListener('change', function () {
        if (input.checked) setMode(input.value);
      });
    });

    if (smartBox) smartBox.addEventListener('change', function () {
      area.focus();
    });

    area.addEventListener('keydown', function (e) {
      if (e.isComposing || e.ctrlKey || e.metaKey || e.altKey) return;
      if (mode === 'arabizi') {
        if (e.key === 'Backspace') {
          if (buffer) {
            e.preventDefault();
            buffer = buffer.slice(0, -1);
            updateBuffer();
          }
          return;
        }
        if (e.key === ' ' || e.key === 'Enter' || e.key === 'Tab' || /^[.,!?;:،؛؟'"()[\]{}<>-]$/.test(e.key)) {
          if (buffer) {
            e.preventDefault();
            flushBuffer(e.key === 'Enter' ? '\n' : e.key);
          }
          return;
        }
        if (e.key.length === 1 && /[A-Za-z0-9'`]/.test(e.key)) {
          e.preventDefault();
          buffer += e.key;
          updateBuffer();
        }
        return;
      }
      if (mode === 'layout' && e.key.length === 1 && !e.isComposing) {
        var key = e.key;
        var mapped = layout[key] || layout[key.toLowerCase()];
        if (mapped) {
          e.preventDefault();
          insertRaw(mapped);
        }
      }
    });

    area.addEventListener('paste', function (e) {
      if (mode !== 'arabizi') return;
      var data = (e.clipboardData || window.clipboardData);
      if (!data) return;
      var text = data.getData('text');
      if (!text) return;
      e.preventDefault();
      insertRaw(convertPhrase(text));
    });

    area.addEventListener('input', function () {
      updateCount();
    });

    kb.addEventListener('pointerdown', function (e) {
      var key = e.target.closest('.key');
      if (key) e.preventDefault();
    });

    kb.addEventListener('click', function (e) {
      var keyEl = e.target.closest('.key');
      if (keyEl && keyEl.dataset.char !== undefined) {
        if (buffer) flushBuffer('');
        insertRaw(keyEl.dataset.char);
        area.focus();
        return;
      }
      var actionEl = e.target.closest('[data-kb-action]');
      if (!actionEl) return;
      var action = actionEl.getAttribute('data-kb-action');
      if (action === 'space') {
        if (buffer) flushBuffer(' ');
        else insertRaw(' ');
        area.focus();
      } else if (action === 'backspace') {
        if (buffer) {
          buffer = buffer.slice(0, -1);
          updateBuffer();
        } else {
          var pos = area.selectionStart;
          if (pos > 0) {
            area.setRangeText('', pos - 1, pos, 'end');
            sanitize();
            dispatchInput();
          }
        }
        area.focus();
      }
    });

    // toolbar actions
    document.querySelectorAll('[data-kb-action]').forEach(function (btn) {
      if (kb.contains(btn)) return;
      btn.addEventListener('click', function () {
        var action = btn.getAttribute('data-kb-action');
        if (action === 'copy') {
          window.AR.copy(area.value, 'Arabic text copied.');
        } else if (action === 'clear') {
          area.value = '';
          buffer = '';
          updateBuffer();
          dispatchInput();
          area.focus();
        } else if (action === 'font-plus' || action === 'font-minus') {
          var current = parseFloat(getComputedStyle(area).fontSize) || 22;
          var size = Math.min(46, Math.max(16, current + (action === 'font-plus' ? 2 : -2)));
          area.style.fontSize = size + 'px';
          area.focus();
        } else if (action === 'google' || action === 'youtube') {
          if (!area.value.trim()) { window.AR.toast('Type something first.'); return; }
          var q = encodeURIComponent(area.value);
          var url = action === 'google' ? 'https://www.google.com/search?q=' + q : 'https://www.youtube.com/results?search_query=' + q;
          window.open(url, '_blank', 'noopener');
        }
      });
    });

    // init
    mode = currentMode();
    if (hintEl) hintEl.textContent = hints[mode] || '';
    updateCount();
    updateBuffer();
  };
})();
