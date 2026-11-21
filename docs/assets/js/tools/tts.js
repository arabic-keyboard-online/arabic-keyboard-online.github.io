(function () {
  'use strict';
  var $ = window.AR.$;
  var text = $('#text');
  var select = $('#voiceSelect');
  var rate = $('#rateRange');
  var rateValue = $('#rateValue');
  var status = $('#ttsStatus');
  var supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  var voices = [];
  var queue = [];
  var speaking = false;
  var visualizer = document.querySelector('.visualizer');

  function setStatus(message) {
    status.textContent = message;
  }

  function scoreVoice(voice) {
    var lang = (voice.lang || '').toLowerCase();
    if (lang.indexOf('ar') === 0) return 0;
    if (lang.indexOf('en') === 0) return 1;
    return 2;
  }

  function populateVoices() {
    if (!supported) return;
    voices = window.speechSynthesis.getVoices().slice().sort(function (a, b) {
      return scoreVoice(a) - scoreVoice(b) || a.name.localeCompare(b.name);
    });
    if (!voices.length) {
      setStatus('Your browser has not reported any voices yet.');
      return;
    }
    select.innerHTML = '';
    voices.forEach(function (voice) {
      var option = document.createElement('option');
      option.value = voice.name;
      option.textContent = voice.name + ' (' + voice.lang + ')' + (voice.lang.toLowerCase().indexOf('ar') === 0 ? ' — Arabic' : '');
      select.appendChild(option);
    });
    var arabic = voices.find(function (v) { return (v.lang || '').toLowerCase().indexOf('ar') === 0; });
    if (arabic) select.value = arabic.name;
    var arabicCount = voices.filter(function (v) { return (v.lang || '').toLowerCase().indexOf('ar') === 0; }).length;
    setStatus(arabicCount
      ? arabicCount + ' Arabic voice' + (arabicCount > 1 ? 's' : '') + ' available on this device.'
      : 'No Arabic voice found. Install one in your system settings, or pick another voice.');
  }

  function currentVoice() {
    return voices.find(function (v) { return v.name === select.value; }) || null;
  }

  function splitText(value) {
    var parts = value.replace(/\r/g, '').split(/(?<=[.!?؟…\n])\s+/);
    var chunks = [];
    var buffer = '';
    parts.forEach(function (part) {
      if (!part.trim()) return;
      if ((buffer + ' ' + part).length > 220 && buffer) {
        chunks.push(buffer.trim());
        buffer = part;
      } else {
        buffer += (buffer ? ' ' : '') + part;
      }
    });
    if (buffer.trim()) chunks.push(buffer.trim());
    return chunks.length ? chunks : [value];
  }

  function finish() {
    speaking = false;
    if (visualizer) visualizer.classList.remove('playing');
    setStatus('Finished reading.');
  }

  function speakNext() {
    if (!queue.length) { finish(); return; }
    var utterance = new SpeechSynthesisUtterance(queue.shift());
    var voice = currentVoice();
    if (voice) { utterance.voice = voice; utterance.lang = voice.lang; }
    utterance.rate = parseFloat(rate.value) || 1;
    utterance.onend = function () { if (speaking) speakNext(); };
    utterance.onerror = function (event) {
      if (event.error === 'interrupted' || event.error === 'canceled') return;
      speaking = false;
      setStatus('Speech failed: ' + event.error + '. Try another voice.');
    };
    window.speechSynthesis.speak(utterance);
  }

  function speak() {
    if (!supported) {
      setStatus('Speech synthesis is not supported in this browser.');
      return;
    }
    var value = text.value.trim();
    if (!value) {
      window.AR.toast('Paste or type Arabic text first.');
      return;
    }
    window.speechSynthesis.cancel();
    queue = splitText(value);
    speaking = true;
    if (visualizer) visualizer.classList.add('playing');
    setStatus('Reading ' + queue.length + ' passage' + (queue.length > 1 ? 's' : '') + ' aloud…');
    speakNext();
  }

  if (supported) {
    populateVoices();
    window.speechSynthesis.onvoiceschanged = populateVoices;
  } else {
    setStatus('Speech synthesis is not supported in this browser.');
    document.querySelectorAll('[data-action="speak"], [data-action="pause"], [data-action="stop"]').forEach(function (btn) {
      btn.disabled = true;
    });
  }

  $('[data-action="speak"]').addEventListener('click', speak);
  $('[data-action="pause"]').addEventListener('click', function () {
    if (!supported) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setStatus('Resumed.');
      this.textContent = 'Pause';
    } else if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setStatus('Paused.');
      this.textContent = 'Resume';
    }
  });
  $('[data-action="stop"]').addEventListener('click', function () {
    if (!supported) return;
    speaking = false;
    queue = [];
    if (visualizer) visualizer.classList.remove('playing');
    window.speechSynthesis.cancel();
    setStatus('Stopped.');
    var pause = $('[data-action="pause"]');
    if (pause) pause.textContent = 'Pause';
  });

  rate.addEventListener('input', function () {
    rateValue.textContent = parseFloat(rate.value).toFixed(1) + '×';
  });
  $('[data-action="clear"]').addEventListener('click', function () {
    if (supported) { speaking = false; queue = []; window.speechSynthesis.cancel(); }
    if (visualizer) visualizer.classList.remove('playing');
    text.value = '';
    setStatus('Ready.');
    text.focus();
  });
})();
