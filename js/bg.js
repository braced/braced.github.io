// Animated background for index.html: neon perspective grid with an industrial skyline.
// It moves slowly all the time and reacts to section changes ('sectionchange' event from index.html):
// the camera rushes forward or back and the horizon shifts a little per section.
// It ignores prefers-reduced-motion on purpose. Desktop only.
(() => {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas || window.innerWidth <= 768) return;

  const ctx = canvas.getContext('2d');
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const CYAN = '0,180,216', VIOLET = '123,47,247', BG = '10,10,10';
  const SECTIONS = Math.max(1, document.querySelectorAll('.snap-section').length);
  let W, H, HZ0, time = 0, off = 0, skyline, scan, packets = [];

  // Section state: pos eases towards target, kick is a short impulse that fades out
  const sec = { pos: 0, target: 0, kick: 0, dir: 1 };

  const rand = (a, b) => a + Math.random() * (b - a);

  function offscreen() {
    const c = document.createElement('canvas');
    c.width = W * DPR; c.height = H * DPR;
    const g = c.getContext('2d');
    g.setTransform(DPR, 0, 0, DPR, 0, 0);
    return [c, g];
  }

  function init() {
    off = 0; packets = [];
    HZ0 = H * 0.76;
    let g;
    [skyline, g] = offscreen();
    let x = -20;
    while (x < W + 20) {
      const w = rand(18, 70), h = Math.random() < 0.15 ? rand(50, 95) : rand(10, 42);
      g.fillStyle = `rgb(${BG})`; g.fillRect(x, HZ0 - h, w, h);
      g.strokeStyle = `rgba(${CYAN},0.09)`; g.strokeRect(x + 0.5, HZ0 - h + 0.5, w, h);
      g.fillStyle = `rgba(${CYAN},0.12)`;
      for (let wy = HZ0 - h + 6; wy < HZ0 - 6; wy += 7) for (let wx = x + 4; wx < x + w - 4; wx += 6) if (Math.random() < 0.08) g.fillRect(wx, wy, 2, 2);
      if (h > 70) { g.strokeStyle = `rgba(${VIOLET},0.25)`; g.beginPath(); g.moveTo(x + w / 2, HZ0 - h); g.lineTo(x + w / 2, HZ0 - h - 18); g.stroke(); }
      x += w + rand(0, 14);
    }
    [scan, g] = offscreen();
    g.fillStyle = 'rgba(255,255,255,0.016)';
    for (let y = 0; y < H; y += 3) g.fillRect(0, y, W, 1);
  }

  // Floor (sign 1) or ceiling (sign -1) converging on the vanishing point (vx, hz)
  function plane(vx, hz, depth, sign, alpha) {
    const grad = ctx.createLinearGradient(0, hz, 0, hz + sign * depth);
    grad.addColorStop(0, `rgba(${CYAN},0)`);
    grad.addColorStop(0.25, `rgba(${CYAN},${alpha * 0.4})`);
    grad.addColorStop(1, `rgba(${CYAN},${alpha})`);
    ctx.strokeStyle = grad; ctx.lineWidth = 1;
    ctx.beginPath();
    const k = W / (12 * depth);
    for (let i = -40; i <= 40; i++) { ctx.moveTo(vx, hz); ctx.lineTo(vx + i * k * depth * 3, hz + sign * depth * 3); }
    for (let n = 1; n <= 24; n++) {
      const z = n - off;
      if (z < 0.4) continue;
      const y = hz + sign * depth * 0.8 / z;
      ctx.moveTo(0, y); ctx.lineTo(W, y);
    }
    ctx.stroke();
    return k;
  }

  // Darkens the centre so the text stays readable
  function vignette(strength) {
    const cx = W / 2, cy = H * 0.47;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.55);
    g.addColorStop(0, `rgba(${BG},${strength})`);
    g.addColorStop(0.55, `rgba(${BG},${strength * 0.45})`);
    g.addColorStop(1, `rgba(${BG},0)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  function draw(dt) {
    ctx.clearRect(0, 0, W, H);
    // Slow forward motion; a section change rushes forward (down) or back (up)
    off = (((off + dt * (0.18 + sec.kick * 2.4 * sec.dir)) % 1) + 1) % 1;
    const hz = HZ0 + (sec.pos / Math.max(1, SECTIONS - 1) - 0.5) * H * 0.06;
    const vx = W / 2 + Math.sin(time * 0.06) * W * 0.03;

    const glow = ctx.createLinearGradient(0, hz - 80, 0, hz + 40);
    glow.addColorStop(0, `rgba(${VIOLET},0)`);
    glow.addColorStop(0.65, `rgba(${VIOLET},${0.07 + sec.kick * 0.05})`);
    glow.addColorStop(0.85, `rgba(${CYAN},${0.1 + sec.kick * 0.06})`);
    glow.addColorStop(1, `rgba(${CYAN},0)`);
    ctx.fillStyle = glow; ctx.fillRect(0, hz - 80, W, 120);

    const k = plane(vx, hz, H - hz, 1, 0.26);
    plane(vx, hz, hz, -1, 0.06);

    // Packets running along the floor towards the viewer
    if (packets.length < 7 && Math.random() < dt * 2.5) packets.push({ i: Math.round(rand(-14, 14)), z: 24, v: rand(5, 11), col: Math.random() < 0.3 ? VIOLET : CYAN });
    for (let n = packets.length - 1; n >= 0; n--) {
      const p = packets[n];
      p.z -= p.v * (1 + sec.kick * 2) * dt;
      if (p.z < 0.45) { packets.splice(n, 1); continue; }
      const dy = (H - hz) * 0.8 / p.z, y = hz + dy, x = vx + p.i * k * dy;
      const r = Math.min(14, 40 / p.z);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${p.col},0.8)`); g.addColorStop(1, `rgba(${p.col},0)`);
      ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }

    ctx.drawImage(skyline, (vx - W / 2) * 0.4, hz - HZ0, W, H);
    ctx.drawImage(scan, 0, 0, W, H);
    vignette(0.55);
  }

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    init();
  }

  window.addEventListener('sectionchange', e => {
    sec.target = e.detail.index;
    sec.dir = e.detail.dir;
    sec.kick = 1;
  });

  let last = performance.now();
  function loop(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    time += dt;
    sec.pos += (sec.target - sec.pos) * Math.min(1, dt * 1.6);
    sec.kick *= Math.exp(-dt * 1.8);
    draw(dt);
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => { if (window.innerWidth > 768) resize(); });
  resize();
  requestAnimationFrame(loop);
})();
