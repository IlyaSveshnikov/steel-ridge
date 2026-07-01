const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Header scroll
const hdr = document.getElementById('hdr');
window.addEventListener('scroll', () => hdr.classList.toggle('scrolled', scrollY > 50), { passive: true });

// Mobile nav (доступное меню: aria, Esc, фокус-трап)
const hbg = document.getElementById('hbg');
const mob = document.getElementById('mob');
const mobLinks = mob.querySelectorAll('.ml');

function openMenu() {
  hbg.classList.add('open');
  mob.classList.add('open');
  hbg.setAttribute('aria-expanded', 'true');
  hbg.setAttribute('aria-label', 'Закрыть меню');
  document.body.style.overflow = 'hidden';
  mobLinks[0].focus();
}
function closeMenu(returnFocus = true) {
  hbg.classList.remove('open');
  mob.classList.remove('open');
  hbg.setAttribute('aria-expanded', 'false');
  hbg.setAttribute('aria-label', 'Открыть меню');
  document.body.style.overflow = '';
  if (returnFocus) hbg.focus();
}
hbg.addEventListener('click', () => mob.classList.contains('open') ? closeMenu() : openMenu());
mobLinks.forEach(a => a.addEventListener('click', () => closeMenu(false)));
mob.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeMenu(); return; }
  if (e.key === 'Tab') { // простой фокус-трап по ссылкам меню
    const first = mobLinks[0], last = mobLinks[mobLinks.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

// Hero parallax
(function() {
  const heroEl  = document.getElementById('hero');
  const content = heroEl.querySelector('.hero-content');
  if (reduceMotion) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y < heroEl.offsetHeight) {
        content.style.transform = `translateY(${y * 0.18}px)`;
      }
      ticking = false;
    });
  }, { passive: true });
})();

// Scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.rv').forEach(el => obs.observe(el));

