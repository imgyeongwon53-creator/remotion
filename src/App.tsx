import { useState, useEffect, useRef, useCallback } from "react";
import Scene1_Intro from "./components/Scene1_Intro";
import Scene2_Hobbies from "./components/Scene2_Hobbies";
import Scene3_Learning1 from "./components/Scene3_Learning1";
import Scene4_Learning2 from "./components/Scene4_Learning2";
import Scene5_Outro from "./components/Scene5_Outro";
import "./App.css";

const SCENES = [
  { id: "intro",     label: "소개",    duration: 6000,  Component: Scene1_Intro },
  { id: "hobbies",   label: "취미",    duration: 6000,  Component: Scene2_Hobbies },
  { id: "learning1", label: "배움 ①", duration: 7000,  Component: Scene3_Learning1 },
  { id: "learning2", label: "배움 ②", duration: 7000,  Component: Scene4_Learning2 },
  { id: "outro",     label: "마무리",  duration: 4000,  Component: Scene5_Outro },
];

const TOTAL = SCENES.reduce((a, s) => a + s.duration, 0); // 30000ms

function BgGrid() {
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      backgroundImage: `
        linear-gradient(rgba(80,144,255,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(80,144,255,0.04) 1px, transparent 1px)
      `,
      backgroundSize: "56px 56px",
    }} />
  );
}

function BgGlow() {
  return (
    <>
      <div style={{
        position: "absolute", top: -120, right: -80,
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(30,80,200,0.22) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -80, left: -60,
        width: 320, height: 320, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(20,60,160,0.18) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
    </>
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

  // Resolve current scene
  let sceneIndex = SCENES.length - 1;
  let sceneElapsed = elapsed;
  for (let i = 0; i < SCENES.length; i++) {
    if (sceneElapsed < SCENES[i].duration) { sceneIndex = i; break; }
    sceneElapsed -= SCENES[i].duration;
  }
  const scene = SCENES[sceneIndex];
  const sceneProgress = Math.min(sceneElapsed / scene.duration, 1);
  const progressPct = (elapsed / TOTAL) * 100;
  const elapsedSec = (elapsed / 1000).toFixed(1);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#04080f",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: "'Malgun Gothic', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
      padding: 24,
    }}>
      {/* Video Canvas */}
      <div style={{
        position: "relative", width: 800, height: 450,
        background: "linear-gradient(150deg, #060d1e 0%, #081224 50%, #050e20 100%)",
        borderRadius: 20, overflow: "hidden",
        boxShadow: "0 0 80px rgba(30,80,255,0.18), 0 40px 80px rgba(0,0,0,0.7)",
        border: "1px solid rgba(80,144,255,0.12)",
      }}>
        <BgGrid />
        <BgGlow />

        {/* Scene */}
        <scene.Component key={`${scene.id}-${sceneIndex}`} progress={sceneProgress} />

        {/* Top-right label */}
        <div style={{
          position: "absolute", top: 18, right: 22,
          fontSize: 10, color: "rgba(255,255,255,0.25)",
          letterSpacing: 2, textTransform: "uppercase",
          fontFamily: "monospace",
        }}>
          {elapsedSec}s / 30.0s
        </div>

        {/* Corner brackets */}
        {[
          { top: 16, left: 16, bt: "borderTop", bl: "borderLeft" },
          { top: 16, right: 16, bt: "borderTop", bl: "borderRight" },
          { bottom: 16, left: 16, bt: "borderBottom", bl: "borderLeft" },
          { bottom: 16, right: 16, bt: "borderBottom", bl: "borderRight" },
        ].map((pos, i) => (
          <div key={i} style={{
            position: "absolute", ...pos,
            width: 28, height: 28,
            [pos.bt]: "2px solid rgba(80,144,255,0.25)",
            [pos.bl]: "2px solid rgba(80,144,255,0.25)",
          } as React.CSSProperties} />
        ))}
      </div>

      {/* Controls */}
      <div style={{ width: 800, marginTop: 14 }}>
        {/* Progress bar */}
        <div
          style={{
            height: 4, background: "rgba(255,255,255,0.06)",
            borderRadius: 2, cursor: "pointer", marginBottom: 12,
            position: "relative",
          }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setElapsed(((e.clientX - rect.left) / rect.width) * TOTAL);
            setPlaying(false);
          }}
        >
          {/* Scene markers */}
          {SCENES.slice(0, -1).map((s, i) => {
            const pos = SCENES.slice(0, i + 1).reduce((a, x) => a + x.duration, 0) / TOTAL * 100;
            return (
              <div key={s.id} style={{
                position: "absolute", top: -2, left: `${pos}%`,
                width: 1, height: 8,
                background: "rgba(80,144,255,0.3)",
              }} />
            );
          })}
          <div style={{
            height: "100%", width: `${progressPct}%`,
            background: "linear-gradient(90deg, #1a5fff, #50b0ff)",
            borderRadius: 2,
          }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Play/Pause */}
          <button
            onClick={() => { if (elapsed >= TOTAL) setElapsed(0); setPlaying(p => !p); }}
            style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "linear-gradient(135deg, #1a5fff, #0040c0)",
              border: "none", cursor: "pointer", color: "#fff",
              fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px rgba(30,100,255,0.4)",
              flexShrink: 0,
            }}
          >
            {playing ? "⏸" : "▶"}
          </button>

          {/* Restart */}
          <button
            onClick={() => { setElapsed(0); setPlaying(false); }}
            style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: 15, flexShrink: 0,
            }}
          >↺</button>

          {/* Scene jump buttons */}
          <div style={{ display: "flex", gap: 6, marginLeft: 6, flexWrap: "wrap" }}>
            {SCENES.map((s, i) => {
              const start = SCENES.slice(0, i).reduce((a, x) => a + x.duration, 0);
              const active = sceneIndex === i;
              return (
                <button
                  key={s.id}
                  onClick={() => { setElapsed(start); setPlaying(false); }}
                  style={{
                    padding: "5px 13px", borderRadius: 20,
                    background: active ? "rgba(30,100,255,0.22)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${active ? "rgba(80,144,255,0.6)" : "rgba(255,255,255,0.1)"}`,
                    color: active ? "#6aabff" : "rgba(255,255,255,0.35)",
                    fontSize: 12, cursor: "pointer",
                    fontFamily: "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif",
                  }}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          <div style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>
            총 30초
          </div>
        </div>
      </div>

      {/* Photo setup notice */}
      <div style={{
        marginTop: 16, fontSize: 12, color: "rgba(255,255,255,0.2)",
        textAlign: "center", lineHeight: 1.7,
      }}>
        💡 사진을 표시하려면 본인 사진을 <code style={{ background: "rgba(255,255,255,0.08)", padding: "1px 6px", borderRadius: 4 }}>public/photo.jpg</code> 로 저장하세요
      </div>
    </div>
  );
}
