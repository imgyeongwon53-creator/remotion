import { useState, useEffect, useRef, useCallback } from "react";
import Intro from "./components/Intro";
import Skills from "./components/Skills";
import Stats from "./components/Stats";
import Timeline from "./components/Timeline";
import Outro from "./components/Outro";
import "./App.css";

const SCENES = [
  { id: "intro", label: "인트로", duration: 4000, Component: Intro },
  { id: "skills", label: "스킬", duration: 4000, Component: Skills },
  { id: "stats", label: "통계", duration: 3500, Component: Stats },
  { id: "timeline", label: "경력", duration: 4000, Component: Timeline },
  { id: "outro", label: "아웃트로", duration: 3000, Component: Outro },
];

const TOTAL = SCENES.reduce((a, s) => a + s.duration, 0);

function ParticlesBg() {
  const pts = Array.from({ length: 30 }, (_, i) => ({
    cx: ((i * 37 + 10) % 100),
    cy: ((i * 53 + 20) % 100),
    r: (i % 3) + 1,
  }));
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }}>
      {pts.map((p, i) => (
        <circle key={i} cx={`${p.cx}%`} cy={`${p.cy}%`} r={p.r} fill="#1e90ff" />
      ))}
    </svg>
  );
}

function GridBg() {
  return (
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: `
        linear-gradient(rgba(30,144,255,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(30,144,255,0.04) 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
    }} />
  );
}

export default function App() {
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);

  const tick = useCallback((ts: number) => {
    if (lastRef.current) {
      setElapsed((e) => {
        const next = e + (ts - lastRef.current);
        if (next >= TOTAL) { setPlaying(false); return TOTAL; }
        return next;
      });
    }
    lastRef.current = ts;
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (playing) {
      lastRef.current = 0;
      rafRef.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafRef.current);
      lastRef.current = 0;
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, tick]);

  let sceneIndex = 0;
  let sceneElapsed = elapsed;
  for (let i = 0; i < SCENES.length; i++) {
    if (sceneElapsed < SCENES[i].duration) { sceneIndex = i; break; }
    sceneElapsed -= SCENES[i].duration;
    sceneIndex = i;
  }
  const scene = SCENES[sceneIndex];
  const sceneProgress = Math.min(sceneElapsed / scene.duration, 1);
  const progressPct = (elapsed / TOTAL) * 100;

  return (
    <div style={{
      minHeight: "100vh", background: "#080c14",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      padding: 24,
    }}>
      <div style={{
        position: "relative", width: 800, height: 450,
        background: "linear-gradient(135deg, #08111f 0%, #0a1628 100%)",
        borderRadius: 20, overflow: "hidden",
        boxShadow: "0 0 60px rgba(30,144,255,0.2), 0 40px 80px rgba(0,0,0,0.6)",
        border: "1px solid rgba(30,144,255,0.15)",
      }}>
        <GridBg />
        <ParticlesBg />

        <scene.Component key={sceneIndex} progress={sceneProgress} />

        <div style={{
          position: "absolute", top: 20, right: 20,
          fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: 2, textTransform: "uppercase",
        }}>
          {sceneIndex + 1} / {SCENES.length} — {scene.label}
        </div>

        <div style={{
          position: "absolute", bottom: 20, left: 20,
          width: 40, height: 40,
          borderLeft: "2px solid rgba(30,144,255,0.3)",
          borderBottom: "2px solid rgba(30,144,255,0.3)",
        }} />
        <div style={{
          position: "absolute", top: 20, left: 20,
          width: 40, height: 40,
          borderLeft: "2px solid rgba(30,144,255,0.3)",
          borderTop: "2px solid rgba(30,144,255,0.3)",
        }} />
      </div>

      <div style={{ width: 800, marginTop: 16 }}>
        <div
          style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, cursor: "pointer", marginBottom: 14 }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            setElapsed(pct * TOTAL);
            setPlaying(false);
          }}
        >
          <div style={{
            height: "100%", width: `${progressPct}%`,
            background: "linear-gradient(90deg, #1e90ff, #00c8ff)",
            borderRadius: 2,
          }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => {
              if (elapsed >= TOTAL) setElapsed(0);
              setPlaying((p) => !p);
            }}
            style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "linear-gradient(135deg, #1e90ff, #0050c8)",
              border: "none", cursor: "pointer", color: "#fff",
              fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px rgba(30,144,255,0.4)",
            }}
          >
            {playing ? "⏸" : "▶"}
          </button>

          <button
            onClick={() => { setElapsed(0); setPlaying(false); }}
            style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer", color: "rgba(255,255,255,0.6)", fontSize: 14,
            }}
          >
            ↺
          </button>

          <div style={{ display: "flex", gap: 8, marginLeft: 8 }}>
            {SCENES.map((s, i) => {
              const start = SCENES.slice(0, i).reduce((a, x) => a + x.duration, 0);
              return (
                <button
                  key={s.id}
                  onClick={() => { setElapsed(start); setPlaying(false); }}
                  style={{
                    padding: "6px 14px", borderRadius: 20,
                    background: sceneIndex === i ? "rgba(30,144,255,0.25)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${sceneIndex === i ? "rgba(30,144,255,0.6)" : "rgba(255,255,255,0.1)"}`,
                    color: sceneIndex === i ? "#1e90ff" : "rgba(255,255,255,0.4)",
                    fontSize: 12, cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          <div style={{ marginLeft: "auto", fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
            {(elapsed / 1000).toFixed(1)}s / {(TOTAL / 1000).toFixed(1)}s
          </div>
        </div>
      </div>
    </div>
  );
}
