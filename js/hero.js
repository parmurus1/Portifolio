/* =====================================================================
   Hero: um git log --graph vivo, desenhado em canvas.
   Cada linha tem exatamente um commit. Branches nascem e se juntam;
   o mouse puxa novas branches e um clique cria a sua.
   ===================================================================== */
(() => {
  const canvas = document.querySelector('.hero__canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const hero = canvas.parentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const COLORS = ['#ff6a3d', '#ffd23f', '#3ddc84', '#ff4fa3', '#44d7ff', '#b49bff', '#f5f3ee'];
  const INK = '#0a0f3d';
  const HEX = '0123456789abcdef';

  let W = 0, H = 0, dpr = 1;
  let colW = 34, rowH = 30, cols = 0, firstCol = 0;
  let rows = [];          // rows[0] fica no topo (o commit mais novo)
  let lanes = new Map();  // coluna -> cor, no topo atual
  let offset = 0;
  let colorIdx = 0;
  let pointer = { x: -1, y: -1, active: false };
  let forced = null;
  let running = false;
  let last = 0;

  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[(Math.random() * arr.length) | 0];
  const hash = () => Array.from({ length: 7 }, () => HEX[(Math.random() * 16) | 0]).join('');
  const nextColor = () => COLORS[colorIdx++ % (COLORS.length - 1)];
  const colX = (c) => (c + 0.5) * colW;
  const small = () => W < 760;

  function freeCols() {
    const out = [];
    for (let c = firstCol; c < cols; c++) if (!lanes.has(c)) out.push(c);
    return out;
  }

  function nearestFree(target) {
    const free = freeCols();
    if (!free.length) return null;
    free.sort((a, b) => Math.abs(a - target) - Math.abs(b - target));
    return free[Math.random() < 0.7 ? 0 : Math.min(free.length - 1, 1)];
  }

  /* gera uma nova linha no topo, ligada às lanes da linha de baixo */
  function makeRow() {
    const below = lanes;
    const next = new Map(below);
    const links = [];
    let nodeCol = null;
    let label = null;

    const active = [...below.keys()];
    const pointerCol = pointer.active ? Math.floor(pointer.x / colW) : null;

    // uma lane termina subindo: ela "se junta" a outra
    let ending = null;
    if (active.length > 4 && Math.random() < 0.15) {
      ending = pick(active);
      const others = active.filter((c) => c !== ending);
      const target = others.sort((a, b) => Math.abs(a - ending) - Math.abs(b - ending))[0];
      next.delete(ending);
      links.push({ from: target, to: ending, color: below.get(ending) });
      if (Math.random() < 0.6) nodeCol = target;
    }

    // uma lane nova nasce (fork), puxada pelo mouse ou por um clique
    let born = null;
    const wantFork = forced || (active.length < Math.max(5, (cols - firstCol) * 0.6) && Math.random() < (pointer.active ? 0.34 : 0.2));
    if (wantFork && active.length) {
      const targetCol = forced ? forced.col : pointerCol != null && Math.random() < 0.75 ? pointerCol : (Math.random() * cols) | 0;
      const col = lanes.has(targetCol) || targetCol === ending ? nearestFree(targetCol) : targetCol;
      if (col != null && col >= firstCol && col < cols) {
        const parent = active.filter((c) => c !== ending).sort((a, b) => Math.abs(a - col) - Math.abs(b - col))[0];
        if (parent != null) {
          const color = forced ? '#ffd23f' : nextColor();
          next.set(col, color);
          links.push({ from: col, to: parent, color });
          born = col;
          nodeCol = col;
          if (forced) label = 'seu-commit';
        }
      }
      forced = null;
    }

    // as outras seguem retas
    for (const c of next.keys()) {
      if (c === born) continue;
      links.push({ from: c, to: c, color: next.get(c) });
    }

    if (nodeCol == null) {
      const ks = [...next.keys()];
      nodeCol = pick(ks);
    }
    if (!label && Math.random() < 0.3) label = hash();

    lanes = next;
    return { links, node: nodeCol, nodeColor: next.get(nodeCol) || below.get(nodeCol) || COLORS[6], label, born: performance.now() };
  }

  function seed() {
    lanes = new Map();
    const start = Math.max(firstCol, Math.floor(cols * (small() ? 0.2 : 0.5)));
    const n = Math.max(3, Math.min(small() ? 4 : 7, Math.floor((cols - start) / 2)));
    for (let i = 0; i < n; i++) {
      const c = Math.min(cols - 1, start + i * 2);
      if (!lanes.has(c)) lanes.set(c, i === 0 ? COLORS[6] : nextColor());
    }
    // cada linha nova entra no topo, então rows[0] termina sendo a mais nova
    rows = [];
    const count = Math.ceil(H / rowH) + 3;
    for (let i = 0; i < count; i++) {
      const r = makeRow();
      r.born = 0;
      rows.unshift(r);
    }
  }

  function resize() {
    const rect = hero.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width; H = rect.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    const small = W < 760;
    colW = small ? 26 : 34;
    rowH = small ? 24 : 30;
    cols = Math.floor(W / colW);
    firstCol = small ? 1 : Math.floor(cols * 0.32);
    seed();
    draw(performance.now());
  }

  function draw(now) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const small = W < 760;
    const lw = small ? 2.2 : 3.2;

    // ligações: contorno tinta e depois a cor
    for (let pass = 0; pass < 2; pass++) {
      ctx.lineWidth = pass === 0 ? lw + 3.5 : lw;
      ctx.lineCap = 'round';
      for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        const y = i * rowH + offset - rowH;
        for (const l of r.links) {
          const x1 = colX(l.from), x2 = colX(l.to);
          ctx.strokeStyle = pass === 0 ? INK : l.color;
          ctx.globalAlpha = pass === 0 ? 0.6 : 0.9;
          ctx.beginPath();
          ctx.moveTo(x1, y);
          if (x1 === x2) ctx.lineTo(x2, y + rowH);
          else ctx.bezierCurveTo(x1, y + rowH * 0.6, x2, y + rowH * 0.4, x2, y + rowH);
          ctx.stroke();
        }
      }
    }

    // commits
    ctx.globalAlpha = 1;
    ctx.font = `500 ${small ? 9 : 10.5}px "Martian Mono", ui-monospace, monospace`;
    ctx.textBaseline = 'middle';
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const y = i * rowH + offset - rowH;
      const x = colX(r.node);
      let rad = small ? 4.5 : 6;
      if (pointer.active) {
        const d = Math.hypot(pointer.x - x, pointer.y - y);
        rad += Math.max(0, 5 - d / 26);
      }
      const age = r.born ? Math.max(0, Math.min(1, (now - r.born) / 500)) : 1;
      const s = r.born ? 1 - Math.pow(1 - age, 3) : 1;
      ctx.beginPath();
      ctx.arc(x, y, rad * s + 2, 0, Math.PI * 2);
      ctx.fillStyle = INK;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, rad * s, 0, Math.PI * 2);
      ctx.fillStyle = r.nodeColor;
      ctx.fill();
      if (r.label) {
        ctx.fillStyle = r.label === 'seu-commit' ? '#ffd23f' : 'rgba(188,196,246,0.5)';
        ctx.fillText(r.label, x + 12, y);
      }
    }
  }

  function tick(now) {
    if (!running) return;
    const dt = Math.min(64, now - (last || now));
    last = now;
    offset += dt * (pointer.active ? 0.032 : 0.02);
    while (offset >= rowH) {
      offset -= rowH;
      rows.unshift(makeRow());
      if (rows.length > Math.ceil(H / rowH) + 4) rows.pop();
    }
    draw(now);
    requestAnimationFrame(tick);
  }

  function start() {
    if (running || reduce) return;
    running = true; last = 0;
    requestAnimationFrame(tick);
  }
  function stop() { running = false; }

  hero.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    pointer = { x: e.clientX - r.left, y: e.clientY - r.top, active: true };
  });
  hero.addEventListener('pointerleave', () => { pointer.active = false; });
  hero.addEventListener('pointerdown', (e) => {
    if (e.target.closest('a, button')) return;
    const r = canvas.getBoundingClientRect();
    const col = Math.floor((e.clientX - r.left) / colW);
    forced = { col: Math.max(firstCol, Math.min(cols - 1, col)) };
    if (reduce) { rows.unshift(makeRow()); rows.pop(); draw(performance.now()); }
  });

  new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop())).observe(hero);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 150); });

  resize();
  if (document.fonts) document.fonts.ready.then(() => draw(performance.now()));
})();
