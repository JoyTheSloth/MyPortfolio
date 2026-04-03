import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const DinoWidget: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(0);
  const [gameState, setGameState] = useState<'waiting' | 'running' | 'dead'>('waiting');

  // Palette
  const BG = '#1a0f00';
  const GREEN = '#FFD93D';
  const DIM = '#3d2800';
  const RED = '#FF5722';
  const AMBER = '#fff';

  const CELL = 3, GY = 130, W = 560, H = 160;
  const DW = 10 * CELL, DH = 12 * CELL;

  const DS = ['0000001110', '0000011111', '0000011011', '0000011111', '0001111110', '0111111100', '1111111000', '0111100000', '0011000000', '0011000000', '0011000000', '0111100000'];
  const DA = ['0000001110', '0000011111', '0000011011', '0000011111', '0001111110', '0111111100', '1111111000', '0111100000', '0001000000', '0001100000', '0000100000', '0001110000'];
  const DB = ['0000001110', '0000011111', '0000011011', '0000011111', '0001111110', '0111111100', '1111111000', '0111100000', '0000100000', '0001100000', '0001000000', '0011100000'];
  const DD = ['0000000000', '0000000000', '0000001110', '0000011111', '0000011011', '0001111111', '0111111111', '1111111000', '0001100000', '0001100000', '0001100000', '0011110000'];
  const PTA = ['0010001000', '0111111100', '1111111110', '0111111100', '0001110000'];
  const PTB = ['0001110000', '0011111100', '1111111110', '0111111100', '0010001000'];
  const PC = 3, PW = 10 * PC, PH = 5 * PC;

  const gameStateRef = useRef(gameState);
  const scoreRef = useRef(0);
  const frameRef = useRef(0);
  const speedRef = useRef(4.5);
  const dinoRef = useRef({ x: 60, y: GY - DH, vy: 0, grounded: true, duck: false, rf: 0 });
  const obsRef = useRef<any[]>([]);
  const cloudsRef = useRef<any[]>([]);
  const nextSpawnRef = useRef(80);
  const lastSLRef = useRef(0);
  const flashTimerRef = useRef(0);
  const msgTimerRef = useRef(0);
  const msgTxtRef = useRef('');

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const reset = () => {
    frameRef.current = 0;
    scoreRef.current = 0;
    speedRef.current = 4.5;
    lastSLRef.current = 0;
    obsRef.current = [];
    cloudsRef.current = [];
    nextSpawnRef.current = 80;
    flashTimerRef.current = 0;
    msgTxtRef.current = '';
    msgTimerRef.current = 0;
    dinoRef.current = { x: 60, y: GY - DH, vy: 0, grounded: true, duck: false, rf: 0 };
    setScore(0);
    setGameState('waiting');
  };

  const px = (ctx: CanvasRenderingContext2D, map: string[], x: number, y: number, col: string, sz?: number) => {
    const size = sz || CELL;
    ctx.fillStyle = col;
    map.forEach((row, ri) => {
      for (let ci = 0; ci < row.length; ci++) {
        if (row[ci] === '1') ctx.fillRect(x + ci * size, y + ri * size, size, size);
      }
    });
  };

  const spawnObs = () => {
    if (scoreRef.current > 250 && Math.random() < 0.2) {
      obsRef.current.push({ type: 'pt', x: W + 10, y: GY - 52, w: PW, h: PH, wf: 0 });
    } else {
      const types = [{ w: 16, h: 36, arms: [13] }, { w: 11, h: 44, arms: [] }, { w: 26, h: 32, arms: [11, 22] }, { w: 11, h: 26, arms: [] }, { w: 18, h: 38, arms: [15] }];
      const t = types[Math.floor(Math.random() * types.length)];
      obsRef.current.push({ type: 'c', x: W + 10, y: GY - t.h, w: t.w, h: t.h, arms: t.arms });
    }
  };

  const update = () => {
    frameRef.current++;
    scoreRef.current = Math.floor(frameRef.current / 8);
    setScore(scoreRef.current);

    const sl = Math.floor(scoreRef.current / 200);
    if (sl > lastSLRef.current) {
      lastSLRef.current = sl;
      msgTxtRef.current = 'SPEED UP!';
      msgTimerRef.current = 50;
    }
    speedRef.current = Math.min(4.5 + sl * 0.6, 13);
    if (msgTimerRef.current > 0) msgTimerRef.current--;

    const d = dinoRef.current;
    if (!d.grounded) {
      d.vy += 0.5;
      d.y += d.vy;
      if (d.y >= GY - DH) {
        d.y = GY - DH;
        d.grounded = true;
        d.vy = 0;
      }
    }
    if (d.grounded) d.rf++;

    obsRef.current.forEach(o => {
      o.x -= speedRef.current;
      if (o.wf !== undefined) o.wf++;
    });
    obsRef.current = obsRef.current.filter(o => o.x + o.w > -10);

    if (frameRef.current >= nextSpawnRef.current) {
      spawnObs();
      const gap = Math.max(40, 82 - Math.floor(scoreRef.current / 80) * 4);
      nextSpawnRef.current = frameRef.current + gap + Math.floor(Math.random() * 36);
    }

    cloudsRef.current.forEach(c => c.x -= speedRef.current * 0.2);
    cloudsRef.current = cloudsRef.current.filter(c => c.x > -30);
    if (frameRef.current % 90 === 0) {
      cloudsRef.current.push({ x: W + 10, y: 10 + Math.random() * 40, t: Math.random() < 0.5 ? '···' : '—·—' });
    }

    const pad = 4;
    const dtop = d.duck ? d.y + 2 * CELL + pad : d.y + pad;
    const dbot = d.y + DH - pad;
    const dleft = d.x + 2 * CELL + pad;
    const dright = d.x + DW - pad;

    for (const o of obsRef.current) {
      if (dleft < o.x + o.w - pad && dright > o.x + pad && dtop < o.y + o.h - pad && dbot > o.y + pad) {
        setGameState('dead');
        flashTimerRef.current = 20;
        if (scoreRef.current > hiScore) setHiScore(scoreRef.current);
        return;
      }
    }
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);

    const vg = ctx.createLinearGradient(0, 0, 0, H);
    vg.addColorStop(0, 'rgba(80,30,0,0.15)');
    vg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = GREEN;
    ctx.fillRect(0, GY, W, 2);
    ctx.fillStyle = DIM;
    const off = ((frameRef.current * speedRef.current * 0.35) % 20 + 20) % 20;
    for (let i = -20; i < W + 20; i += 20) {
      const xi = (i - off + W * 4) % (W + 44) - 20;
      ctx.fillRect(xi, GY + 5, 8, 1);
    }

    ctx.fillStyle = 'rgba(255,200,80,0.18)';
    ctx.font = '9px monospace';
    cloudsRef.current.forEach(c => ctx.fillText(c.t, c.x, c.y));

    obsRef.current.forEach(o => {
      if (o.type === 'c') {
        ctx.fillStyle = GREEN;
        const mid = o.x + Math.floor(o.w / 2);
        ctx.fillRect(mid - 2, o.y, 5, o.h);
        o.arms.forEach((a: number) => {
          ctx.fillRect(o.x, o.y + a, o.w, 3);
          ctx.fillRect(o.x, o.y + a - 8, 5, 12);
          ctx.fillRect(o.x + o.w - 5, o.y + a - 8, 5, 12);
        });
      } else {
        px(ctx, Math.floor(o.wf / 12) % 2 === 0 ? PTA : PTB, o.x, o.y, AMBER, PC);
      }
    });

    const d = dinoRef.current;
    const col = (gameStateRef.current === 'dead' && flashTimerRef.current % 4 < 2) ? RED : GREEN;
    let map = d.duck ? DD : d.grounded ? (Math.floor(d.rf / 8) % 2 === 0 ? DA : DB) : DS;
    px(ctx, map, d.x, d.y, col);
    const eyeRow = d.duck ? 4 : 1;
    ctx.fillStyle = BG;
    ctx.fillRect(d.x + 7 * CELL, d.y + eyeRow * CELL, CELL, CELL);
    ctx.fillStyle = 'rgba(255,220,50,0.5)';
    ctx.fillRect(d.x + 7 * CELL, d.y + eyeRow * CELL, 2, 2);

    if (flashTimerRef.current > 0) flashTimerRef.current--;

    if (msgTimerRef.current > 0) {
      ctx.save();
      ctx.globalAlpha = Math.min(1, msgTimerRef.current / 20);
      ctx.fillStyle = GREEN;
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(msgTxtRef.current, W - 10, 16);
      ctx.restore();
    }

    ctx.textAlign = 'center';
    if (gameStateRef.current === 'waiting') {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.beginPath();
      (ctx as any).roundRect(W / 2 - 90, H / 2 - 14, 180, 30, 8);
      ctx.fill();
      ctx.fillStyle = GREEN;
      ctx.font = 'bold 11px monospace';
      ctx.fillText('TAP TO START', W / 2, H / 2 + 4);
    }
    if (gameStateRef.current === 'dead') {
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.beginPath();
      (ctx as any).roundRect(W / 2 - 110, H / 2 - 22, 220, 48, 10);
      ctx.fill();
      ctx.fillStyle = RED;
      ctx.font = 'bold 11px monospace';
      ctx.fillText('GAME OVER', W / 2, H / 2 - 6);
      ctx.fillStyle = GREEN;
      ctx.font = '10px monospace';
      ctx.fillText('TAP TO RESTART', W / 2, H / 2 + 12);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const loop = () => {
      if (gameStateRef.current === 'running') update();
      draw(ctx);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const jump = () => {
    if (gameStateRef.current === 'waiting') { setGameState('running'); return; }
    if (gameStateRef.current === 'dead') { reset(); setGameState('running'); return; }
    if (dinoRef.current.grounded && !dinoRef.current.duck) {
      dinoRef.current.vy = -10;
      dinoRef.current.grounded = false;
    }
  };

  const duck = (on: boolean) => {
    if (gameStateRef.current !== 'running') return;
    dinoRef.current.duck = on;
    if (on && !dinoRef.current.grounded) dinoRef.current.vy = 8;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump(); }
      if (e.code === 'ArrowDown') { e.preventDefault(); duck(true); }
    };
    const handleKeyUp = (e: KeyboardEvent) => { if (e.code === 'ArrowDown') duck(false); };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  return (
    <div className="w-full flex-1 flex flex-col justify-center">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 text-[10px] font-bold text-black/50 uppercase tracking-wider">
        <span>dino.run</span>
        <span>SCORE: {String(score).padStart(4, '0')} · HI: {String(hiScore).padStart(4, '0')}</span>
      </div>

      {/* Canvas Wrap */}
      <div className="rounded-2xl overflow-hidden shadow-2xl bg-[#1a0f00] relative group/canvas border border-black/20">
        <canvas 
          ref={canvasRef} 
          width={W} 
          height={H} 
          className="w-full h-auto cursor-pointer block"
          onClick={jump}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95, y: 2 }}
          onMouseDown={jump}
          onTouchStart={(e) => { e.preventDefault(); jump(); }}
          className="flex-1 py-4 px-6 rounded-2xl bg-black/60 backdrop-blur-md shadow-[0_8px_0_rgb(0,0,0,0.2)] hover:shadow-[0_6px_0_rgb(0,0,0,0.2)] active:shadow-none flex flex-col items-center justify-center transition-all border border-white/10 group/jbtn"
        >
          <span className="text-[#FFD93D] font-black text-xs md:text-sm tracking-[0.2em] mb-1 group-hover/jbtn:scale-110 transition-transform">JUMP</span>
          <div className="text-[#FFD93D]/40 text-[10px] font-bold">SPACE / ↑</div>
        </motion.button>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95, y: 2 }}
          onMouseDown={() => duck(true)}
          onMouseUp={() => duck(false)}
          onMouseLeave={() => duck(false)}
          onTouchStart={(e) => { e.preventDefault(); duck(true); }}
          onTouchEnd={(e) => { e.preventDefault(); duck(false); }}
          className="flex-1 py-4 px-6 rounded-2xl bg-white/10 backdrop-blur-md shadow-[0_8px_0_rgb(0,0,0,0.15)] hover:shadow-[0_6px_0_rgb(0,0,0,0.15)] active:shadow-none flex flex-col items-center justify-center transition-all border border-white/10 group/dbtn"
        >
          <span className="text-white/90 font-black text-xs md:text-sm tracking-[0.2em] mb-1 group-hover/dbtn:scale-110 transition-transform">DUCK</span>
          <div className="text-white/30 text-[10px] font-bold">DOWN ↓</div>
        </motion.button>
      </div>

      <p className="text-center text-[9px] text-black/40 mt-3 font-medium uppercase tracking-widest hidden md:block">
        SPACE / ↑ jump · ↓ duck
      </p>
    </div>
  );
};

export default DinoWidget;
