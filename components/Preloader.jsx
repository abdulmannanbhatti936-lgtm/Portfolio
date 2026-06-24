
"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";

export default function Preloader({ onComplete }) {
  const sceneRef = useRef(null);
  const planeRef = useRef(null);
  const preloaderRef = useRef(null);
  const trailRef = useRef(null);
  const bgcRef = useRef(null);
  const animFrameRef = useRef(null);
  const pctIntervalRef = useRef(null);
  const morphIntervalRef = useRef(null);
  const bgAnimRef = useRef(null);
  
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const startAnimation = useCallback(() => {
    const scene = sceneRef.current;
    const plane = planeRef.current;
    const preloader = preloaderRef.current;
    const trailCanvas = trailRef.current;
    if (!scene || !plane || !preloader || !trailCanvas) return;

    const tCtx = trailCanvas.getContext("2d");
    const W = scene.offsetWidth;
    const H = scene.offsetHeight;
    trailCanvas.width = W;
    trailCanvas.height = H;

    const trailPts = [];
    const flyDuration = 800;
    
    // Responsive Plane Size
    const planeSize = Math.min(52, W * 0.08);
    plane.style.width = `${planeSize}px`;
    plane.style.height = `${planeSize}px`;

    const planeStartX = -planeSize - 10;
    const planeEndX = W - planeSize;
    const planeY = H * 0.36;
    const arcHeight = Math.min(35, H * 0.06);

    function getPos(t) {
      const x = planeStartX + (planeEndX - planeStartX) * t;
      const arc = -arcHeight * Math.sin(Math.PI * t);
      return { x, y: planeY + arc };
    }

    function getAngle(t) {
      const p1 = getPos(t);
      const p2 = getPos(Math.min(t + 0.01, 1));
      return (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
    }

    function drawTrail() {
      tCtx.clearRect(0, 0, W, H);
      if (trailPts.length < 2) return;
      tCtx.beginPath();
      tCtx.setLineDash([4, 8]);
      tCtx.strokeStyle = "rgba(26,31,46,0.2)";
      tCtx.lineWidth = 1.2;
      const offset = planeSize / 2;
      tCtx.moveTo(trailPts[0].x + offset, trailPts[0].y + offset);
      for (let i = 1; i < trailPts.length; i++)
        tCtx.lineTo(trailPts[i].x + offset, trailPts[i].y + offset);
      tCtx.stroke();
      tCtx.setLineDash([]);
    }

    function spawnDebris(cx, cy) {
      for (let i = 0; i < 10; i++) {
        const d = document.createElement("div");
        d.style.cssText = `
          position:absolute; width:6px; height:3px;
          background:#1a1f2e; border-radius:1px;
          opacity:1; z-index:21; transform-origin:center;
          left:${cx}px; top:${cy}px;
          transition: transform 0.6s ease-out, opacity 0.6s ease-out;
        `;
        scene.appendChild(d);
        const angle = (i / 10) * 360;
        const dist = 20 + Math.random() * 35;
        const dx = Math.cos((angle * Math.PI) / 180) * dist;
        const dy = Math.sin((angle * Math.PI) / 180) * dist;
        requestAnimationFrame(() => {
          d.style.transform = `translate(${dx}px,${dy + 35}px) rotate(${Math.random() * 360}deg)`;
          d.style.opacity = "0";
        });
        setTimeout(() => d.remove(), 700);
      }
    }

    function startReveal() {
      const revealStart = performance.now();
      const revealDur = 300;
      function doReveal(now) {
        const t = Math.min((now - revealStart) / revealDur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        preloader.style.clipPath = `inset(0 ${100 - ease * 100}% 0 0)`;
        if (t < 1) requestAnimationFrame(doReveal);
        else startContent();
      }
      requestAnimationFrame(doReveal);
    }

    let phase = "fly";
    let startTime = null;
    let crashTime = null;
    let fallStartY = 0;
    let currentX = planeStartX;
    let currentY = planeY;

    function loop(now) {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;

      if (phase === "fly") {
        const t = Math.min(elapsed / flyDuration, 1);
        const pos = getPos(t);
        const angle = getAngle(t);
        currentX = pos.x;
        currentY = pos.y;
        plane.style.left = pos.x + "px";
        plane.style.top = pos.y + "px";
        plane.style.transform = `rotate(${angle}deg)`;
        if (!trailPts.length || Math.abs(pos.x - trailPts[trailPts.length - 1].x) > 5)
          trailPts.push({ x: pos.x, y: pos.y });
        drawTrail();
        if (t >= 1) {
          phase = "crash";
          crashTime = now;
          spawnDebris(W - 10, currentY + (planeSize/2));
          let shakes = 0;
          const iv = setInterval(() => {
            scene.style.transform = `translate(${(Math.random() - 0.5) * 7}px,${(Math.random() - 0.5) * 4}px)`;
            if (++shakes > 7) { clearInterval(iv); scene.style.transform = ""; }
          }, 45);
        }
      } else if (phase === "crash") {
        if (now - crashTime > 100) {
          phase = "fall";
          fallStartY = currentY;
          crashTime = now;
          startReveal();
        }
      } else if (phase === "fall") {
        const ft = (now - crashTime) / 1000;
        const fy = fallStartY + 0.5 * 1800 * ft * ft;
        const fx = currentX + 12 * ft;
        plane.style.top = fy + "px";
        plane.style.left = fx + "px";
        plane.style.transform = `rotate(${90 + ft * 130}deg)`;
        if (fy > H + 60) {
          plane.style.display = "none";
          phase = "done";
        }
      }

      if (phase !== "done") animFrameRef.current = requestAnimationFrame(loop);
    }

    animFrameRef.current = requestAnimationFrame(loop);

    function startContent() {
      // corners
      const corners = scene.querySelectorAll(".pre-corner");
      corners.forEach((c, i) => {
        setTimeout(() => {
          c.style.transition = "opacity 0.2s ease";
          c.style.opacity = "1";
        }, i * 20);
      });

      // name letters
      const nameEl = scene.querySelector("#pre-bigName");
      if (nameEl) {
        nameEl.innerHTML = "";
        "Mannan".split("").forEach((ch, i) => {
          const s = document.createElement("span");
          s.textContent = ch;
          s.style.cssText = `display:inline-block; transform:translateY(100%); opacity:0;`;
          nameEl.appendChild(s);
          setTimeout(() => {
            s.style.transition = `transform 0.2s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease`;
            s.style.transform = "translateY(0)";
            s.style.opacity = "1";
          }, 30 + i * 30);
        });
      }

      setTimeout(() => {
        const r = scene.querySelector("#pre-role");
        if (r) { r.style.transition = "transform 0.3s ease"; r.style.transform = "translateY(0)"; }
      }, 150);

      setTimeout(() => {
        const d = scene.querySelector("#pre-divider");
        if (d) { d.style.transition = "width 0.3s ease"; d.style.width = "60px"; }
      }, 250);

      setTimeout(() => {
        const m = scene.querySelector("#pre-morph");
        if (m) { m.style.transition = "opacity 0.2s ease"; m.style.opacity = "1"; }
      }, 350);

      setTimeout(() => {
        const bar = scene.querySelector("#pre-bar");
        if (bar) { bar.style.transition = "width 0.4s cubic-bezier(0.4,0,0.2,1)"; bar.style.width = "100%"; }
      }, 100);

      // counter
      let pct = 0;
      const pctEl = scene.querySelector("#pre-pct");
      pctIntervalRef.current = setInterval(() => {
        pct += Math.random() > 0.5 ? 3 : 2;
        if (pct >= 100) {
          pct = 100;
          clearInterval(pctIntervalRef.current);
          setTimeout(() => { if (onComplete) onComplete(); }, 300);
        }
        if (pctEl) pctEl.textContent = Math.round(pct);
      }, 25);

      // morph phrases
      const phrases = ["Building experience", "Loading portfolio", "Crafting UI", "Almost there", "Welcome!"];
      let mi = 0;
      const morphEl = scene.querySelector("#pre-morph");
      morphIntervalRef.current = setInterval(() => {
        mi = (mi + 1) % phrases.length;
        if (morphEl) {
          morphEl.style.opacity = "0";
          setTimeout(() => { morphEl.textContent = phrases[mi]; morphEl.style.opacity = "1"; }, 100);
        }
      }, 600);

      // particle bg
      const bgc = bgcRef.current;
      if (!bgc) return;
      const bctx = bgc.getContext("2d", { alpha: true });
      let bW = bgc.width = bgc.offsetWidth;
      let bH = bgc.height = bgc.offsetHeight;
      
      const dots = Array.from({ length: 30 }, () => ({
        x: Math.random() * bW, y: Math.random() * bH,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: 1 + Math.random() * 1.5, o: 0.05 + Math.random() * 0.1,
      }));

      function drawBg() {
        bctx.clearRect(0, 0, bW, bH);
        const len = dots.length;
        
        // Update & Draw Dots
        bctx.fillStyle = "rgba(26,31,46,0.1)";
        for (let i = 0; i < len; i++) {
          const d = dots[i];
          d.x += d.vx; d.y += d.vy;
          if (d.x < 0 || d.x > bW) d.vx *= -1;
          if (d.y < 0 || d.y > bH) d.vy *= -1;
          
          bctx.beginPath();
          bctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          bctx.fill();
        }

        // Draw Connections
        bctx.lineWidth = 0.5;
        for (let i = 0; i < len; i++) {
          for (let j = i + 1; j < len; j++) {
            const a = dots[i], b = dots[j];
            const dx = a.x - b.x, dy = a.y - b.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 8000) { // 90px squared
              const opacity = 0.08 * (1 - Math.sqrt(distSq) / 90);
              bctx.beginPath();
              bctx.strokeStyle = `rgba(26,31,46,${opacity})`;
              bctx.moveTo(a.x, a.y);
              bctx.lineTo(b.x, b.y);
              bctx.stroke();
            }
          }
        }
        bgAnimRef.current = requestAnimationFrame(drawBg);
      }
      drawBg();
    }
  }, [onComplete]);

  useEffect(() => {
    if (!sceneRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        // Only update if change is significant (> 20px) to prevent over-rendering
        setDimensions(prev => {
          if (Math.abs(prev.width - width) > 20 || Math.abs(prev.height - height) > 20) {
            return { width, height };
          }
          return prev;
        });
      }
    });

    observer.observe(sceneRef.current);
    
    // Initial animation trigger
    const timer = requestAnimationFrame(() => {
      startAnimation();
    });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(timer);
      cancelAnimationFrame(animFrameRef.current);
      cancelAnimationFrame(bgAnimRef.current);
      clearInterval(pctIntervalRef.current);
      clearInterval(morphIntervalRef.current);
    };
  }, [startAnimation]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      ref={sceneRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#e8e8e8",
        zIndex: 9999,
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      {/* Trail canvas */}
      <canvas
        ref={trailRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 19, pointerEvents: "none" }}
      />

      {/* Paper Plane */}
      <div
        ref={planeRef}
        style={{ position: "absolute", zIndex: 20, transformOrigin: "center center" }}
      >
        <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <polygon points="2,26 50,4 38,48" fill="#1a1f2e" opacity="0.92" />
          <polygon points="2,26 50,4 26,26" fill="#ffffff" opacity="0.25" />
          <line x1="26" y1="26" x2="50" y2="4" stroke="rgba(26,31,46,0.3)" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Preloader panel */}
      <div
        ref={preloaderRef}
        style={{
          position: "absolute", inset: 0,
          background: "#e8e8e8",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          zIndex: 10,
          clipPath: "inset(0 100% 0 0)",
        }}
      >
        <canvas ref={bgcRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />

        {/* Corner brackets */}
        {[
          { top: 20, left: 20, borderTop: "1.5px solid #1a1f2e", borderLeft: "1.5px solid #1a1f2e" },
          { top: 20, right: 20, borderTop: "1.5px solid #1a1f2e", borderRight: "1.5px solid #1a1f2e" },
          { bottom: 20, left: 20, borderBottom: "1.5px solid #1a1f2e", borderLeft: "1.5px solid #1a1f2e" },
          { bottom: 20, right: 20, borderBottom: "1.5px solid #1a1f2e", borderRight: "1.5px solid #1a1f2e" },
        ].map((style, i) => (
          <div
            key={i}
            className="pre-corner hidden sm:block"
            style={{ 
              position: "absolute", 
              width: 18, 
              height: 18, 
              opacity: 0, 
              zIndex: 3, 
              ...style,
              display: dimensions.width < 400 ? 'none' : undefined 
            }}
          />
        ))}

        {/* Center content */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", width: '100%' }}>
          <div
            id="pre-bigName"
            style={{ 
              fontSize: 'clamp(28px, 6vw, 54px)', 
              fontWeight: 700, 
              color: "#1a1f2e", 
              letterSpacing: -1, 
              lineHeight: 1.1, 
              display: "flex", 
              overflow: "hidden" 
            }}
          />
          <div style={{ overflow: "hidden", marginTop: 10 }}>
            <div
              id="pre-role"
              style={{ 
                fontSize: 'clamp(8px, 1.5vw, 11px)', 
                letterSpacing: dimensions.width < 600 ? '3px' : '6px', 
                color: "rgba(26,31,46,0.45)", 
                textTransform: "uppercase", 
                transform: "translateY(100%)" 
              }}
            >
              Full Stack Software Engineer
            </div>
          </div>
          <div id="pre-divider" style={{ width: 0, height: 1, background: "#1a1f2e", margin: "18px 0" }} />
          <div
            id="pre-morph"
            style={{ fontSize: 10, letterSpacing: 3, color: "rgba(26,31,46,0.4)", textTransform: "uppercase", opacity: 0 }}
          >
            Building experience
          </div>
        </div>

        {/* Ghost percentage */}
        <div
          id="pre-pct"
          style={{
            position: "absolute", bottom: 32,
            fontSize: 'clamp(60px, 12vw, 110px)', 
            fontWeight: 700,
            color: "rgba(26,31,46,0.04)", letterSpacing: -6,
            zIndex: 1, userSelect: "none", lineHeight: 1,
          }}
        >
          0
        </div>

        {/* Progress bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "rgba(26,31,46,0.08)", zIndex: 3 }}>
          <div
            id="pre-bar"
            style={{ height: "100%", background: "#1a1f2e", width: 0, position: "relative" }}
          >
            <div style={{
              position: "absolute", right: 0, top: dimensions.width < 600 ? -2 : -3,
              width: dimensions.width < 600 ? 6 : 9, 
              height: dimensions.width < 600 ? 6 : 9, 
              background: "#1a1f2e",
              borderRadius: "50%", boxShadow: "0 0 0 3px rgba(26,31,46,0.12)"
            }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
