(function () {
  'use strict';
  var $ = window.AR.$;
  var input = $('#inputBox');
  var output = $('#outputBox');
  var inCount = $('#inputCount');
  var outCount = $('#outputCount');
  var collator = new Intl.Collator('ar', { sensitivity: 'base', numeric: true });

  function sortList() {
    var raw = input.value;
    var lines = raw.split('\n');
    inCount.textContent = raw.trim() ? lines.length + ' lines' : '0 lines';

    if (!raw.trim()) {
      output.value = '';
      outCount.textContent = '0 lines';
      return;
    }

    var list = lines.map(function (line) { return line.trim(); });
    if ($('#removeEmpty').checked) list = list.filter(function (line) { return line.length > 0; });
    if ($('#removeDuplicates').checked) {
      var seen = new Set();
      list = list.filter(function (line) {
        var key = line.toLocaleLowerCase('ar');
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }
    list.sort(collator.compare);
    if ($('#sortDesc').checked) list.reverse();

    output.value = list.join('\n');
    outCount.textContent = list.length + (list.length === 1 ? ' line' : ' lines');
  }

  input.addEventListener('input', window.AR.debounce(sortList, 120));
  document.querySelectorAll('input[name="sortOrder"], #removeDuplicates, #removeEmpty').forEach(function (control) {
    control.addEventListener('change', sortList);
  });

  $('[data-action="copy"]').addEventListener('click', function () {
    window.AR.copy(output.value, 'Sorted list copied.');
  });
  $('[data-action="clear"]').addEventListener('click', function () {
    input.value = '';
    output.value = '';
    sortList();
    input.focus();
  });

  sortList();
})();
