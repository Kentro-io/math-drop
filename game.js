/* ═══════════════════════════════════════════════════════════════
   MATH DROP — A Falling Math Game
   Built by JARVIS for Sarkis
   v2.0 — Multi-user + Grade Levels
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  // ── Avatar Options ───────────────────────────────────────────
  const AVATARS = ['🧒','👧','👦','🧒🏻','👧🏽','👦🏾','🧒🏿','👩','👨','🧑','🐱','🐶','🦊','🐻','🐼','🦄','🐲','🤖','👽','🎮'];

  // ── Grade Configurations ─────────────────────────────────────
  //    Each grade defines its own 10-level progression
  const GRADES = {
    'pre-k': {
      id: 'pre-k', name: 'Pre-K', ages: '3–5', emoji: '🌱', color: '#00ff88',
      desc: 'Counting & simple addition',
      levels: [
        { level:1,  name:'Count With Me',    ops:['+'],  min:1, max:3,  fallTime:18, spawnMs:5000, goal:5,  maxActive:2 },
        { level:2,  name:'Tiny Sums',        ops:['+'],  min:1, max:5,  fallTime:17, spawnMs:4500, goal:6,  maxActive:2 },
        { level:3,  name:'Fingers Up',       ops:['+'],  min:1, max:5,  fallTime:16, spawnMs:4200, goal:7,  maxActive:2 },
        { level:4,  name:'One More',         ops:['+'],  min:1, max:7,  fallTime:16, spawnMs:4000, goal:8,  maxActive:2 },
        { level:5,  name:'Take Away',        ops:['−'],  min:1, max:5,  fallTime:16, spawnMs:4500, goal:7,  maxActive:2 },
        { level:6,  name:'Mix & Match',      ops:['+','−'], min:1, max:5, fallTime:15, spawnMs:4000, goal:8, maxActive:2 },
        { level:7,  name:'Getting Bigger',   ops:['+'],  min:2, max:8,  fallTime:15, spawnMs:3800, goal:8,  maxActive:3 },
        { level:8,  name:'Almost Ten',       ops:['+','−'], min:1, max:8, fallTime:14, spawnMs:3600, goal:9, maxActive:3 },
        { level:9,  name:'Number Hero',      ops:['+','−'], min:2, max:9, fallTime:14, spawnMs:3400, goal:10, maxActive:3 },
        { level:10, name:'Pre-K Star!',      ops:['+','−'], min:1, max:10, fallTime:13, spawnMs:3200, goal:10, maxActive:3 },
      ]
    },
    'k-1': {
      id: 'k-1', name: 'K – 1st', ages: '5–7', emoji: '🌿', color: '#00e5ff',
      desc: 'Addition & subtraction to 20',
      levels: [
        { level:1,  name:'Warm Up',         ops:['+'],     min:1, max:9,   fallTime:16, spawnMs:4200, goal:7,  maxActive:2 },
        { level:2,  name:'Single Digits',   ops:['+'],     min:2, max:10,  fallTime:15, spawnMs:3800, goal:8,  maxActive:3 },
        { level:3,  name:'Take Away',       ops:['−'],     min:1, max:10,  fallTime:15, spawnMs:3800, goal:8,  maxActive:3 },
        { level:4,  name:'Mix It Up',       ops:['+','−'], min:2, max:12,  fallTime:14, spawnMs:3500, goal:10, maxActive:3 },
        { level:5,  name:'Teens',           ops:['+'],     min:5, max:15,  fallTime:14, spawnMs:3300, goal:10, maxActive:3 },
        { level:6,  name:'Double Digits',   ops:['+','−'], min:3, max:18,  fallTime:13, spawnMs:3200, goal:12, maxActive:3 },
        { level:7,  name:'Fast Fingers',    ops:['+','−'], min:4, max:15,  fallTime:13, spawnMs:3000, goal:12, maxActive:4 },
        { level:8,  name:'To Twenty',       ops:['+','−'], min:5, max:20,  fallTime:12, spawnMs:2800, goal:14, maxActive:4 },
        { level:9,  name:'Speed Sums',      ops:['+','−'], min:5, max:20,  fallTime:11, spawnMs:2600, goal:15, maxActive:4 },
        { level:10, name:'K-1 Champion!',   ops:['+','−'], min:3, max:20,  fallTime:10, spawnMs:2400, goal:16, maxActive:5 },
      ]
    },
    '2-3': {
      id: '2-3', name: '2nd – 3rd', ages: '7–9', emoji: '🌳', color: '#ffd000',
      desc: 'All operations, times tables',
      levels: [
        { level:1,  name:'Warm Up',         ops:['+'],           min:1,  max:9,  fallTime:14, spawnMs:3800, goal:8,  maxActive:3 },
        { level:2,  name:'Double Digits',   ops:['+'],           min:2,  max:18, fallTime:13, spawnMs:3400, goal:10, maxActive:3 },
        { level:3,  name:'Subtraction',     ops:['−'],           min:1,  max:15, fallTime:13, spawnMs:3200, goal:10, maxActive:3 },
        { level:4,  name:'Mix It Up',       ops:['+','−'],       min:2,  max:20, fallTime:12, spawnMs:3000, goal:12, maxActive:4 },
        { level:5,  name:'Times Tables',    ops:['×'],           min:2,  max:9,  fallTime:12, spawnMs:3400, goal:12, maxActive:3 },
        { level:6,  name:'All Together',    ops:['+','−','×'],   min:2,  max:12, fallTime:11, spawnMs:2800, goal:14, maxActive:4 },
        { level:7,  name:'Division',        ops:['÷'],           min:2,  max:9,  fallTime:11, spawnMs:3200, goal:12, maxActive:3 },
        { level:8,  name:'Full Spectrum',   ops:['+','−','×','÷'],min:3, max:15, fallTime:10, spawnMs:2500, goal:15, maxActive:5 },
        { level:9,  name:'Speed Round',     ops:['+','−','×','÷'],min:3, max:20, fallTime:8,  spawnMs:2100, goal:18, maxActive:5 },
        { level:10, name:'Math Master',     ops:['+','−','×','÷'],min:5, max:25, fallTime:7,  spawnMs:1800, goal:20, maxActive:6 },
      ]
    },
    '4-5': {
      id: '4-5', name: '4th – 5th', ages: '9–11', emoji: '🔥', color: '#ff8c00',
      desc: 'Harder operations, bigger numbers',
      levels: [
        { level:1,  name:'Quick Sums',      ops:['+'],           min:10, max:50,  fallTime:13, spawnMs:3400, goal:8,  maxActive:3 },
        { level:2,  name:'Big Minus',        ops:['−'],           min:10, max:50,  fallTime:12, spawnMs:3200, goal:10, maxActive:3 },
        { level:3,  name:'Mixed Ops',        ops:['+','−'],       min:10, max:60,  fallTime:12, spawnMs:3000, goal:10, maxActive:4 },
        { level:4,  name:'Times Challenge',  ops:['×'],           min:3,  max:12,  fallTime:11, spawnMs:3000, goal:12, maxActive:3 },
        { level:5,  name:'Long Division',    ops:['÷'],           min:3,  max:12,  fallTime:11, spawnMs:3200, goal:12, maxActive:3 },
        { level:6,  name:'Four Ops',         ops:['+','−','×','÷'],min:5, max:25,  fallTime:10, spawnMs:2600, goal:14, maxActive:4 },
        { level:7,  name:'Triple Digits',    ops:['+','−'],       min:20, max:99,  fallTime:10, spawnMs:2800, goal:14, maxActive:4 },
        { level:8,  name:'Power Mix',        ops:['+','−','×','÷'],min:5, max:30,  fallTime:9,  spawnMs:2200, goal:16, maxActive:5 },
        { level:9,  name:'Turbo',            ops:['+','−','×','÷'],min:8, max:40,  fallTime:8,  spawnMs:2000, goal:18, maxActive:5 },
        { level:10, name:'Elite!',           ops:['+','−','×','÷'],min:10,max:50,  fallTime:7,  spawnMs:1700, goal:20, maxActive:6 },
      ]
    },
    '6-plus': {
      id: '6-plus', name: '6th +', ages: '11+', emoji: '🚀', color: '#b44dff',
      desc: 'Advanced: negatives, big numbers',
      levels: [
        { level:1,  name:'Warm Up',          ops:['+','−'],       min:15,  max:80,  fallTime:12, spawnMs:3200, goal:8,  maxActive:3 },
        { level:2,  name:'Big Products',     ops:['×'],           min:6,   max:15,  fallTime:12, spawnMs:3000, goal:10, maxActive:3 },
        { level:3,  name:'Divide & Conquer', ops:['÷'],           min:4,   max:15,  fallTime:11, spawnMs:3000, goal:10, maxActive:3 },
        { level:4,  name:'Negative Zone',    ops:['+','−'],       min:-20, max:20,  fallTime:11, spawnMs:2800, goal:12, maxActive:4, allowNeg:true },
        { level:5,  name:'All Operations',   ops:['+','−','×','÷'],min:5,  max:30,  fallTime:10, spawnMs:2600, goal:14, maxActive:4 },
        { level:6,  name:'Hundred Club',     ops:['+','−'],       min:25,  max:150, fallTime:10, spawnMs:2800, goal:14, maxActive:4 },
        { level:7,  name:'Hard Times',       ops:['×','÷'],       min:6,   max:20,  fallTime:9,  spawnMs:2400, goal:16, maxActive:5 },
        { level:8,  name:'Mixed Mayhem',     ops:['+','−','×','÷'],min:10, max:50,  fallTime:8,  spawnMs:2200, goal:18, maxActive:5 },
        { level:9,  name:'Blitz',            ops:['+','−','×','÷'],min:10, max:60,  fallTime:7,  spawnMs:1900, goal:20, maxActive:6 },
        { level:10, name:'Genius!',          ops:['+','−','×','÷'],min:15, max:80,  fallTime:6,  spawnMs:1600, goal:22, maxActive:6 },
      ]
    },
  };

  const GRADE_ORDER = ['pre-k', 'k-1', '2-3', '4-5', '6-plus'];

  const COLORS = ['#00e5ff','#ff2d75','#ffd000','#00ff88','#ff8c00','#b44dff'];

  const BADGE_DEFS = [
    { id:'first_blood',   name:'First Blood',    icon:'🎯', desc:'Answer your first problem' },
    { id:'speed_demon',   name:'Speed Demon',    icon:'⚡', desc:'Answer within 1 second' },
    { id:'streak_5',      name:'On Fire',        icon:'🔥', desc:'5 correct in a row' },
    { id:'streak_10',     name:'Unstoppable',    icon:'💥', desc:'10 correct in a row' },
    { id:'streak_25',     name:'Legendary',      icon:'🌟', desc:'25 correct in a row' },
    { id:'level_3',       name:'Getting Good',   icon:'📈', desc:'Reach level 3' },
    { id:'level_5',       name:'Math Wizard',    icon:'🧙', desc:'Reach level 5' },
    { id:'level_10',      name:'Math God',       icon:'👑', desc:'Complete level 10' },
    { id:'score_500',     name:'Half Grand',     icon:'🏅', desc:'Score 500 points' },
    { id:'score_2000',    name:'Score Machine',  icon:'🏆', desc:'Score 2,000 points' },
    { id:'score_5000',    name:'Point Monster',  icon:'💰', desc:'Score 5,000 points' },
    { id:'perfect_level', name:'Flawless',       icon:'💎', desc:'Clear a level with no misses' },
    { id:'accuracy_95',   name:'Sharpshooter',   icon:'🎯', desc:'Finish with 95%+ accuracy' },
    { id:'combo_3x',      name:'Triple Threat',  icon:'🔱', desc:'Reach 3× combo' },
    { id:'combo_5x',      name:'Combo King',     icon:'⚡', desc:'Reach 5× combo' },
    { id:'survivor',      name:'Survivor',       icon:'❤️‍🔥', desc:'Finish with only 1 life' },
  ];

  // ── Player Manager ───────────────────────────────────────────
  class PlayerManager {
    constructor() {
      this.players = this._load();
      this.activeId = localStorage.getItem('md_active_player') || null;
      if (!this.players.length) this._createDefault();
      if (!this.activeId || !this.get(this.activeId)) this.activeId = this.players[0].id;
    }

    _load() {
      try { return JSON.parse(localStorage.getItem('md_players') || '[]'); }
      catch { return []; }
    }
    _save() {
      localStorage.setItem('md_players', JSON.stringify(this.players));
      localStorage.setItem('md_active_player', this.activeId);
    }

    _createDefault() {
      // Migrate legacy data if present
      const legacyHi = +(localStorage.getItem('md_hi') || 0);
      const legacyBadges = (() => { try { return JSON.parse(localStorage.getItem('md_badges') || '[]'); } catch { return []; } })();

      const p = {
        id: this._uid(),
        name: 'Player 1',
        avatar: '🧒',
        grade: '2-3',
        highScores: legacyHi ? { '2-3': legacyHi } : {},
        badges: legacyBadges,
        gamesPlayed: 0,
        totalCorrect: 0,
        created: Date.now(),
      };
      this.players.push(p);
      this.activeId = p.id;
      this._save();
    }

    _uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

    get(id) { return this.players.find(p => p.id === id); }
    active() { return this.get(this.activeId); }

    add(name, avatar, grade) {
      const p = {
        id: this._uid(), name, avatar, grade: grade || '2-3',
        highScores: {}, badges: [], gamesPlayed: 0, totalCorrect: 0, created: Date.now(),
      };
      this.players.push(p);
      this.activeId = p.id;
      this._save();
      return p;
    }

    remove(id) {
      this.players = this.players.filter(p => p.id !== id);
      if (this.activeId === id) this.activeId = this.players[0]?.id || null;
      if (!this.players.length) this._createDefault();
      this._save();
    }

    setActive(id) { this.activeId = id; this._save(); }

    setGrade(grade) {
      const p = this.active();
      if (p) { p.grade = grade; this._save(); }
    }

    getHighScore(gradeId) {
      const p = this.active();
      return p?.highScores?.[gradeId || p.grade] || 0;
    }

    saveScore(score, gradeId) {
      const p = this.active();
      if (!p) return false;
      const g = gradeId || p.grade;
      const prev = p.highScores[g] || 0;
      p.gamesPlayed++;
      if (score > prev) { p.highScores[g] = score; this._save(); return true; }
      this._save();
      return false;
    }

    getBadges() { return this.active()?.badges || []; }
    hasBadge(id) { return this.getBadges().includes(id); }
    unlockBadge(id) {
      const p = this.active();
      if (!p || p.badges.includes(id)) return false;
      p.badges.push(id);
      this._save();
      return true;
    }

    addCorrect(n) {
      const p = this.active();
      if (p) { p.totalCorrect += n; this._save(); }
    }
  }

  // ── Audio Engine (Web Audio API synth) ───────────────────────
  class AudioEngine {
    constructor() { this.ctx = null; this.master = null; this.on = true; }
    init() {
      try {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.master = this.ctx.createGain();
        this.master.gain.value = 0.25;
        this.master.connect(this.ctx.destination);
      } catch { this.on = false; }
    }
    ensure() {
      if (!this.ctx) this.init();
      if (this.ctx?.state === 'suspended') this.ctx.resume();
    }
    _tone(freq, dur, type = 'square', delay = 0, vol = 0.3) {
      if (!this.on || !this.ctx) return;
      const t = this.ctx.currentTime + delay;
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(vol, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.connect(g); g.connect(this.master);
      o.start(t); o.stop(t + dur);
    }
    correct() { this.ensure(); this._tone(523,0.1,'square',0); this._tone(659,0.1,'square',0.07); this._tone(784,0.14,'square',0.14); }
    wrong()   { this.ensure(); this._tone(200,0.18,'sawtooth',0,0.2); this._tone(160,0.22,'sawtooth',0.1,0.15); }
    miss()    { this.ensure(); this._tone(300,0.1,'sine',0); this._tone(200,0.15,'sine',0.08); this._tone(130,0.25,'sine',0.18); }
    levelUp() { this.ensure(); [523,659,784,1047].forEach((f,i)=>this._tone(f,0.16,'square',i*0.1)); }
    badge()   { this.ensure(); [392,523,659,784,1047].forEach((f,i)=>this._tone(f,0.18,'sine',i*0.11,0.25)); }
    combo(n)  { this.ensure(); const f=400+Math.min(n,20)*30; this._tone(f,0.06,'square',0,0.2); this._tone(f*1.5,0.08,'square',0.04,0.15); }
    gameOver(){ this.ensure(); [392,349,330,262].forEach((f,i)=>this._tone(f,0.3,'sawtooth',i*0.2,0.2)); }
    victory() { this.ensure(); [523,659,784,1047,1319,1568].forEach((f,i)=>this._tone(f,0.2,'square',i*0.1)); }
    toggle()  { this.on = !this.on; return this.on; }
  }

  // ── Particle System ──────────────────────────────────────────
  class ParticleSystem {
    constructor() { this.pool = []; }
    emit(x, y, color, count = 25) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 5;
        this.pool.push({ x, y, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed-2,
          life: 1, decay: 0.018+Math.random()*0.022, size: 2+Math.random()*4, color });
      }
    }
    update() {
      for (let i = this.pool.length-1; i >= 0; i--) {
        const p = this.pool[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.life -= p.decay; p.size *= 0.985;
        if (p.life <= 0) this.pool.splice(i, 1);
      }
    }
    draw(ctx) {
      for (const p of this.pool) {
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI*2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
  }

  // ── Floating Score Texts ─────────────────────────────────────
  class FloatingTexts {
    constructor() { this.items = []; }
    add(x, y, text, color = '#ffd000', size = 18) {
      this.items.push({ x, y, text, color, size, life: 1, vy: -1.2 });
    }
    update() {
      for (let i = this.items.length-1; i >= 0; i--) {
        const t = this.items[i]; t.y += t.vy; t.life -= 0.02;
        if (t.life <= 0) this.items.splice(i, 1);
      }
    }
    draw(ctx) {
      for (const t of this.items) {
        ctx.globalAlpha = Math.max(0, t.life);
        ctx.fillStyle = t.color;
        const s = t.size + (1-t.life)*6;
        ctx.font = `900 ${s}px 'Orbitron', monospace`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(t.text, t.x, t.y);
      }
      ctx.globalAlpha = 1;
    }
  }

  // ── Star Background ──────────────────────────────────────────
  class StarField {
    constructor(n = 70) {
      this.stars = Array.from({ length: n }, () => ({
        x: Math.random(), y: Math.random(), r: 0.4+Math.random()*1.4,
        phase: Math.random()*Math.PI*2, speed: 0.3+Math.random()*0.7,
      }));
    }
    draw(ctx, w, h, t) {
      for (const s of this.stars) {
        ctx.globalAlpha = 0.25+0.25*Math.sin(t*s.speed+s.phase);
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(s.x*w, s.y*h, s.r, 0, Math.PI*2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
  }

  // ── Math Problem Generator ───────────────────────────────────
  function generateProblem(cfg) {
    const op = cfg.ops[Math.floor(Math.random() * cfg.ops.length)];
    const R = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
    let a, b, ans, text;

    switch (op) {
      case '+':
        a = R(cfg.min, cfg.max); b = R(cfg.min, cfg.max);
        ans = a + b; text = `${a} + ${b}`; break;
      case '−':
        if (cfg.allowNeg) {
          a = R(cfg.min, cfg.max); b = R(cfg.min, cfg.max);
        } else {
          a = R(cfg.min, cfg.max); b = R(cfg.min, a);
        }
        ans = a - b; text = `${a} − ${b}`; break;
      case '×':
        a = R(Math.max(cfg.min, 2), Math.min(cfg.max, 15));
        b = R(2, Math.min(cfg.max, 12));
        ans = a * b; text = `${a} × ${b}`; break;
      case '÷':
        b = R(2, Math.min(cfg.max, 12));
        ans = R(Math.max(cfg.min, 2), Math.min(cfg.max, 15));
        a = b * ans; text = `${a} ÷ ${b}`; break;
    }
    return { text, answer: ans };
  }

  // ── Falling Problem Object ───────────────────────────────────
  class FallingProblem {
    constructor(text, answer, x, color) {
      this.text = text; this.answer = answer; this.x = x; this.y = -40;
      this.color = color; this.opacity = 0; this.solved = false; this.missed = false;
      this.spawnTime = performance.now(); this.glowT = Math.random()*Math.PI*2;
      this.w = 0; this.h = 52;
    }
    update(pxPerFrame, dt) {
      if (this.opacity < 1) this.opacity = Math.min(1, this.opacity + 0.06*dt);
      if (!this.solved && !this.missed) this.y += pxPerFrame * dt;
      else if (this.solved) this.opacity = Math.max(0, this.opacity - 0.08*dt);
      this.glowT += 0.04*dt;
    }
    draw(ctx, isTarget) {
      if (this.opacity <= 0) return;
      ctx.save(); ctx.globalAlpha = this.opacity;
      ctx.font = "bold 20px 'Orbitron', monospace";
      const tw = ctx.measureText(this.text).width;
      this.w = tw + 48;
      const x = this.x - this.w/2, y = this.y - this.h/2, r = 14;
      if (isTarget) { ctx.shadowColor = this.color; ctx.shadowBlur = 16+8*Math.sin(this.glowT); }
      ctx.fillStyle = isTarget ? 'rgba(18,22,42,0.95)' : 'rgba(14,17,32,0.9)';
      roundRect(ctx, x, y, this.w, this.h, r); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = isTarget ? this.color : hexAlpha(this.color, 0.5);
      ctx.lineWidth = isTarget ? 2.5 : 1.5;
      roundRect(ctx, x, y, this.w, this.h, r); ctx.stroke();
      ctx.fillStyle = isTarget ? '#fff' : '#ccd';
      ctx.font = "bold 20px 'Orbitron', monospace";
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(this.text, this.x, this.y);
      if (isTarget) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity * (0.5+0.5*Math.sin(this.glowT*2));
        ctx.font = '12px sans-serif';
        ctx.fillText('▶', this.x - this.w/2 - 12, this.y);
        ctx.fillText('◀', this.x + this.w/2 + 12, this.y);
      }
      ctx.restore();
    }
  }

  // ── Badge System ─────────────────────────────────────────────
  class BadgeSystem {
    constructor(audio, playerMgr) {
      this.audio = audio;
      this.pm = playerMgr;
      this.session = [];
      this.queue = [];
      this.showing = false;
    }
    has(id) { return this.pm.hasBadge(id); }
    unlock(id) {
      if (this.has(id)) return;
      if (!this.pm.unlockBadge(id)) return;
      this.session.push(id);
      this.audio.badge();
      const b = BADGE_DEFS.find(d => d.id === id);
      if (b) { this.queue.push(b); this._showNext(); }
    }
    _showNext() {
      if (this.showing || !this.queue.length) return;
      this.showing = true;
      const b = this.queue.shift();
      const el = document.getElementById('badge-notification');
      el.innerHTML = `
        <div class="badge-notif-header">🏆 ACHIEVEMENT UNLOCKED</div>
        <div class="badge-notif-content">
          <div class="badge-notif-icon">${b.icon}</div>
          <div><div class="badge-notif-name">${b.name}</div><div class="badge-notif-desc">${b.desc}</div></div>
        </div>`;
      el.classList.add('visible');
      setTimeout(() => { el.classList.remove('visible'); setTimeout(() => { this.showing = false; this._showNext(); }, 500); }, 2800);
    }
    renderGrid() {
      const grid = document.getElementById('badges-grid');
      const badges = this.pm.getBadges();
      grid.innerHTML = BADGE_DEFS.map(b => `
        <div class="badge-card ${badges.includes(b.id) ? 'unlocked' : 'locked'}">
          <div class="badge-icon">${b.icon}</div>
          <div class="badge-name">${b.name}</div>
          <div class="badge-desc">${badges.includes(b.id) ? b.desc : '???'}</div>
        </div>`).join('');
    }
  }

  // ── Main Game ────────────────────────────────────────────────
  class Game {
    constructor() {
      this.canvas  = document.getElementById('game-canvas');
      this.ctx     = this.canvas.getContext('2d');
      this.display = document.getElementById('answer-display');
      this.displayText = document.getElementById('answer-text');
      this.inputBuffer = '';
      this.audio   = new AudioEngine();
      this.pm      = new PlayerManager();
      this.particles = new ParticleSystem();
      this.floats  = new FloatingTexts();
      this.badges  = new BadgeSystem(this.audio, this.pm);
      this.stars   = new StarField();

      this.state   = 'menu';
      this.problems = [];
      this.score = 0; this.lives = 5; this.levelIdx = 0;
      this.combo = 0; this.maxCombo = 0;
      this.totalCorrect = 0; this.totalWrong = 0; this.totalMissed = 0;
      this.lvlCorrect = 0; this.lvlMissed = 0; this.lvlStart = 0;
      this.lastSpawn = 0; this.lastFrame = 0; this.shakeT = 0;
      this.comboFade = 0;
      this.cW = 0; this.cH = 0;

      // Editing state
      this._editingPlayer = null;
      this._selectedAvatar = AVATARS[0];
    }

    get currentGrade() {
      const p = this.pm.active();
      return GRADES[p?.grade || '2-3'];
    }

    init() {
      this._resize();
      this._bindEvents();
      this._renderGradeCards();
      this._updateTitleScreen();
      this.badges.renderGrid();
      this.showScreen('title');
      requestAnimationFrame(t => this._loop(t));
    }

    // ── Canvas sizing ──
    _resize() {
      const rect = this.canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      this.canvas.width  = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.cW = rect.width; this.cH = rect.height;
    }

    // ── Events ──
    _bindEvents() {
      const ro = window.ResizeObserver ? new ResizeObserver(() => this._resize()) : null;
      if (ro) ro.observe(this.canvas);
      else window.addEventListener('resize', () => this._resize());
      if (window.visualViewport) window.visualViewport.addEventListener('resize', () => this._resize());

      const $ = id => document.getElementById(id);

      // Title
      $('btn-start').onclick = () => { this.audio.ensure(); this.startGame(); };
      $('btn-badges').onclick = () => { this.badges.renderGrid(); this.showScreen('badges'); };
      $('btn-badges-back').onclick = () => this.showScreen('title');
      $('btn-restart').onclick = () => this.startGame();
      $('btn-menu').onclick = () => { this._updateTitleScreen(); this.showScreen('title'); };
      $('btn-mute').onclick = () => { const on = this.audio.toggle(); $('btn-mute').textContent = on ? '🔊' : '🔇'; };

      // Player management
      $('btn-switch-player').onclick = () => { this._renderPlayersList(); this.showScreen('players'); };
      $('btn-add-player').onclick = () => this._showAddPlayer();
      $('btn-players-back').onclick = () => { this._updateTitleScreen(); this.showScreen('title'); };
      $('btn-save-player').onclick = () => this._savePlayer();
      $('btn-cancel-player').onclick = () => { this._renderPlayersList(); this.showScreen('players'); };

      // Avatar picker
      $('avatar-picker').addEventListener('click', e => {
        const btn = e.target.closest('.avatar-opt');
        if (!btn) return;
        this._selectedAvatar = btn.dataset.avatar;
        $('avatar-picker').querySelectorAll('.avatar-opt').forEach(a => a.classList.toggle('selected', a.dataset.avatar === this._selectedAvatar));
      });

      // Grade cards
      $('grade-cards').addEventListener('click', e => {
        const card = e.target.closest('.grade-card');
        if (!card) return;
        this.pm.setGrade(card.dataset.grade);
        this._renderGradeCards();
        this._updateTitleScreen();
      });

      // Numpad
      document.getElementById('numpad').addEventListener('pointerdown', e => {
        const btn = e.target.closest('.nk');
        if (!btn || this.state !== 'playing') return;
        e.preventDefault();
        this._handleKey(btn.dataset.k);
        if (navigator.vibrate) navigator.vibrate(12);
      });

      // Desktop keyboard
      document.addEventListener('keydown', e => {
        if (this.state !== 'playing') return;
        if (e.key >= '0' && e.key <= '9') { this._handleKey(e.key); e.preventDefault(); }
        else if (e.key === 'Backspace') { this._handleKey('del'); e.preventDefault(); }
        else if (e.key === '-') { this._handleKey('neg'); e.preventDefault(); }
        else if (e.key === 'Enter') { this._handleKey('go'); e.preventDefault(); }
      });
    }

    // ── Grade Cards ──
    _renderGradeCards() {
      const active = this.pm.active()?.grade || '2-3';
      const container = document.getElementById('grade-cards');
      container.innerHTML = GRADE_ORDER.map(id => {
        const g = GRADES[id];
        const sel = id === active;
        return `<button class="grade-card ${sel ? 'selected' : ''}" data-grade="${id}" style="--gc: ${g.color}">
          <div class="gc-emoji">${g.emoji}</div>
          <div class="gc-name">${g.name}</div>
          <div class="gc-ages">${g.ages}</div>
        </button>`;
      }).join('');
    }

    // ── Title Screen ──
    _updateTitleScreen() {
      const p = this.pm.active();
      if (!p) return;
      document.getElementById('current-avatar').textContent = p.avatar;
      document.getElementById('current-name').textContent = p.name;
      const hi = this.pm.getHighScore();
      document.getElementById('high-score').textContent = hi > 0 ? `HIGH SCORE  ${hi.toLocaleString()}` : '';
      this._renderGradeCards();
    }

    // ── Player List ──
    _renderPlayersList() {
      const list = document.getElementById('players-list');
      list.innerHTML = this.pm.players.map(p => {
        const isActive = p.id === this.pm.activeId;
        const totalHi = Object.values(p.highScores).reduce((a, b) => a + b, 0);
        return `<div class="player-row ${isActive ? 'active' : ''}" data-id="${p.id}">
          <div class="pr-left">
            <span class="pr-avatar">${p.avatar}</span>
            <div class="pr-info">
              <div class="pr-name">${p.name}</div>
              <div class="pr-stats">Games: ${p.gamesPlayed} · Badges: ${p.badges.length} · Best: ${totalHi}</div>
            </div>
          </div>
          <div class="pr-actions">
            <button class="pr-btn pr-edit" title="Edit">✏️</button>
            ${this.pm.players.length > 1 ? `<button class="pr-btn pr-del" title="Delete">🗑️</button>` : ''}
          </div>
        </div>`;
      }).join('');

      // Bind clicks
      list.querySelectorAll('.player-row').forEach(row => {
        row.addEventListener('click', e => {
          if (e.target.closest('.pr-btn')) return;
          this.pm.setActive(row.dataset.id);
          this._updateTitleScreen();
          this.showScreen('title');
        });
        const editBtn = row.querySelector('.pr-edit');
        if (editBtn) editBtn.onclick = (e) => { e.stopPropagation(); this._showEditPlayer(row.dataset.id); };
        const delBtn = row.querySelector('.pr-del');
        if (delBtn) delBtn.onclick = (e) => {
          e.stopPropagation();
          if (confirm(`Delete ${this.pm.get(row.dataset.id)?.name}?`)) {
            this.pm.remove(row.dataset.id);
            this._renderPlayersList();
          }
        };
      });
    }

    // ── Add/Edit Player ──
    _showAddPlayer() {
      this._editingPlayer = null;
      this._selectedAvatar = AVATARS[0];
      document.getElementById('add-player-title').textContent = 'NEW PLAYER';
      document.getElementById('player-name-input').value = '';
      this._renderAvatarPicker();
      this.showScreen('add-player');
      setTimeout(() => document.getElementById('player-name-input').focus(), 300);
    }

    _showEditPlayer(id) {
      const p = this.pm.get(id);
      if (!p) return;
      this._editingPlayer = id;
      this._selectedAvatar = p.avatar;
      document.getElementById('add-player-title').textContent = 'EDIT PLAYER';
      document.getElementById('player-name-input').value = p.name;
      this._renderAvatarPicker();
      this.showScreen('add-player');
    }

    _renderAvatarPicker() {
      document.getElementById('avatar-picker').innerHTML = AVATARS.map(a =>
        `<button class="avatar-opt ${a === this._selectedAvatar ? 'selected' : ''}" data-avatar="${a}">${a}</button>`
      ).join('');
    }

    _savePlayer() {
      const name = document.getElementById('player-name-input').value.trim() || 'Player';
      if (this._editingPlayer) {
        const p = this.pm.get(this._editingPlayer);
        if (p) { p.name = name; p.avatar = this._selectedAvatar; this.pm._save(); }
      } else {
        this.pm.add(name, this._selectedAvatar, this.pm.active()?.grade || '2-3');
      }
      this._updateTitleScreen();
      this.showScreen('title');
    }

    showScreen(name) {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      document.getElementById('screen-' + name).classList.add('active');
      if (name === 'title') this._updateTitleScreen();
    }

    // ── Start / Reset ──
    startGame() {
      this.problems = [];
      this.score = 0; this.lives = 5; this.levelIdx = 0;
      this.combo = 0; this.maxCombo = 0;
      this.totalCorrect = 0; this.totalWrong = 0; this.totalMissed = 0;
      this.lvlCorrect = 0; this.lvlMissed = 0;
      this.lastSpawn = 0; this.shakeT = 0; this.comboFade = 0;
      this.badges.session = [];
      this.particles.pool = [];
      this.floats.items = [];
      this.state = 'playing';
      this.showScreen('game');
      this._updateHUD();
      this.inputBuffer = '';
      this._updateDisplay();
      this._levelSplash();
    }

    // ── Level Splash ──
    _levelSplash() {
      const cfg = this.currentGrade.levels[this.levelIdx];
      const el = document.getElementById('level-splash');
      el.innerHTML = `
        <div class="splash-level">LEVEL ${cfg.level}</div>
        <div class="splash-name">${cfg.name}</div>`;
      el.classList.add('visible');
      this.audio.levelUp();
      this.state = 'splash';
      setTimeout(() => {
        el.classList.remove('visible');
        this.state = 'playing';
        this.lvlCorrect = 0; this.lvlMissed = 0;
        this.lvlStart = performance.now();
        this.lastSpawn = performance.now();
      }, 1800);
    }

    // ── Spawn ──
    _spawn() {
      const cfg = this.currentGrade.levels[this.levelIdx];
      const active = this.problems.filter(p => !p.solved && !p.missed).length;
      if (active >= cfg.maxActive) return;
      const { text, answer } = generateProblem(cfg);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const pad = 70;
      const x = pad + Math.random() * Math.max(1, this.cW - pad*2);
      this.problems.push(new FallingProblem(text, answer, x, color));
    }

    // ── Numpad Key Handler ──
    _handleKey(k) {
      if (k === 'go') { this._submit(); return; }
      if (k === 'del') {
        this.inputBuffer = this.inputBuffer.slice(0, -1);
        if (this.inputBuffer === '-') this.inputBuffer = '';
      } else if (k === 'neg') {
        if (this.inputBuffer.startsWith('-')) this.inputBuffer = this.inputBuffer.slice(1);
        else if (this.inputBuffer.length < 5) this.inputBuffer = '-' + this.inputBuffer;
      } else {
        const digits = this.inputBuffer.replace('-', '');
        if (digits.length < 4) this.inputBuffer += k;
      }
      this._updateDisplay();
    }

    _updateDisplay() { this.displayText.textContent = this.inputBuffer; }

    // ── Submit Answer ──
    _submit() {
      const raw = this.inputBuffer.trim();
      this.inputBuffer = ''; this._updateDisplay();
      if (!raw) return;
      const num = parseInt(raw, 10);
      if (isNaN(num)) return;
      const live = this.problems.filter(p => !p.solved && !p.missed).sort((a,b) => b.y - a.y);
      const match = live.find(p => p.answer === num);
      if (match) this._onCorrect(match); else this._onWrong();
    }

    _onCorrect(p) {
      p.solved = true;
      const cfg = this.currentGrade.levels[this.levelIdx];
      const elapsed = (performance.now() - p.spawnTime) / 1000;
      const speedMul = Math.max(1, 3.5 - elapsed*0.4);
      this.combo++; this.maxCombo = Math.max(this.maxCombo, this.combo);
      const cMul = this._comboMul();
      const pts = Math.round(10 * cfg.level * speedMul * cMul);
      this.score += pts;
      this.totalCorrect++; this.lvlCorrect++;

      this.particles.emit(p.x, p.y, p.color, 28);
      this.floats.add(p.x, p.y-25, `+${pts}`, p.color);
      if (this.combo > 1) { this.comboFade = 2.5; this.floats.add(p.x, p.y-50, `${this.combo}× COMBO`, '#ffd000', 14); }
      this.audio.correct();
      if (this.combo > 1) this.audio.combo(this.combo);

      this.display.classList.add('correct');
      setTimeout(() => this.display.classList.remove('correct'), 250);
      const sc = document.getElementById('hud-score');
      sc.classList.add('bump'); setTimeout(() => sc.classList.remove('bump'), 180);

      this._checkBadges(p);
      this._updateHUD();
      if (this.lvlCorrect >= cfg.goal) this._advance();
    }

    _onWrong() {
      this.combo = 0; this.totalWrong++;
      this.audio.wrong(); this.shakeT = 0.35;
      this.display.classList.add('wrong');
      setTimeout(() => this.display.classList.remove('wrong'), 400);
    }

    _onMiss(p) {
      p.missed = true;
      this.lives--; this.combo = 0;
      this.totalMissed++; this.lvlMissed++;
      this.audio.miss(); this.shakeT = 0.4;
      this.particles.emit(p.x, this.cH, '#ff3b3b', 15);
      this.floats.add(p.x, this.cH-35, `${p.text} = ${p.answer}`, '#ff3b3b', 14);
      const hEl = document.getElementById('hud-lives');
      hEl.classList.add('hit'); setTimeout(() => hEl.classList.remove('hit'), 400);
      this._updateHUD();
      if (this.lives <= 0) this._endGame(false);
    }

    _advance() {
      for (const p of this.problems) {
        if (!p.solved && !p.missed) { p.solved = true; this.particles.emit(p.x, p.y, p.color, 12); }
      }
      if (this.lvlMissed === 0) this.badges.unlock('perfect_level');
      const levels = this.currentGrade.levels;
      if (this.levelIdx >= levels.length - 1) { this._endGame(true); return; }
      this.levelIdx++;
      if (this.levelIdx >= 2) this.badges.unlock('level_3');
      if (this.levelIdx >= 4) this.badges.unlock('level_5');
      this._levelSplash();
    }

    _endGame(victory) {
      this.state = 'over';
      const isNew = this.pm.saveScore(this.score);
      this.pm.addCorrect(this.totalCorrect);

      const total = this.totalCorrect + this.totalWrong;
      const acc = total > 0 ? this.totalCorrect / total : 0;
      if (acc >= 0.95 && total >= 10) this.badges.unlock('accuracy_95');
      if (this.lives === 1 && !victory) this.badges.unlock('survivor');
      if (victory) { this.badges.unlock('level_10'); this.audio.victory(); }
      else this.audio.gameOver();

      const levels = this.currentGrade.levels;
      const title = document.getElementById('gameover-title');
      title.textContent = victory ? '🎉 YOU WIN!' : 'GAME OVER';
      title.className = victory ? 'win' : 'loss';

      document.getElementById('final-score').textContent = this.score.toLocaleString();

      const p = this.pm.active();
      const playerLabel = p ? `${p.avatar} ${p.name}` : '';
      const gradeLabel = this.currentGrade.name;

      document.getElementById('final-stats').innerHTML =
        `<div>${playerLabel} · ${gradeLabel}</div>` +
        `<div>Level ${levels[this.levelIdx].level} — ${levels[this.levelIdx].name}</div>` +
        `<div>Correct: ${this.totalCorrect} · Wrong: ${this.totalWrong} · Missed: ${this.totalMissed}</div>` +
        `<div>Accuracy: ${total > 0 ? Math.round(acc*100) : 0}% · Best Combo: ${this.maxCombo}×</div>` +
        (isNew ? '<div class="new-high-score">🏆 NEW HIGH SCORE!</div>' : '');

      const earned = document.getElementById('badges-earned');
      if (this.badges.session.length) {
        earned.innerHTML =
          '<div style="color:var(--text-dim);font-size:0.75rem;margin-bottom:6px">Badges Earned</div>' +
          this.badges.session.map(id => {
            const b = BADGE_DEFS.find(d => d.id === id);
            return b ? `<span class="badge-earned-item">${b.icon} ${b.name}</span>` : '';
          }).join('');
      } else earned.innerHTML = '';

      this.showScreen('gameover');
    }

    _comboMul() {
      if (this.combo >= 25) return 5;
      if (this.combo >= 15) return 4;
      if (this.combo >= 8)  return 3;
      if (this.combo >= 3)  return 2;
      return 1;
    }

    _checkBadges(p) {
      if (this.totalCorrect === 1) this.badges.unlock('first_blood');
      const solveTime = (performance.now() - p.spawnTime) / 1000;
      if (solveTime < 1) this.badges.unlock('speed_demon');
      if (this.combo >= 5)  this.badges.unlock('streak_5');
      if (this.combo >= 10) this.badges.unlock('streak_10');
      if (this.combo >= 25) this.badges.unlock('streak_25');
      if (this.score >= 500)  this.badges.unlock('score_500');
      if (this.score >= 2000) this.badges.unlock('score_2000');
      if (this.score >= 5000) this.badges.unlock('score_5000');
      const mul = this._comboMul();
      if (mul >= 3) this.badges.unlock('combo_3x');
      if (mul >= 5) this.badges.unlock('combo_5x');
    }

    _updateHUD() {
      const cfg = this.currentGrade.levels[this.levelIdx];
      document.getElementById('hud-lives').textContent = '❤️'.repeat(Math.max(0, this.lives));
      document.getElementById('hud-level').textContent = `LV ${cfg.level} · ${this.lvlCorrect}/${cfg.goal}`;
      document.getElementById('hud-score').textContent = this.score.toLocaleString();
      const pct = Math.min(100, (this.lvlCorrect / cfg.goal) * 100);
      document.getElementById('level-progress-bar').style.width = pct + '%';

      const cd = document.getElementById('combo-display');
      if (this.combo >= 3) {
        const m = this._comboMul();
        cd.textContent = `🔥 ${m}× COMBO`;
        cd.style.color = this.combo >= 15 ? '#ff2d75' : this.combo >= 8 ? '#ff8c00' : '#ffd000';
        cd.classList.add('visible');
        this.comboFade = 2;
      }
    }

    // ── Game Loop ──
    _loop(now) {
      const raw = now - (this.lastFrame || now);
      this.lastFrame = now;
      const dtMs = Math.min(raw, 120);
      const dt = dtMs / (1000/60);
      this._update(now, dt);
      this._render(now / 1000);
      requestAnimationFrame(t => this._loop(t));
    }

    _update(now, dt) {
      this.particles.update(); this.floats.update();
      if (this.state !== 'playing') return;
      const cfg = this.currentGrade.levels[this.levelIdx];
      const pxPerFrame = this.cH / (cfg.fallTime * 60);
      if (now - this.lastSpawn > cfg.spawnMs) { this._spawn(); this.lastSpawn = now; }
      for (const p of this.problems) {
        p.update(pxPerFrame, dt);
        if (!p.solved && !p.missed && p.y > this.cH + 5) this._onMiss(p);
      }
      this.problems = this.problems.filter(p => {
        if (p.solved && p.opacity <= 0) return false;
        if (p.missed) return false;
        return true;
      });
      if (this.shakeT > 0) this.shakeT -= dt/60;
      if (this.combo < 3) {
        this.comboFade -= dt/60;
        if (this.comboFade <= 0) document.getElementById('combo-display').classList.remove('visible');
      }
    }

    _render(t) {
      const ctx = this.ctx, w = this.cW, h = this.cH;
      if (!w || !h) return;
      ctx.save();
      if (this.shakeT > 0) { const i = this.shakeT*12; ctx.translate((Math.random()-0.5)*i, (Math.random()-0.5)*i); }
      ctx.fillStyle = '#0a0e1a'; ctx.fillRect(-10, -10, w+20, h+20);
      this.stars.draw(ctx, w, h, t);
      const dg = ctx.createLinearGradient(0, h-60, 0, h);
      dg.addColorStop(0, 'rgba(255,59,59,0)');
      dg.addColorStop(1, 'rgba(255,59,59,0.12)');
      ctx.fillStyle = dg; ctx.fillRect(0, h-60, w, 60);
      ctx.save();
      ctx.strokeStyle = 'rgba(255,59,59,0.2)'; ctx.lineWidth = 1; ctx.setLineDash([4,6]);
      ctx.beginPath(); ctx.moveTo(0, h-3); ctx.lineTo(w, h-3); ctx.stroke();
      ctx.restore();
      const live = this.problems.filter(p => !p.solved && !p.missed).sort((a,b) => b.y - a.y);
      const target = live[0] || null;
      for (const p of this.problems) { if (p !== target) p.draw(ctx, false); }
      if (target) target.draw(ctx, true);
      this.particles.draw(ctx); this.floats.draw(ctx);
      ctx.restore();
    }
  }

  // ── Helpers ──────────────────────────────────────────────────
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r, y); ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r); ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h); ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r); ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
  }
  function hexAlpha(hex, a) { return hex + Math.round(a*255).toString(16).padStart(2,'0'); }

  // ── Bootstrap ────────────────────────────────────────────────
  if (document.fonts?.ready) document.fonts.ready.then(() => new Game().init());
  else document.addEventListener('DOMContentLoaded', () => new Game().init());

})();