// Hero stagger on load
window.addEventListener('load', () => {
  if (reduceMotion) return;
  const els = document.querySelectorAll('.hero-content > *');
  els.forEach((el, i) => {
    el.style.cssText = `opacity:0;transform:translateY(18px);transition:opacity .6s ease ${i*.12}s,transform .6s ease ${i*.12}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    }));
  });
});

// Count-up статистики (один раз при появлении)
(function() {
  const nums = document.querySelectorAll('.stat-num[data-count]');
  if (reduceMotion) return; // финальные значения уже в разметке
  const animate = el => {
    const target = +el.dataset.count, suffix = el.dataset.suffix || '';
    const start = performance.now(), dur = 1400;
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const co = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { animate(e.target); co.unobserve(e.target); } });
  }, { threshold: 0.5 });
  nums.forEach(n => co.observe(n));
})();

// Active nav highlight
const secs = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { if (scrollY >= s.offsetTop - 120) cur = s.id; });
  navAs.forEach(a => { a.style.color = a.getAttribute('href') === '#'+cur ? 'var(--white)' : ''; });
}, { passive: true });

// Lightbox для работ
(function() {
  const cards = [...document.querySelectorAll('.wc[data-img]')];
  const lb = document.getElementById('lb');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  let idx = 0, lastFocus = null;

  const show = i => {
    idx = (i + cards.length) % cards.length;
    const c = cards[idx];
    lbImg.src = c.dataset.img;
    lbImg.alt = c.dataset.cap;
    lbCap.textContent = c.dataset.cap;
  };
  const open = i => {
    lastFocus = document.activeElement;
    show(i);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  };
  const close = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  };

  cards.forEach((c, i) => {
    c.addEventListener('click', () => open(i));
    c.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });
  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', () => show(idx - 1));
  lbNext.addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
    else if (e.key === 'Tab') { // фокус-трап между кнопками
      const f = [lbClose, lbPrev, lbNext], first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();

// FAQ-аккордеон
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const open = q.getAttribute('aria-expanded') === 'true';
    const panel = document.getElementById(q.getAttribute('aria-controls'));
    q.setAttribute('aria-expanded', String(!open));
    panel.style.maxHeight = open ? '0' : panel.scrollHeight + 'px';
  });
});

// Калькулятор стоимости кровли
(function() {
  const WORK_RATE = 350; // ₽/м² базовый монтаж
  const matGroup = document.getElementById('calcMaterial');
  const cmpGroup = document.getElementById('calcComplexity');
  const addons   = [...document.querySelectorAll('#calcAddons input')];
  const range    = document.getElementById('calcAreaRange');
  const num       = document.getElementById('calcAreaNum');
  const areaVal  = document.getElementById('calcAreaVal');
  if (!matGroup) return;

  const fmt = n => Math.round(n).toLocaleString('ru-RU') + ' ₽';

  const recalc = () => {
    const price = +matGroup.querySelector('.seg.active').dataset.price;
    const mult  = +cmpGroup.querySelector('.seg.active').dataset.mult;
    const area  = +num.value || 0;
    const addPerM2 = addons.reduce((s, c) => s + (c.checked ? +c.dataset.add : 0), 0);

    const matCost  = price * area;
    const workCost = WORK_RATE * mult * area;
    const addCost  = addPerM2 * area;
    const total    = matCost + workCost + addCost;

    document.getElementById('calcMatSum').textContent  = fmt(matCost);
    document.getElementById('calcWorkSum').textContent = fmt(workCost);
    document.getElementById('calcAddSum').textContent  = addCost ? fmt(addCost) : '—';
    document.getElementById('calcTotal').textContent   = total ? fmt(total) : '—';
    document.getElementById('calcRange').textContent   =
      total ? `вилка: ${fmt(total * 0.92)} – ${fmt(total * 1.12)}` : 'диапазон уточняется после замера';
  };

  // выбор материала / сложности (segmented)
  [matGroup, cmpGroup].forEach(group => {
    group.addEventListener('click', e => {
      const seg = e.target.closest('.seg');
      if (!seg) return;
      group.querySelectorAll('.seg').forEach(s => s.classList.remove('active'));
      seg.classList.add('active');
      recalc();
    });
  });
  // синхронизация slider <-> number
  range.addEventListener('input', () => { num.value = range.value; areaVal.textContent = range.value + ' м²'; recalc(); });
  num.addEventListener('input', () => {
    let v = Math.min(+num.value || 0, +num.max);
    range.value = Math.max(v, +range.min);
    areaVal.textContent = (v || 0) + ' м²';
    recalc();
  });
  addons.forEach(c => c.addEventListener('change', recalc));
  recalc();
})();

// Маска телефона
const phEl = document.getElementById('ph');
phEl.addEventListener('input', () => {
  let d = phEl.value.replace(/\D/g, '');
  if (d.startsWith('8')) d = '7' + d.slice(1);
  if (!d.startsWith('7')) d = '7' + d;
  d = d.slice(0, 11);
  let out = '+7';
  if (d.length > 1) out += ' (' + d.slice(1, 4);
  if (d.length >= 4) out += ') ' + d.slice(4, 7);
  if (d.length >= 7) out += '-' + d.slice(7, 9);
  if (d.length >= 9) out += '-' + d.slice(9, 11);
  phEl.value = out;
});

// Валидация и отправка формы (ДЕМО — без бэкенда, заявка реально не уходит)
(function() {
  const form = document.getElementById('cform');
  const setErr = (el, on) => {
    el.classList.toggle('invalid', on);
    el.setAttribute('aria-invalid', on ? 'true' : 'false');
    const err = document.getElementById(el.id + '-err');
    if (err) err.classList.toggle('show', on);
  };
  const validators = {
    nm: el => el.value.trim().length >= 2,
    ph: el => el.value.replace(/\D/g, '').length === 11,
    svc: el => el.value !== ''
  };
  // снимаем ошибку по мере ввода
  Object.keys(validators).forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', () => { if (el.classList.contains('invalid')) setErr(el, !validators[id](el)); });
    el.addEventListener('change', () => setErr(el, !validators[id](el)));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    // honeypot: если заполнено ботом — тихо игнорируем
    if (document.getElementById('company').value) return;

    let firstBad = null, ok = true;
    Object.keys(validators).forEach(id => {
      const el = document.getElementById(id);
      const valid = validators[id](el);
      setErr(el, !valid);
      if (!valid) { ok = false; if (!firstBad) firstBad = el; }
    });
    if (!ok) { firstBad.focus(); return; }

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Отправка…';
    btn.disabled = true;
    // ДЕМО: имитация отправки. Для реальной заявки сюда подключается Formspree/Telegram/бэкенд.
    setTimeout(() => {
      btn.textContent = 'Заявка отправлена!';
      btn.style.background = '#2a9d3a';
      setTimeout(() => {
        btn.textContent = 'Отправить заявку';
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    }, 700);
  });
})();
