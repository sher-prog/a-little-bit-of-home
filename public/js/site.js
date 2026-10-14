// Progressive enhancement only: the site reads fine with this switched off.
(function () {
  var wrap = document.querySelector('[data-filters]');
  var input = document.querySelector('[data-search-input]');
  var cards = document.querySelectorAll('[data-grid] .mini');
  var empty = document.querySelector('[data-empty]');
  var status = document.querySelector('[data-status]');
  var cat = '';
  function apply() {
    var words = input ? input.value.toLowerCase().split(/\s+/).filter(Boolean) : [];
    var shown = 0;
    cards.forEach(function (card) {
      var hay = card.getAttribute('data-search') || '';
      var ok = (!cat || card.getAttribute('data-category') === cat) && words.every(function (w) { return hay.indexOf(w) > -1; });
      card.hidden = !ok;
      if (ok) shown++;
    });
    if (empty) empty.hidden = shown > 0;
    if (status) {
      var ready = document.querySelectorAll('[data-grid] .mini:not([hidden]):not(.is-soon)').length;
      clearTimeout(announceTimer);
      announceTimer = setTimeout(function () {
        status.textContent = ready + (ready === 1 ? ' recipe' : ' recipes') + ' ready to cook, ' + (shown - ready) + ' on the way' + (cat ? ' in ' + cat : '') + (input && input.value ? ', matching ' + input.value : '');
      }, 300);
    }
  }
  var announceTimer;
  if (wrap) {
    var chips = wrap.querySelectorAll('.tab');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        cat = chip.getAttribute('data-cat');
        chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
        apply();
      });
    });
  }
  if (input) {
    try { var pre = new URLSearchParams(location.search).get('q'); if (pre) input.value = pre.slice(0, 80); } catch (e) {}
    input.addEventListener('input', apply);
    input.form.addEventListener('submit', function (e) { e.preventDefault(); apply(); });
    apply();
  }
  // Remember which ingredients and steps are ticked (per recipe, this browser only), keyed by their text.
  var boxes = document.querySelectorAll('.ing input');
  if (boxes.length) {
    var key = 'ticks:' + location.pathname;
    var saved = [];
    try { saved = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) {}
    var id = function (b) { return (b.parentNode.textContent || '').trim().slice(0, 60); };
    boxes.forEach(function (b) {
      b.checked = saved.indexOf(id(b)) > -1;
      b.addEventListener('change', function () {
        var on = [];
        boxes.forEach(function (x) { if (x.checked) on.push(id(x)); });
        try { localStorage.setItem(key, JSON.stringify(on)); } catch (e) {}
      });
    });
  }
})();
