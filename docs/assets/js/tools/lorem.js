(function () {
  'use strict';
  var $ = window.AR.$;
  var countInput = $('#paraCount');
  var htmlBox = $('#addHtmlTags');
  var output = $('#outputBox');
  var status = $('#loremStatus');

  var corpus = [
    'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.',
    'لقد تم توليد هذا النص من مولد النص العربي، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى.',
    'إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك المولد زيادة العدد كما تريد.',
    'النص لن يبدو مقسماً ولا يحوي أخطاء لغوية.',
    'مولد النص العربي مفيد لمصممي المواقع على وجه الخصوص.',
    'يحتاج العميل في كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع.',
    'على المصمم أن يضع نصوصاً مؤقتة على التصميم ليظهر للعميل الشكل كاملاً.',
    'دور مولد النص العربي أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع.',
    'هذا النص يمكن أن يتم تركيبه على أي تصميم دون مشكلة فلن يبدو وكأنه نص منسوخ.',
    'تعتبر اللغة العربية من أغنى اللغات في العالم من حيث المفردات والتراكيب اللغوية.',
    'استخدام نص عربي تجريبي يساعد في ضبط المسافات بين السطور وتنسيق الفقرات بشكل صحيح.',
    'الخطوط العربية تختلف جذرياً عن الخطوط اللاتينية في الارتفاع والانخفاض.',
    'يجب دائماً تجربة التصميم بنص عربي حقيقي لمعرفة مدى توافق الخطوط.',
    'التصميم الجيد هو الذي يوازن بين الجمال الوظيفي وسهولة القراءة للمستخدم النهائي.',
    'يهدف هذا المولد إلى تيسير العمل اليومي للمطورين والمصممين في العالم العربي.',
    'الفقرات القصيرة تناسب البطاقات والقوائم، بينما تحتاج الصفحات الطويلة إلى نص أكثر تفصيلاً.',
    'يمكنك نسخ النص الناتج ولصقه في برنامج التصميم أو محرر الأكواد مباشرة.',
    'كل فقرة مستقلة عن الأخرى حتى تبدو الصفحة طبيعية أثناء العرض على العميل.'
  ];

  function pickSentences(n) {
    var pool = corpus.slice();
    var picked = [];
    while (picked.length < n && pool.length) {
      var i = Math.floor(Math.random() * pool.length);
      picked.push(pool.splice(i, 1)[0]);
    }
    return picked;
  }

  function generate() {
    var count = Math.max(1, Math.min(10, parseInt(countInput.value, 10) || 1));
    var useHtml = htmlBox.checked;
    var paragraphs = [];
    for (var i = 0; i < count; i++) {
      var sentences = pickSentences(3 + Math.floor(Math.random() * 4));
      var paragraph = sentences.join(' ');
      paragraphs.push(useHtml ? '<p dir="rtl">' + paragraph + '</p>' : paragraph);
    }
    var result = paragraphs.join(useHtml ? '\n\n' : '\n\n');
    output.value = result;
    output.style.direction = useHtml ? 'ltr' : 'rtl';
    output.style.textAlign = useHtml ? 'left' : 'right';
    output.style.fontFamily = useHtml ? "'Manrope', sans-serif" : "'Noto Naskh Arabic', serif";
    status.textContent = count + (count === 1 ? ' paragraph' : ' paragraphs') + ' · ' +
      result.replace(/<[^>]+>/g, '').trim().split(/\s+/).length + ' words';
  }

  $('[data-action="generate"]').addEventListener('click', generate);
  countInput.addEventListener('input', window.AR.debounce(generate, 250));
  htmlBox.addEventListener('change', generate);
  $('[data-action="copy"]').addEventListener('click', function () {
    window.AR.copy(output.value, 'Placeholder text copied.');
  });
  $('[data-action="clear"]').addEventListener('click', function () {
    output.value = '';
    status.textContent = '';
  });

  generate();
})();
