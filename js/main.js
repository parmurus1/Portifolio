/* =====================================================================
   Murilo Neves Teixeira · portfólio
   ===================================================================== */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const EMAIL = 'parmurus@gmail.com';
  const wait = (ms) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));

  /* ---------------- entrada ---------------- */
  // a intro de boot (fx.js) segura a entrada até terminar
  const start = () => {
    document.documentElement.classList.add('is-ready');
    typeCode();
  };
  if (document.documentElement.classList.contains('booting')) {
    addEventListener('boot:done', start, { once: true });
    // rede de segurança caso a intro não rode
    setTimeout(() => { if (!document.documentElement.classList.contains('is-ready')) { document.documentElement.classList.remove('booting'); start(); } }, 9000);
  }
  else requestAnimationFrame(() => setTimeout(start, reduce ? 0 : 120));

  /* ---------------- nav ---------------- */
  const nav = $('[data-nav]');
  const navLinks = $$('.nav__links a');
  const sections = [...navLinks.map((a) => $(a.getAttribute('href'))), $('#contato')].filter(Boolean);
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', scrollY > 24);
    let current = null;
    for (const s of sections) if (s.getBoundingClientRect().top < innerHeight * 0.4) current = s.id;
    navLinks.forEach((a) => a.setAttribute('aria-current', a.getAttribute('href') === '#' + current ? 'true' : 'false'));
    timelineProgress();
  };

  /* ---------------- luz que segue o mouse ---------------- */
  if (finePointer && !reduce) {
    const bg = $('.bg');
    addEventListener('pointermove', (e) => {
      bg.style.setProperty('--mx', e.clientX + 'px');
      bg.style.setProperty('--my', e.clientY + 'px');
    }, { passive: true });

    // borda que acende nos cards e no contato
    $$('.card, [data-glow], .editor').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--gx', e.clientX - r.left + 'px');
        el.style.setProperty('--gy', e.clientY - r.top + 'px');
      });
    });

    // o editor inclina levemente
    const ed = $('[data-tilt]');
    if (ed) {
      ed.addEventListener('pointermove', (e) => {
        const r = ed.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ed.style.setProperty('--ry', (px * 6).toFixed(2) + 'deg');
        ed.style.setProperty('--rx', (-py * 5).toFixed(2) + 'deg');
      });
      ed.addEventListener('pointerleave', () => { ed.style.setProperty('--rx', '0deg'); ed.style.setProperty('--ry', '0deg'); });
    }
  }

  /* ---------------- editor: digita o objeto murilo ---------------- */
  const CODE = [
    [['k', 'const '], ['v', 'murilo'], ['p', ' = {']],
    [['p', '  cargo: '], ['s', '"Dev Front-end"'], ['p', ',']],
    [['p', '  escola: '], ['s', '"Senac SP · Técnico em Informática"'], ['p', ',']],
    [['p', '  cidade: '], ['s', '"São Paulo"'], ['p', ',']],
    [['p', '  stack: ['], ['s', '"HTML"'], ['p', ', '], ['s', '"CSS"'], ['p', ', '], ['s', '"JS"'], ['p', ', '], ['s', '"React"'], ['p', '],']],
    [['p', '  repositorios: '], ['n', '16'], ['p', ',']],
    [['p', '  conquistas: ['], ['s', '"Campeão OBAFOG 2026"'], ['p', '],']],
    [['p', '  buscando: '], ['s', '"Jovem Aprendiz ou estágio"'], ['p', ',']],
    [['p', '};']],
    [['p', '']],
    [['c', '// melhor decisão do dia:']],
    [['v', 'murilo'], ['p', '.'], ['f', 'contratar'], ['p', '();']],
  ];
  const codeEl = $('[data-code]');
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const renderLine = (tokens) => tokens.map(([t, s]) => `<span class="tk-${t}">${esc(s)}</span>`).join('');

  async function typeCode() {
    if (!codeEl) return;
    if (reduce) { codeEl.innerHTML = CODE.map((l) => `<span class="ln">${renderLine(l)}</span>`).join(''); return; }
    await wait(700);
    for (const line of CODE) {
      const ln = document.createElement('span');
      ln.className = 'ln';
      codeEl.appendChild(ln);
      const caret = document.createElement('span');
      caret.className = 'caret';
      for (const [t, s] of line) {
        const tok = document.createElement('span');
        tok.className = 'tk-' + t;
        ln.appendChild(tok);
        ln.appendChild(caret);
        for (const ch of s) {
          tok.textContent += ch;
          await new Promise((r) => setTimeout(r, ch === ' ' ? 8 : 16 + Math.random() * 26));
        }
      }
      caret.remove();
      await wait(line.length > 1 ? 70 : 140);
    }
    const last = codeEl.lastElementChild;
    const caret = document.createElement('span');
    caret.className = 'caret';
    last.appendChild(caret);
  }
  /* ---------------- status: último push no GitHub ---------------- */
  (async () => {
    const out = $('[data-status]');
    if (!out) return;
    try {
      const r = await fetch('https://api.github.com/users/parmurus1/events/public?per_page=40');
      if (!r.ok) return;
      const events = await r.json();
      const push = events.find((e) => e.type === 'PushEvent' || e.type === 'CreateEvent');
      if (!push) return;
      const repo = push.repo.name.split('/')[1];
      const diff = (new Date(push.created_at) - Date.now()) / 1000;
      const rtf = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });
      let txt = 'agora';
      for (const [u, s] of [['day', 86400], ['hour', 3600], ['minute', 60]]) {
        if (Math.abs(diff) >= s) { txt = rtf.format(Math.round(diff / s), u); break; }
      }
      out.textContent = `último push ${txt} · ${repo}`;
    } catch (_) { /* fica a bio do GitHub */ }
  })();

  /* ---------------- revelar ao rolar ---------------- */
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  // escalona irmãos que entram juntos
  $$('.bento, .more, .skills, .timeline').forEach((group) => {
    $$(':scope > .reveal', group).forEach((el, i) => el.style.setProperty('--d', `${(i % 3) * 0.08}s`));
  });
  $$('.reveal').forEach((el) => io.observe(el));

  /* ---------------- linha do tempo que se preenche ---------------- */
  const timeline = $('[data-timeline]');
  function timelineProgress() {
    if (!timeline) return;
    const r = timeline.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
    timeline.style.setProperty('--progress', p.toFixed(3));
  }

  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; onScroll(); });
  }, { passive: true });
  onScroll();

  /* ---------------- Frangão: do ovo ao galo ---------------- */
  (() => {
    const stageEl = $('[data-frango-stage]');
    if (!stageEl) return;
    const levelEl = $('[data-frango-level]');
    const xpEl = $('[data-frango-xp]');
    const stages = [['Ovo', 1], ['Pintinho', 3], ['Frango', 6], ['Frango Sarado', 10], ['Galo', 15], ['Galo Lendário', 22]];
    let i = 0, timer = null;
    const show = (k) => {
      stageEl.textContent = stages[k][0];
      levelEl.textContent = stages[k][1];
      xpEl.style.transform = `scaleX(${0.12 + (k / (stages.length - 1)) * 0.88})`;
    };
    if (reduce) { show(2); return; }
    show(0);
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !timer) timer = setInterval(() => { i = (i + 1) % stages.length; show(i); }, 1500);
      else if (!e.isIntersecting && timer) { clearInterval(timer); timer = null; }
    }).observe(stageEl.closest('.card'));
  })();

  /* =====================================================================
     TERMINAL
     ===================================================================== */
  const term = $('[data-term]');
  if (term) {
    const out = $('[data-term-out]', term);
    const form = $('[data-term-form]', term);
    const input = $('input', form);
    const history = [];
    let hIdx = 0;

    const print = (html, cls = '') => {
      const p = document.createElement('p');
      if (cls) p.className = cls;
      p.innerHTML = html;
      out.appendChild(p);
      out.scrollTop = out.scrollHeight;
    };
    const go = (id, label) => `<a href="#${id}">${label}</a>`;

    const CMDS = {
      help: () => print(
`comandos:
  <b>sobre</b>           quem é o Murilo
  <b>projetos</b>        os projetos em destaque
  <b>stack</b>           o que eu uso
  <b>trajetoria</b>      o que rolou em 2026
  <b>contato</b>         como falar comigo
  <b>github</b>          abre meu GitHub
  <b>linkedin</b>        abre meu LinkedIn
  <b>sudo contratar</b>  você sabe o que faz
  <b>frango</b>          ???
  <b>matrix</b>          não aperte
  <b>clear</b>           limpa a tela`),
      sobre: () => print('Murilo Neves Teixeira. Dev front-end e estudante de Informática no Senac SP.\nFaço jogos, apps e sites do começo ao fim. Procurando Jovem Aprendiz ou estágio em TI.'),
      projetos: () => print(
`Quintal do Murilo · laboratório 100% sem IA
Nexus Band · site da banda, rifa com Pix
Bram e as Cinzas · roguelite de cartas
Frangão · calistenia gamificada
Banco do Murilo · finanças com potes
Bacon Burguer · site de hamburgueria
→ ${go('projetos', 'ver todos')}`),
      stack: () => print('HTML · CSS · JavaScript · TypeScript · React · Next.js · Tailwind\nSupabase · Node.js · Git · Vercel · Canvas · Web Audio · PWA · Vitest'),
      trajetoria: () => print(
`out 2026  rede para um grande evento (Packet Tracer)
set 2026  <b>campeão da OBAFOG</b>, 3 medalhas de ouro
set 2026  certificado Segurança Digital (Cisco)
ago 2026  o Quintal passou de 116 mil impressões
jul 2026  dev front-end voluntário na CEAC
mar 2026  dev front-end freelance na Nexus Band`),
      contato: () => print(`e-mail    <a href="mailto:${EMAIL}">${EMAIL}</a>\ngithub    <a href="https://github.com/parmurus1" target="_blank" rel="noopener">github.com/parmurus1</a>\nlinkedin  <a href="https://www.linkedin.com/in/murilonevesteixeira/" target="_blank" rel="noopener">in/murilonevesteixeira</a>`),
      github: () => { print('abrindo github.com/parmurus1…', 'dim'); open('https://github.com/parmurus1', '_blank', 'noopener'); },
      linkedin: () => { print('abrindo linkedin.com/in/murilonevesteixeira…', 'dim'); open('https://www.linkedin.com/in/murilonevesteixeira/', '_blank', 'noopener'); },
      'git status': () => print("On branch main\nnada para commitar, árvore de trabalho limpa\n<b>(mas a agenda está aberta para uma vaga)</b>"),
      'sudo contratar': () => {
        print('[sudo] senha para recrutador: ********', 'dim');
        setTimeout(() => print('Permissão concedida.'), 500);
        setTimeout(() => { print(`Abrindo e-mail para <b>${EMAIL}</b>…`); location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Oportunidade para o Murilo')}`; }, 1100);
      },
      frango: () => print(
`     ,~.
  ,-'__ \`-,
 {,-'  \`. }   <b>BÓ!</b>
,( a )   \`-.__
\`-'_-  \`-.___ \`-.
   \`-.___,-'  \`-'
Frangão: do ovo ao galo → <a href="https://frango-sand.vercel.app" target="_blank" rel="noopener">frango-sand.vercel.app</a>`),
      whoami: () => print('visitante (mas pode virar cliente ou chefe)'),
      ls: () => print('projetos/  sobre.md  trajetoria.log  contato.txt'),
      date: () => print(new Date().toLocaleString('pt-BR', { dateStyle: 'full', timeStyle: 'short' })),
      'rm -rf /': () => print('nada disso por aqui.', 'err'),
      matrix: () => { print('acordando…', 'dim'); window.__matrix && window.__matrix(); },
      clear: () => { out.innerHTML = ''; },
    };
    const ALIASES = { ajuda: 'help', '?': 'help', 'sudo hire': 'sudo contratar', trajetória: 'trajetoria', 'cat sobre.md': 'sobre', 'cat contato.txt': 'contato', 'cat trajetoria.log': 'trajetoria', cls: 'clear' };

    const run = (raw) => {
      const cmd = raw.trim().replace(/\s+/g, ' ');
      if (!cmd) return;
      print(esc(cmd), 'cmd');
      history.push(cmd); hIdx = history.length;
      const key = ALIASES[cmd.toLowerCase()] || cmd.toLowerCase();
      if (CMDS[key]) return CMDS[key]();
      if (key.startsWith('echo ')) return print(esc(cmd.slice(5)));
      if (key.startsWith('sudo ')) return print('permissão negada. Tenta <b>sudo contratar</b>.', 'err');
      print(`comando não encontrado: ${esc(cmd)}. Digite <b>help</b>.`, 'err');
    };

    // ao aparecer, o terminal digita um comando sozinho
    const auto = new IntersectionObserver(async ([e]) => {
      if (!e.isIntersecting) return;
      auto.disconnect();
      if (out.querySelector('.cmd')) return;
      const text = 'sobre';
      for (let k = 1; k <= text.length; k++) { input.value = text.slice(0, k); await wait(90); }
      await wait(250);
      run(input.value); input.value = '';
      await wait(600);
      run('trajetoria');
    }, { threshold: 0.5 });
    auto.observe(term);

    form.addEventListener('submit', (e) => { e.preventDefault(); run(input.value); input.value = ''; });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' && history.length) { e.preventDefault(); hIdx = Math.max(0, hIdx - 1); input.value = history[hIdx]; }
      else if (e.key === 'ArrowDown' && history.length) { e.preventDefault(); hIdx = Math.min(history.length, hIdx + 1); input.value = history[hIdx] || ''; }
      else if (e.key === 'Tab' && input.value) {
        const m = Object.keys(CMDS).find((k) => k.startsWith(input.value.toLowerCase()));
        if (m) { e.preventDefault(); input.value = m; }
      }
    });
    $$('[data-cmd]', term).forEach((b) => b.addEventListener('click', () => { run(b.dataset.cmd); input.focus({ preventScroll: true }); }));
  }

  /* ---------------- copiar e-mail ---------------- */
  const copyBtn = $('[data-copy]');
  if (copyBtn) {
    const label = $('[data-copy-label]', copyBtn);
    const icon = $('[data-copy-icon] use', copyBtn);
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(copyBtn.dataset.copy);
        label.textContent = 'Copiado!';
        icon.setAttribute('href', '#i-check');
      } catch (_) {
        label.textContent = copyBtn.dataset.copy;
      }
      setTimeout(() => { label.textContent = 'Copiar e-mail'; icon.setAttribute('href', '#i-copy'); }, 2200);
    });
  }

  console.log('%cI\'m coding right now', 'font: 600 16px monospace; color: #7c8cff;');
  console.log(`Achou um bug? Me conta: ${EMAIL}`);
})();
