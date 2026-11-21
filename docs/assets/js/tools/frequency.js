(function () {
  'use strict';
  var $ = window.AR.$;
  var input = $('#inputBox');
  var tbody = $('#freqBody');
  var status = $('#freqStatus');
  var totalEl = $('#totalWords');
  var uniqueEl = $('#uniqueWords');

  var STOP = new Set(('في من على إلى عن أن إن كان كانت هذا هذه ذلك تلك التي الذي الذين ما لا لم لن قد و أو ثم بل لكن هو هي هم أنا نحن أنت كما حتى بين عند بعد قبل كل بعض غير سوف يا أي أيها مع دون حول ضد منذ خلال عبر نحو إذا إلا أما فإن وقد وكان ولا وما ومن وفي وهو وهي وكانت عليه عليها إليه إليها فيه فيها له لها به بها منه منها عنه عنها بهم لهم كانوا يكون تكون هناك هنا الآن أيضا كذلك فقط جدا ذات ذو ذي أول آخر أخرى جميع نفس أيار').split(' '));

  var TOKEN = /[\u0621-\u064A\u0671-\u06D3\u064B-\u065F\u0670]+|[A-Za-z][A-Za-z'-]*/g;
  var HARAKAT = /[\u064B-\u065F\u0670\u0640]/g;

  function normalize(word) {
    var clean = word.replace(HARAKAT, '');
    if (/^[A-Za-z]/.test(clean)) return clean.toLowerCase();
    return clean;
  }

  function analyze() {
    var text = input.value;
    var raw = text.match(TOKEN) || [];
    var counts = new Map();
    var total = 0;
    var ignore = $('#ignoreStopWords').checked;
    var min = parseInt(($('#minLength') || {}).value, 10) || 1;

    raw.forEach(function (word) {
      var w = normalize(word);
      if (!w || Array.from(w).length < min) return;
      if (ignore && STOP.has(w)) return;
      total++;
      counts.set(w, (counts.get(w) || 0) + 1);
    });

    var rows = Array.from(counts.entries()).sort(function (a, b) {
      if (b[1] !== a[1]) return b[1] - a[1];
      return a[0].localeCompare(b[0], 'ar');
    });

    totalEl.textContent = total.toLocaleString('en-US');
    uniqueEl.textContent = rows.length.toLocaleString('en-US');
    tbody.innerHTML = '';

    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="4" class="table-empty">Paste some Arabic text to see its most frequent words.</td></tr>';
      status.textContent = '';
      return;
    }

    rows.slice(0, 100).forEach(function (row, index) {
      var tr = document.createElement('tr');
      var pct = total ? ((row[1] / total) * 100).toFixed(1) : '0.0';
      tr.innerHTML = '<td>' + (index + 1) + '</td>' +
        '<td dir="rtl" lang="ar">' + row[0].replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</td>' +
        '<td>' + row[1] + '</td>' +
        '<td><span class="meter"><span style="width:' + Math.min(100, row[1] / rows[0][1] * 100) + '%"></span></span>' + pct + '%</td>';
      tbody.appendChild(tr);
    });

    status.textContent = rows.length + ' unique words across ' + total.toLocaleString('en-US') + ' total words.' + (rows.length > 100 ? ' Showing the top 100.' : '');
  }

  function toTsv() {
    var lines = ['Rank\tWord\tCount\tShare'];
    tbody.querySelectorAll('tr').forEach(function (tr) {
      var cells = tr.querySelectorAll('td');
      if (cells.length === 4) {
        lines.push(cells[0].textContent + '\t' + cells[1].textContent + '\t' + cells[2].textContent + '\t' + cells[3].textContent.replace(/%$/, '').replace(/^\d+(\.\d+)?/, ''));
      }
    });
    return lines.join('\n');
  }

  input.addEventListener('input', analyze);
  ['#ignoreStopWords', '#minLength'].forEach(function (sel) {
    var el = $(sel);
    if (el) el.addEventListener('change', analyze);
  });

  $('[data-action="copy"]').addEventListener('click', function () {
    window.AR.copy(toTsv(), 'Frequency table copied as TSV.');
  });
  $('[data-action="clear"]').addEventListener('click', function () {
    input.value = '';
    analyze();
    input.focus();
  });

  analyze();
})();
