/* =====================================================================
   Murilo Neves Teixeira · portfólio
   A página inteira é um git log --graph que se imprime enquanto você rola.
   ===================================================================== */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const HEX = '0123456789abcdef';
  const EMAIL = 'parmurus@gmail.com';

  /* ---------------- hash que embaralha e resolve ---------------- */
  function decode(el, duration = 520) {
    const final = el.dataset.final || el.textContent;
    el.dataset.final = final;
    if (reduce) { el.textContent = final; return; }
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const fixed = Math.floor(p * final.length);
      let out = final.slice(0, fixed);
      for (let i = fixed; i < final.length; i++) out += HEX[(Math.random() * 16) | 0];
      el.textContent = out;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = final;
    };
    requestAnimationFrame(step);
  }

  /* ---------------- prompt da nav: digita o comando ---------------- */
  function typeInto(el, text, speed = 42) {
    return new Promise((resolve) => {
      if (reduce) { el.textContent = text; return resolve(); }
      let i = 0;
      const t = setInterval(() => {
        el.textContent = text.slice(0, ++i);
        if (i >= text.length) { clearInterval(t); resolve(); }
      }, speed);
    });
  }

  /* ---------------- entrada do hero ---------------- */
  const navCmd = $('.nav__cmd');
  if (navCmd) typeInto(navCmd, navCmd.dataset.type, 38);
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.documentElement.classList.add('is-ready');
      const h = $('.hero__meta .hash');
      if (h) setTimeout(() => decode(h, 700), 450);
    }, reduce ? 0 : 250);
  });

  /* ---------------- status: último push no GitHub ---------------- */
  (async () => {
    const out = $('[data-status-text]');
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
      const units = [['day', 86400], ['hour', 3600], ['minute', 60]];
      let txt = 'agora';
      for (const [u, s] of units) {
        if (Math.abs(diff) >= s) { txt = rtf.format(Math.round(diff / s), u); break; }
      }
      out.textContent = `último push ${txt} em ${repo}`;
    } catch (_) { /* fica a bio do GitHub */ }
  })();

  /* =====================================================================
     A ESPINHA: o grafo em SVG que acompanha a página
     ===================================================================== */
  const svg = $('.graph');
  const NS = 'http://www.w3.org/2000/svg';
  let nodes = [];      // { y, el, src }
  let branches = [];   // { forkY, mergeY, laneX }
  let geo = { mainX: 44, laneX: 92, r: 7 };
  let frontier = 0, maxFrontier = 0, marker = null, revealRect = null, startY = 0, endY = 0;

  const mk = (tag, attrs = {}, parent) => {
    const el = document.createElementNS(NS, tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(el);
    return el;
  };
  const docY = (el) => el.getBoundingClientRect().top + scrollY;
  function lineY(el) {
    const rect = el.getBoundingClientRect();
    const lh = parseFloat(getComputedStyle(el).lineHeight) || rect.height;
    return rect.top + scrollY + Math.min(rect.height, lh) / 2;
  }

  function buildGraph() {
    if (!svg) return;
    const small = innerWidth <= 760;
    geo = small ? { mainX: 16, laneX: 33, r: 5, w: 3, cw: 6.5 } : { mainX: 46, laneX: 94, r: 7, w: 4, cw: 9 };
    const H = document.documentElement.scrollHeight;
    svg.setAttribute('height', H);
    svg.setAttribute('viewBox', `0 0 ${small ? 46 : 128} ${H}`);
    svg.style.height = H + 'px';
    svg.innerHTML = '';

    const defs = mk('defs', {}, svg);
    const mask = mk('mask', { id: 'reveal', maskUnits: 'userSpaceOnUse', x: 0, y: 0, width: 200, height: H }, defs);
    revealRect = mk('rect', { x: -40, y: 0, width: 240, height: 0, fill: '#fff' }, mask);

    const g = mk('g', { mask: 'url(#reveal)' }, svg);
    const lanesG = mk('g', {}, g);
    const nodesG = mk('g', {}, svg);

    const head = $('[data-node="head"]');
    const root = $('[data-node="root"]');
    startY = lineY(head);
    endY = lineY(root);
    const { mainX, laneX } = geo;

    const stroke = (d, color) => {
      mk('path', { d, class: 'casing', 'stroke-width': geo.cw }, lanesG);
      mk('path', { d, class: 'lane', stroke: color, 'stroke-width': geo.w }, lanesG);
    };

    // branches de cada projeto
    branches = [];
    $$('.proj').forEach((art) => {
      const forkEl = $('[data-node="fork"]', art);
      const mergeEl = $('[data-node="merge"]', art);
      const color = getComputedStyle(art).getPropertyValue('--lane').trim() || '#ffd23f';
      const forkY = lineY(forkEl);
      const mergeY = docY(mergeEl);
      const c = small ? 22 : 34;
      const d = `M ${mainX} ${forkY} C ${mainX} ${forkY + c}, ${laneX} ${forkY + c * 0.4}, ${laneX} ${forkY + c * 1.6} L ${laneX} ${mergeY - c * 1.6} C ${laneX} ${mergeY - c * 0.4}, ${mainX} ${mergeY - c}, ${mainX} ${mergeY}`;
      stroke(d, color);
      branches.push({ forkY, mergeY, c, color });
      art._lane = color;
    });

    // a main por cima das curvas
    stroke(`M ${mainX} ${startY} L ${mainX} ${endY}`, '#f5f3ee');

    // commits
    nodes = [];
    const addNode = (src, x, y, fill, kind = '') => {
      const r = kind === 'head' || kind === 'root' ? geo.r + 3 : geo.r;
      // ao reconstruir, o que já foi impresso volta sem animar de novo
      const printed = y <= maxFrontier;
      const c = mk('circle', { cx: x, cy: y, r, fill, 'stroke-width': small ? 2.5 : 3.5, class: `node ${kind ? 'node--' + kind : ''}${printed ? ' on' : ''}` }, nodesG);
      nodes.push({ y, el: c, src, on: printed });
      return c;
    };

    addNode(head, mainX, startY, '#ffd23f', 'head');
    mk('circle', { cx: mainX, cy: startY, r: geo.r + 3, class: 'ring' }, nodesG);

    $$('[data-node]').forEach((el) => {
      const kind = el.dataset.node;
      if (kind === 'head' || kind === 'merge') return;
      const art = el.closest('.proj');
      if (kind === 'fork') addNode(el, mainX, lineY(el), '#f5f3ee');
      else if (kind === 'branch') addNode(el, laneX, lineY(el), art ? art._lane : '#ffd23f');
      else if (kind === 'root') addNode(el, mainX, lineY(el), '#0a0f3d', 'root');
      else addNode(el, mainX, lineY(el), '#f5f3ee');
    });
    nodes.sort((a, b) => a.y - b.y);

    // o marcador HEAD que acompanha a rolagem
    marker = mk('g', { class: 'marker' }, svg);
    mk('circle', { r: geo.r + 4, fill: '#ffd23f', stroke: '#0a0f3d', 'stroke-width': 3 }, marker);
    if (!small) {
      mk('rect', { x: -22, y: -36, width: 44, height: 18, rx: 9, fill: '#ffd23f', stroke: '#0a0f3d', 'stroke-width': 2 }, marker);
      const t = mk('text', { x: 0, y: -23, 'text-anchor': 'middle' }, marker);
      t.textContent = 'HEAD';
    }

    if (reduce) maxFrontier = H;
    update(true);
  }

  function markerX(y) {
    const { mainX, laneX } = geo;
    for (const b of branches) {
      if (y < b.forkY || y > b.mergeY) continue;
      const a = b.c * 1.6;
      if (y < b.forkY + a) return mainX + (laneX - mainX) * ease((y - b.forkY) / a);
      if (y > b.mergeY - a) return laneX + (mainX - laneX) * ease((y - (b.mergeY - a)) / a);
      return laneX;
    }
    return mainX;
  }
  const ease = (t) => t * t * (3 - 2 * t);

  /* ---------------- atualização por rolagem ---------------- */
  const navLinks = $$('.nav__links a');
  const headRef = $('[data-headref]');
  const refSections = $$('[data-ref]');
  let lastRef = '';

  function update(force) {
    if (!svg || !revealRect) return;
    frontier = scrollY + innerHeight * 0.64;
    maxFrontier = Math.max(maxFrontier, frontier);
    revealRect.setAttribute('height', Math.max(0, maxFrontier));

    const y = Math.max(startY, Math.min(endY, frontier));
    marker.setAttribute('transform', `translate(${markerX(y)} ${y})`);
    marker.style.opacity = scrollY < 40 || frontier > endY + 40 ? 0 : 1;

    for (const n of nodes) {
      if (n.y > maxFrontier) break;
      if (!n.on) {
        n.on = true;
        n.el.classList.add('on');
        if (n.src && !n.src.classList.contains('lit')) {
          n.src.classList.add('lit');
          $$('.hash', n.src).forEach((h) => decode(h));
        }
      }
    }

    // ref atual na nav
    let ref = 'main';
    for (const s of refSections) {
      const r = s.getBoundingClientRect();
      if (r.top < innerHeight * 0.45 && r.bottom > innerHeight * 0.45) ref = s.dataset.ref;
    }
    if (ref !== lastRef || force) {
      lastRef = ref;
      if (headRef) headRef.textContent = ref;
      const section = refSections.find((s) => s.dataset.ref === ref);
      const top = section && (section.closest('section') || section).id;
      navLinks.forEach((a) => a.setAttribute('aria-current', a.getAttribute('href') === '#' + (top === 'mais' ? 'projetos' : top) ? 'true' : 'false'));
    }
  }

  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; update(); });
  }, { passive: true });

  let rebuildT;
  const rebuild = () => { clearTimeout(rebuildT); rebuildT = setTimeout(buildGraph, 120); };
  addEventListener('resize', rebuild);
  if ('ResizeObserver' in window) new ResizeObserver(rebuild).observe(document.body);
  if (document.fonts) document.fonts.ready.then(rebuild);
  addEventListener('load', rebuild);
  buildGraph();

  /* ---------------- prints: revelar e inclinar ---------------- */
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  }, { threshold: 0.2 });
  $$('.proj__shot').forEach((f) => io.observe(f));

  if (finePointer && !reduce) {
    $$('.plate').forEach((plate) => {
      plate.addEventListener('pointermove', (e) => {
        const r = plate.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        plate.style.setProperty('--ry', (px * 7).toFixed(2) + 'deg');
        plate.style.setProperty('--rx', (-py * 6).toFixed(2) + 'deg');
      });
      plate.addEventListener('pointerleave', () => {
        plate.style.setProperty('--ry', '0deg');
        plate.style.setProperty('--rx', '0deg');
      });
    });
  }

  /* ---------------- Frangão: do ovo ao galo ---------------- */
  (() => {
    const stageEl = $('[data-frango-stage]');
    if (!stageEl) return;
    const levelEl = $('[data-frango-level]');
    const xpEl = $('[data-frango-xp]');
    const chips = $$('.frango__stages span');
    const stages = [['Ovo', 1], ['Pintinho', 3], ['Frango', 6], ['Frango Sarado', 10], ['Galo', 15], ['Galo Lendário', 22]];
    let i = 0, timer = null;
    const show = (k) => {
      const [name, lvl] = stages[k];
      stageEl.textContent = name;
      levelEl.textContent = lvl;
      xpEl.style.transform = `scaleX(${0.12 + (k / (stages.length - 1)) * 0.88})`;
      chips.forEach((c, j) => c.classList.toggle('on', j <= k));
    };
    if (reduce) { show(2); return; }
    show(0);
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !timer) timer = setInterval(() => { i = (i + 1) % stages.length; show(i); }, 1500);
      else if (!e.isIntersecting && timer) { clearInterval(timer); timer = null; }
    }).observe(stageEl.closest('.plate'));
  })();

  /* ---------------- mais no log: prévia que segue o mouse ---------------- */
  const preview = $('.preview');
  if (preview && finePointer) {
    let px = 0, py = 0, tx = 0, ty = 0, raf = null;
    const follow = () => {
      px += (tx - px) * 0.18; py += (ty - py) * 0.18;
      preview.style.left = px + 'px'; preview.style.top = py + 'px';
      raf = Math.abs(tx - px) + Math.abs(ty - py) > 0.5 ? requestAnimationFrame(follow) : null;
    };
    $$('.oneline a').forEach((a) => {
      a.addEventListener('pointerenter', (e) => {
        const src = a.dataset.preview;
        if (!src) return;
        preview.src = src;
        tx = px = e.clientX + 200; ty = py = e.clientY;
        preview.classList.add('show');
      });
      a.addEventListener('pointermove', (e) => {
        tx = Math.min(innerWidth - 190, e.clientX + 210); ty = e.clientY;
        if (!raf) raf = requestAnimationFrame(follow);
      });
      a.addEventListener('pointerleave', () => preview.classList.remove('show'));
    });
  }

  /* ---------------- stack: barras de diff ---------------- */
  $$('[data-plus]').forEach((bar) => {
    const n = parseInt(getComputedStyle(bar.parentElement).getPropertyValue('--n'), 10) || 1;
    bar.innerHTML = Array.from({ length: n }, (_, k) => `<i style="--k:${k}">+</i>`).join('');
  });
  const statIO = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('go'); statIO.unobserve(e.target); }
  }, { threshold: 0.6 });
  $$('[data-plus]').forEach((b) => statIO.observe(b));

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
    const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
    const go = (id) => `<a href="#${id}">#${id}</a>`;

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
  <b>git status</b>      como está a branch
  <b>sudo contratar</b>  você sabe o que faz
  <b>frango</b>          ???
  <b>clear</b>           limpa a tela`),
      sobre: () => print('Murilo Neves Teixeira. Dev front-end e estudante de Informática no Senac SP.\nFaço jogos, apps e sites do começo ao fim. Procurando Jovem Aprendiz ou estágio em TI.'),
      projetos: () => print(
`${go('quintal')}  Quintal do Murilo · laboratório 100% sem IA
${go('nexus')}    Nexus · site da banda, rifa com Pix
${go('bram')}     Bram e as Cinzas · roguelite de cartas
${go('frangao')}  Frangão · calistenia gamificada
${go('banco')}    Banco do Murilo · finanças com potes
${go('bacon')}    Bacon Burguer · site de hamburgueria`),
      stack: () => print('Git · HTML · CSS · JavaScript · TypeScript · React · Next.js\nSupabase · Vercel · Canvas · Web Audio · PWA · Tailwind · Vitest'),
      trajetoria: () => print(
`out 2026  rede para um grande evento (Packet Tracer, Senac)
set 2026  <b>campeão da OBAFOG</b>, 3 medalhas de ouro com a equipe
set 2026  certificado Segurança Digital (Cisco NetAcad)
ago 2026  o Quintal passou de 116 mil impressões
jul 2026  dev front-end voluntário na CEAC
mar 2026  dev front-end freelance na Nexus Band`),
      contato: () => print(`e-mail    <a href="mailto:${EMAIL}">${EMAIL}</a>\ngithub    <a href="https://github.com/parmurus1" target="_blank" rel="noopener">github.com/parmurus1</a>\nlinkedin  <a href="https://www.linkedin.com/in/murilonevesteixeira/" target="_blank" rel="noopener">in/murilonevesteixeira</a>`),
      github: () => { print('abrindo github.com/parmurus1…', 'dim'); open('https://github.com/parmurus1', '_blank', 'noopener'); },
      linkedin: () => { print('abrindo linkedin.com/in/murilonevesteixeira…', 'dim'); open('https://www.linkedin.com/in/murilonevesteixeira/', '_blank', 'noopener'); },
      'git status': () => print("Na branch main\nSua branch está em dia com 'origin/main'.\n\nnada para commitar, árvore de trabalho limpa\n<b>(mas a agenda está aberta para uma vaga de Jovem Aprendiz ou estágio)</b>"),
      'git log': () => print('você está olhando para ele. role a página ;)', 'dim'),
      'sudo contratar': () => {
        print('[sudo] senha para recrutador: ********', 'dim');
        setTimeout(() => print('Permissão concedida.'), 500);
        setTimeout(() => { print(`Abrindo e-mail para <b>${EMAIL}</b>…`); location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Oportunidade para o Murilo')}`; }, 1100);
      },
      frango: () => print(
`     <b>,~.</b>
  <b>,-'__ \`-,</b>
 {,-'  \`. }    <b>BÓ!</b>
,( a )   \`-.__
\`-'_-  \`-.___ \`-.
   \`-.___,-'  \`-'
Frangão: do ovo ao galo → ${go('frangao')}`),
      whoami: () => print('visitante (mas pode virar cliente ou chefe)'),
      ls: () => print('projetos/  sobre.md  trajetoria.log  contato.txt  segredos/'),
      'cat sobre.md': () => CMDS.sobre(),
      'cat contato.txt': () => CMDS.contato(),
      'cat trajetoria.log': () => CMDS.trajetoria(),
      'cd segredos': () => print('bash: cd: segredos: Permissão negada. Boa tentativa.', 'err'),
      'cd projetos': () => CMDS.projetos(),
      date: () => print(new Date().toLocaleString('pt-BR', { dateStyle: 'full', timeStyle: 'short' })),
      pwd: () => print('/home/murilo/portfolio'),
      'rm -rf /': () => print('nada disso. aqui só entra commit bom.', 'err'),
      exit: () => print('não dá pra sair do portfólio. role pra baixo, ainda tem o contato.', 'dim'),
      clear: () => { out.innerHTML = ''; },
    };
    const ALIASES = { ajuda: 'help', '?': 'help', 'sudo hire': 'sudo contratar', 'sudo contrata': 'sudo contratar', trajetória: 'trajetoria', projects: 'projetos', about: 'sobre', contact: 'contato', cls: 'clear' };

    const run = (raw) => {
      const cmd = raw.trim().replace(/\s+/g, ' ');
      if (!cmd) return;
      print(esc(cmd), 'cmd');
      history.push(cmd); hIdx = history.length;
      const key = ALIASES[cmd.toLowerCase()] || cmd.toLowerCase();
      if (CMDS[key]) return CMDS[key]();
      if (key.startsWith('echo ')) return print(esc(cmd.slice(5)));
      if (key.startsWith('sudo ')) return print('você não está no arquivo sudoers. Tenta <b>sudo contratar</b>.', 'err');
      if (key.startsWith('git ')) return print(`git: '${esc(cmd.slice(4))}' não é um comando que eu conheço. Tenta <b>git status</b>.`, 'err');
      print(`comando não encontrado: ${esc(cmd)}. Digite <b>help</b>.`, 'err');
    };

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
    out.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      e.preventDefault();
      $(a.getAttribute('href'))?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  /* =====================================================================
     CONTATO
     ===================================================================== */
  const copyBtn = $('[data-copy]');
  if (copyBtn) {
    const label = $('[data-copy-label]', copyBtn);
    const icon = $('use', copyBtn);
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(copyBtn.dataset.copy);
        label.textContent = 'E-mail copiado';
        icon.setAttribute('href', '#i-check');
      } catch (_) {
        label.textContent = copyBtn.dataset.copy;
      }
      setTimeout(() => { label.textContent = 'Copiar e-mail'; icon.setAttribute('href', '#i-copy'); }, 2400);
    });
  }

  const push = $('[data-push]');
  const pushOut = $('[data-push-out]');
  if (push && pushOut) {
    push.addEventListener('click', () => {
      const lines = [
        'Enumerating objects: 1, done.',
        'Writing objects: 100% (1/1), done.',
        `To mailto:${EMAIL}`,
        ' * [new branch]      voce -> murilo',
      ];
      pushOut.textContent = '';
      lines.forEach((l, i) => setTimeout(() => { pushOut.textContent += (i ? '\n' : '') + l; }, reduce ? 0 : i * 260));
    });
  }

  /* um oi pra quem abre o console */
  console.log('%cI\'m coding right now', 'font: 700 20px monospace; color: #ffd23f; background: #141d8a; padding: 8px 14px; border-radius: 8px;');
  console.log(`Procurando bugs? Me conta: ${EMAIL}`);
})();
