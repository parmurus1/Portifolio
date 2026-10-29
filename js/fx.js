/* =====================================================================
   Efeitos: intro de boot, campo de código em WebGL, títulos que
   decodificam, carrossel 3D de projetos, cursor magnético,
   distorção líquida e o easter egg do Matrix.
   ===================================================================== */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const mouse = { x: innerWidth / 2, y: innerHeight * 0.4, active: false };
  const shock = { x: 0, y: 0, t: -10 };

  addEventListener('pointermove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; }, { passive: true });
  addEventListener('pointerdown', (e) => {
    if (e.target.closest('a, button, input, .term')) return;
    shock.x = e.clientX; shock.y = e.clientY; shock.t = performance.now() / 1000;
  });

  /* =====================================================================
     1. INTRO DE BOOT: o terminal compila e o nome se monta em partículas
     ===================================================================== */
  function boot() {
    const el = $('[data-boot]');
    if (!el || !root.classList.contains('booting')) return;
    el.hidden = false;
    const log = $('[data-boot-log]', el);
    const canvas = $('canvas', el);
    const ctx = canvas.getContext('2d');
    let done = false, raf = 0;

    const finish = () => {
      if (done) return;
      done = true;
      try { sessionStorage.setItem('booted', '1'); } catch (_) {}
      el.classList.add('is-out');
      root.classList.remove('booting');
      dispatchEvent(new Event('boot:done'));
      setTimeout(() => { cancelAnimationFrame(raf); el.remove(); }, 1100);
    };
    $('[data-boot-skip]', el).addEventListener('click', finish);
    addEventListener('keydown', (e) => { if (e.key === 'Escape' || e.key === 'Enter') finish(); }, { once: true });

    const lines = [
      ['$ npm run murilo', 0],
      ['> compilando portfólio…', 260],
      ['  ✓ 16 repositórios carregados', 200],
      ['  ✓ 6 projetos em destaque', 160],
      ['  ✓ café: ok', 160],
      ['> iniciando MURILO.exe', 260],
    ];

    (async () => {
      for (const [text, delay] of lines) {
        if (done) return;
        await sleep(delay);
        const row = document.createElement('span');
        log.appendChild(row);
        for (const ch of text) { if (done) return; row.textContent += ch; await sleep(14); }
        log.appendChild(document.createTextNode('\n'));
      }
      await sleep(250);
      if (!done) particles();
    })();

    function particles() {
      el.classList.add('is-particles');
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const W = innerWidth, H = innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // amostra os pixels do nome escrito num canvas escondido
      const off = document.createElement('canvas');
      off.width = W; off.height = H;
      const o = off.getContext('2d');
      const size = Math.min(W * 0.2, 220);
      o.fillStyle = '#fff';
      o.textAlign = 'center'; o.textBaseline = 'middle';
      o.font = `800 ${size}px Geist, system-ui, sans-serif`;
      o.fillText('MURILO', W / 2, H / 2);
      const data = o.getImageData(0, 0, W, H).data;
      const step = W < 760 ? 4 : 5;
      const targets = [];
      for (let y = 0; y < H; y += step) for (let x = 0; x < W; x += step) if (data[(y * W + x) * 4 + 3] > 128) targets.push([x, y]);

      const colors = ['#7c8cff', '#a5b4fc', '#5ec8ff', '#f4f4f5', '#c4a5ff'];
      const ps = targets.map(([tx, ty]) => {
        const a = Math.random() * Math.PI * 2, r = Math.max(W, H) * (0.4 + Math.random() * 0.6);
        return { x: W / 2 + Math.cos(a) * r, y: H / 2 + Math.sin(a) * r, tx, ty, vx: 0, vy: 0, c: colors[(Math.random() * colors.length) | 0], s: Math.random() * 1.4 + 0.8 };
      });

      const t0 = performance.now();
      const frame = (now) => {
        const t = (now - t0) / 1000;
        ctx.clearRect(0, 0, W, H);
        const exploding = t > 2.7;
        for (const p of ps) {
          if (!exploding) {
            // mola até o alvo, com o mouse empurrando
            p.vx += (p.tx - p.x) * 0.06; p.vy += (p.ty - p.y) * 0.06;
            const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
            if (d2 < 9000) { p.vx += dx / Math.sqrt(d2 + 1) * 3; p.vy += dy / Math.sqrt(d2 + 1) * 3; }
            p.vx *= 0.78; p.vy *= 0.78;
          } else {
            const dx = p.x - W / 2, dy = p.y - H / 2;
            p.vx += dx * 0.004 + (Math.random() - 0.5); p.vy += dy * 0.004 + (Math.random() - 0.5);
          }
          p.x += p.vx; p.y += p.vy;
          ctx.fillStyle = p.c;
          ctx.fillRect(p.x, p.y, p.s, p.s);
        }
        if (t > 2.9) finish();
        if (t < 4) raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    }
  }

  /* =====================================================================
     2. CAMPO DE CÓDIGO EM WEBGL: milhares de caracteres que ondulam,
        fogem do mouse e levam uma onda de choque no clique
     ===================================================================== */
  function field() {
    const canvas = $('.field');
    if (!canvas || reduce) return;
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, antialias: false, alpha: true });
    if (!gl) return;

    const GLYPHS = '01{}[]<>/=+;:()$#*&%!?xyzfn=>λ';
    const N = 32, G = 48;
    const atlas = document.createElement('canvas');
    atlas.width = N * G; atlas.height = G;
    const a = atlas.getContext('2d');
    a.fillStyle = '#fff'; a.textAlign = 'center'; a.textBaseline = 'middle';
    a.font = `500 ${G * 0.62}px "Geist Mono", ui-monospace, monospace`;
    [...GLYPHS.padEnd(N, '0')].slice(0, N).forEach((ch, i) => a.fillText(ch, i * G + G / 2, G / 2 + 1));

    const vs = `
      attribute vec2 a_pos; attribute float a_seed;
      uniform vec2 u_res; uniform vec2 u_mouse; uniform float u_time; uniform float u_cell; uniform float u_dpr;
      uniform vec3 u_shock; uniform float u_fade;
      varying float v_glyph; varying float v_alpha; varying float v_hot;
      void main() {
        vec2 p = a_pos;
        vec2 d = p - u_mouse; float dist = length(d);
        float push = smoothstep(240.0, 0.0, dist);
        p += normalize(d + 0.001) * push * 52.0;
        float st = u_time - u_shock.z;
        float ring = 0.0;
        if (st > 0.0 && st < 2.0) {
          float sd = length(a_pos - u_shock.xy);
          ring = exp(-pow((sd - st * 700.0) / 70.0, 2.0)) * (1.0 - st / 2.0);
          p += normalize(a_pos - u_shock.xy + 0.001) * ring * 40.0;
        }
        float wave = sin(p.x * 0.011 + u_time * 0.8) * cos(p.y * 0.015 - u_time * 0.55) + sin((p.x + p.y) * 0.005 + u_time * 0.35);
        float al = 0.07 + 0.2 * smoothstep(-0.2, 1.7, wave);
        al += push * 0.6 + ring * 0.8;
        v_alpha = al * u_fade;
        v_hot = clamp(push + ring, 0.0, 1.0);
        v_glyph = floor(mod(a_seed * 97.0 + u_time * (0.4 + a_seed * 1.6) + push * 6.0, 32.0));
        vec2 clip = (p / u_res) * 2.0 - 1.0;
        gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
        gl_PointSize = u_cell * u_dpr * 0.82;
      }`;
    const fs = `
      precision mediump float;
      uniform sampler2D u_atlas;
      varying float v_glyph; varying float v_alpha; varying float v_hot;
      void main() {
        vec2 uv = vec2((v_glyph + gl_PointCoord.x) / 32.0, gl_PointCoord.y);
        float g = texture2D(u_atlas, uv).a;
        vec3 col = mix(vec3(0.49, 0.55, 1.0), vec3(0.62, 0.96, 1.0), v_hot);
        float al = g * v_alpha;
        gl_FragColor = vec4(col * al, al);
      }`;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    const upload = () => gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas);
    upload();
    if (document.fonts) document.fonts.ready.then(() => {
      a.clearRect(0, 0, atlas.width, atlas.height);
      [...GLYPHS.padEnd(N, '0')].slice(0, N).forEach((ch, i) => a.fillText(ch, i * G + G / 2, G / 2 + 1));
      gl.bindTexture(gl.TEXTURE_2D, tex); upload();
    });

    const U = (n) => gl.getUniformLocation(prog, n);
    const u = { res: U('u_res'), mouse: U('u_mouse'), time: U('u_time'), cell: U('u_cell'), dpr: U('u_dpr'), shock: U('u_shock'), fade: U('u_fade') };
    const buf = gl.createBuffer();
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    const aSeed = gl.getAttribLocation(prog, 'a_seed');
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    let count = 0, cell = 22, dpr = 1, W = 0, H = 0;
    function resize() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      cell = W < 760 ? 24 : 21;
      const cols = Math.ceil(W / cell) + 1, rows = Math.ceil(H / cell) + 1;
      const arr = new Float32Array(cols * rows * 3);
      let k = 0;
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        arr[k++] = x * cell + cell / 2; arr[k++] = y * cell + cell / 2; arr[k++] = Math.random();
      }
      count = cols * rows;
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, arr, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 12, 0);
      gl.enableVertexAttribArray(aSeed);
      gl.vertexAttribPointer(aSeed, 1, gl.FLOAT, false, 12, 8);
    }
    resize();
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 150); });

    const sm = { x: mouse.x, y: mouse.y };
    let running = true;
    document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) requestAnimationFrame(draw); });
    function draw(now) {
      if (!running) return;
      const t = now / 1000;
      sm.x += ((mouse.active ? mouse.x : W * 0.7 + Math.cos(t * 0.4) * W * 0.15) - sm.x) * 0.12;
      sm.y += ((mouse.active ? mouse.y : H * 0.4 + Math.sin(t * 0.5) * H * 0.15) - sm.y) * 0.12;
      // forte no topo, discreto no resto da página
      const fade = 1 - clamp(scrollY / (H * 0.9), 0, 1) * 0.6;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(u.res, W, H);
      gl.uniform2f(u.mouse, sm.x, sm.y);
      gl.uniform1f(u.time, t);
      gl.uniform1f(u.cell, cell);
      gl.uniform1f(u.dpr, dpr);
      gl.uniform3f(u.shock, shock.x, shock.y, shock.t);
      gl.uniform1f(u.fade, fade);
      gl.drawArrays(gl.POINTS, 0, count);
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
    canvas.classList.add('is-on');
  }

  /* =====================================================================
     3. TÍTULOS QUE DECODIFICAM
     ===================================================================== */
  const CHARS = '!<>-_\\/[]{}=+*^?#01';
  function scramble(el) {
    if (reduce || el.dataset.scrambled) return;
    el.dataset.scrambled = '1';
    const final = el.textContent;
    const len = final.length;
    const t0 = performance.now(), dur = 700 + len * 18;
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      let out = '';
      for (let i = 0; i < len; i++) {
        const reveal = i / len < p * 1.25 - 0.15;
        out += reveal || final[i] === ' ' ? final[i] : CHARS[(Math.random() * CHARS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(step); else el.textContent = final;
    };
    requestAnimationFrame(step);
  }
  const titleIO = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { scramble(e.target); titleIO.unobserve(e.target); }
  }, { threshold: 0.6 });
  $$('.section__title, .cta__title, .more__title, .card__title').forEach((t) => titleIO.observe(t));

  /* =====================================================================
     4. CARROSSEL 3D DE PROJETOS PRESO NA ROLAGEM
     ===================================================================== */
  function rail() {
    const el = $('[data-rail]');
    if (!el) return;
    const track = $('.bento', el);
    const cards = $$('.card', track);
    const bar = $('[data-rail-bar]', el);
    const count = $('[data-rail-count]', el);
    const mq = matchMedia('(min-width: 900px)');
    let on = false, dist = 0;

    const layout = () => {
      on = mq.matches && !reduce;
      el.classList.toggle('is-rail', on);
      if (!on) { el.style.height = ''; track.style.transform = ''; cards.forEach((c) => { c.style.transform = ''; c.style.opacity = ''; }); return; }
      dist = Math.max(0, track.scrollWidth - innerWidth);
      el.style.height = innerHeight + dist + 'px';
      update();
    };
    const update = () => {
      if (!on) return;
      const r = el.getBoundingClientRect();
      const p = clamp(-r.top / (dist || 1), 0, 1);
      track.style.transform = `translate3d(${-p * dist}px, 0, 0)`;
      const mid = innerWidth / 2;
      for (const c of cards) {
        const cr = c.getBoundingClientRect();
        const d = clamp((cr.left + cr.width / 2 - mid) / mid, -1.6, 1.6);
        c.style.transform = `perspective(1400px) rotateY(${(-d * 26).toFixed(2)}deg) translateZ(${(-Math.abs(d) * 180).toFixed(0)}px) scale(${(1 - Math.abs(d) * 0.06).toFixed(3)})`;
        c.style.opacity = (1 - Math.min(0.6, Math.abs(d) * 0.5)).toFixed(3);
      }
      bar.style.transform = `scaleX(${p})`;
      count.textContent = `${String(Math.round(p * (cards.length - 1)) + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    };
    addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    addEventListener('resize', layout);
    mq.addEventListener('change', layout);
    addEventListener('load', layout);
    layout();
  }

  /* =====================================================================
     5. CURSOR COM ANEL E BOTÕES MAGNÉTICOS
     ===================================================================== */
  function cursor() {
    if (!finePointer || reduce) return;
    const el = $('.cursor');
    const ring = $('.cursor__ring', el);
    const dot = $('.cursor__dot', el);
    root.classList.add('has-cursor');
    const r = { x: mouse.x, y: mouse.y };
    const loop = () => {
      r.x += (mouse.x - r.x) * 0.18; r.y += (mouse.y - r.y) * 0.18;
      dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
      ring.style.transform = `translate(${r.x}px, ${r.y}px)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener('pointerover', (e) => el.classList.toggle('is-link', !!e.target.closest('a, button, [data-cmd], input')));
    document.addEventListener('pointerdown', () => el.classList.add('is-down'));
    document.addEventListener('pointerup', () => el.classList.remove('is-down'));
    document.addEventListener('pointerleave', () => el.classList.add('is-gone'));
    document.addEventListener('pointerenter', () => el.classList.remove('is-gone'));

    $$('.btn, .nav__brand, .cta__social a').forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        const br = b.getBoundingClientRect();
        const x = (e.clientX - br.left - br.width / 2) * 0.28;
        const y = (e.clientY - br.top - br.height / 2) * 0.38;
        b.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
      });
      b.addEventListener('pointerleave', () => { b.style.translate = ''; });
    });
  }

  /* =====================================================================
     6. DISTORÇÃO LÍQUIDA NOS PRINTS
     ===================================================================== */
  function liquid() {
    const disp = $('[data-liquid]');
    if (!disp || !finePointer || reduce) return;
    const turb = disp.previousElementSibling;
    let cur = 0, target = 0, raf = 0, t = 0;
    const loop = () => {
      cur += (target - cur) * 0.12;
      t += 0.01;
      disp.setAttribute('scale', cur.toFixed(2));
      turb.setAttribute('baseFrequency', `${(0.008 + Math.sin(t) * 0.002).toFixed(4)} ${(0.018 + Math.cos(t * 1.3) * 0.004).toFixed(4)}`);
      if (Math.abs(target - cur) > 0.1 || target > 0) raf = requestAnimationFrame(loop); else { raf = 0; disp.setAttribute('scale', 0); }
    };
    $$('.card__shot img').forEach((img) => {
      const card = img.closest('.card');
      card.addEventListener('pointerenter', () => {
        $$('.card__shot img.is-liquid').forEach((o) => o.classList.remove('is-liquid'));
        img.classList.add('is-liquid');
        target = 26; cur = 70;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      card.addEventListener('pointerleave', () => { target = 0; setTimeout(() => { if (target === 0) img.classList.remove('is-liquid'); }, 500); });
    });
  }

  /* =====================================================================
     7. EASTER EGG: Konami code (↑↑↓↓←→←→BA) ou "matrix" no terminal
     ===================================================================== */
  function matrix() {
    if (document.querySelector('.matrix')) return;
    const c = document.createElement('canvas');
    c.className = 'matrix';
    c.setAttribute('aria-hidden', 'true');
    const msg = document.createElement('p');
    msg.className = 'matrix__msg mono';
    msg.innerHTML = 'MODO HACKER ATIVADO<br><span>Wake up, recrutador… contrate o Murilo.</span>';
    document.body.append(c, msg);
    const ctx = c.getContext('2d');
    const W = (c.width = innerWidth), H = (c.height = innerHeight);
    const fs = 16, cols = Math.ceil(W / fs);
    const drops = Array.from({ length: cols }, () => Math.random() * -40);
    const chars = 'アイウエオカキクケコサシスセソ01{}<>/=+;MURILO';
    let raf;
    const t0 = performance.now();
    const loop = (now) => {
      ctx.fillStyle = 'rgba(9, 9, 11, 0.12)';
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${fs}px "Geist Mono", monospace`;
      drops.forEach((y, i) => {
        ctx.fillStyle = Math.random() > 0.96 ? '#e0e7ff' : '#7c8cff';
        ctx.fillText(chars[(Math.random() * chars.length) | 0], i * fs, y * fs);
        drops[i] = y * fs > H && Math.random() > 0.975 ? 0 : y + 1;
      });
      if (now - t0 < 6500) raf = requestAnimationFrame(loop);
      else { c.classList.add('is-out'); msg.classList.add('is-out'); setTimeout(() => { c.remove(); msg.remove(); }, 800); }
    };
    raf = requestAnimationFrame(loop);
    const stop = () => { cancelAnimationFrame(raf); c.remove(); msg.remove(); };
    c.addEventListener('click', stop);
  }
  window.__matrix = matrix;
  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let ki = 0;
  addEventListener('keydown', (e) => {
    if (e.target.closest && e.target.closest('input')) return;
    ki = e.key.toLowerCase() === KONAMI[ki].toLowerCase() ? ki + 1 : (e.key === KONAMI[0] ? 1 : 0);
    if (ki === KONAMI.length) { ki = 0; matrix(); }
  });

  boot();
  field();
  rail();
  cursor();
  liquid();
})();
