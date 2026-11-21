(function () {
  'use strict';
  var $ = window.AR.$;
  var input = $('#numberInput');
  var currency = $('#currency');
  var output = $('#outputBox');
  var wrap = $('#wrapPhrase');
  var status = $('#tafqitStatus');

  var units = ['', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة'];
  var teens = ['عشرة', 'أحد عشر', 'اثنا عشر', 'ثلاثة عشر', 'أربعة عشر', 'خمسة عشر', 'ستة عشر', 'سبعة عشر', 'ثمانية عشر', 'تسعة عشر'];
  var tens = ['', 'عشرة', 'عشرون', 'ثلاثون', 'أربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'];
  var hundreds = ['', 'مائة', 'مائتان', 'ثلاثمائة', 'أربعمائة', 'خمسمائة', 'ستمائة', 'سبعمائة', 'ثمانمائة', 'تسعمائة'];
  var scales = [
    null,
    { one: 'ألف', two: 'ألفان', few: 'آلاف', many: 'ألفاً' },
    { one: 'مليون', two: 'مليونان', few: 'ملايين', many: 'مليوناً' },
    { one: 'مليار', two: 'ملياران', few: 'مليارات', many: 'ملياراً' },
    { one: 'تريليون', two: 'تريليونان', few: 'تريليونات', many: 'تريليوناً' }
  ];
  var currencies = {
    none: '',
    eur: 'يورو',
    usd: 'دولار أمريكي',
    mad: 'درهم مغربي',
    dzd: 'دينار جزائري',
    tnd: 'دينار تونسي',
    aed: 'درهم إماراتي',
    sar: 'ريال سعودي',
    qar: 'ريال قطري',
    egp: 'جنيه مصري'
  };

  function groupToWords(value) {
    var parts = [];
    var h = Math.floor(value / 100);
    var rest = value % 100;
    if (h) parts.push(hundreds[h]);
    if (rest) {
      if (rest < 10) {
        parts.push(units[rest]);
      } else if (rest < 20) {
        parts.push(teens[rest - 10]);
      } else {
        var t = Math.floor(rest / 10);
        var u = rest % 10;
        parts.push(u ? units[u] + ' و' + tens[t] : tens[t]);
      }
    }
    return parts.join(' و');
  }

  function numberToWords(num) {
    if (num === 0) return 'صفر';
    var digits = String(num);
    while (digits.length % 3 !== 0) digits = '0' + digits;
    var groups = [];
    var scaleIndex = digits.length / 3 - 1;

    for (var i = 0; i < digits.length; i += 3) {
      var value = parseInt(digits.substr(i, 3), 10);
      if (value > 0) {
        if (scaleIndex === 0) {
          groups.push(groupToWords(value));
        } else {
          var scale = scales[scaleIndex];
          if (value === 1) {
            groups.push(scale.one);
          } else if (value === 2) {
            groups.push(scale.two);
          } else if (value <= 10) {
            groups.push(groupToWords(value) + ' ' + scale.few);
          } else {
            groups.push(groupToWords(value) + ' ' + scale.many);
          }
        }
      }
      scaleIndex--;
    }
    return groups.join(' و');
  }

  function convert() {
    var raw = input.value.trim();
    if (!raw) {
      output.textContent = '…';
      status.textContent = '';
      return;
    }
    var num = Number(raw);
    if (!Number.isFinite(num) || num < 0 || Math.floor(num) !== num) {
      output.textContent = 'Enter a whole, non-negative number.';
      status.textContent = '';
      return;
    }
    if (num > 999999999999999) {
      output.textContent = 'This number is too large. The limit is 999,999,999,999,999.';
      status.textContent = '';
      return;
    }

    var words = numberToWords(num);
    var selected = currency.value;
    var currencyName = currencies[selected];
    var result = words;
    if (currencyName) {
      result = words + ' ' + currencyName;
      if (wrap.checked) result = 'فقط ' + result + ' لا غير';
    }
    output.textContent = result;
    status.textContent = num.toLocaleString('en-US') + ' → ' + (result.length > 90 ? result.slice(0, 90) + '…' : result);
  }

  input.addEventListener('input', convert);
  currency.addEventListener('change', convert);
  if (wrap) wrap.addEventListener('change', convert);

  document.querySelectorAll('[data-example]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      input.value = chip.getAttribute('data-example');
      convert();
      input.focus();
    });
  });

  $('[data-action="copy"]').addEventListener('click', function () {
    if (output.textContent === '…') return;
    window.AR.copy(output.textContent, 'Amount copied.');
  });
  $('[data-action="clear"]').addEventListener('click', function () {
    input.value = '';
    convert();
    input.focus();
  });

  convert();
})();
