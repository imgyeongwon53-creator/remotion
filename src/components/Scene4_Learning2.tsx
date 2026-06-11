function ease(p: number) { return 1 - Math.pow(1 - Math.min(p, 1), 3); }
function ep(progress: number, delay: number, dur = 0.2) {
  return ease(Math.max(0, (progress - delay) / dur));
}

const STEPS = [
  { icon: "🤖", label: "AI가 답변 생성", color: "#aaa" },
  { icon: "🔍", label: "직접 검토 & 분석", color: "#5090ff" },
  { icon: "✅", label: "선택적 수용", color: "#50e0a0" },
];

export default function Scene4_Learning2({ progress }: { progress: number }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "0 60px",
    }}>
      <div style={{ opacity: ep(progress, 0), marginBottom: 10 }}>
        <span style={{ fontSize: 11, letterSpacing: 4, color: "#50e0a0", textTransform: "uppercase" }}>
          AI 미디어 큐레이션 수업에서 배운 것 ②
        </span>
      </div>

      <div style={{
        opacity: ep(progress, 0.08),
        transform: `translateY(${(1 - ep(progress, 0.08)) * 24}px)`,
        marginBottom: 32,
      }}>
        <div style={{ fontSize: 34, fontWeight: 900, color: "#fff", lineHeight: 1.25 }}>
          AI 답변을 바라보는<br />
          <span style={{ color: "#50e0a0" }}>비판적 안목</span>이 중요하다
        </div>
      </div>

      {/* Flow steps */}
      <div style={{
        display: "flex", alignItems: "center", gap: 0,
        opacity: ep(progress, 0.25),
      }}>
        {STEPS.map((s, i) => {
          const p = ep(progress, 0.28 + i * 0.15, 0.18);
          return (
            <div key={s.label} style={{ display: "flex", alignItems: "center" }}>
              <div style={{
                opacity: p,
                transform: `scale(${0.7 + p * 0.3})`,
                textAlign: "center",
                padding: "16px 20px",
                background: `${s.color}12`,
                border: `1px solid ${s.color}40`,
                borderRadius: 14,
                minWidth: 130,
              }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: 13, color: s.color, fontWeight: 600 }}>{s.label}</div>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{
                  opacity: ep(progress, 0.35 + i * 0.15),
                  fontSize: 20, color: "rgba(255,255,255,0.25)", padding: "0 10px",
                }}>→</div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{
        opacity: ep(progress, 0.7),
        transform: `translateY(${(1 - ep(progress, 0.7)) * 16}px)`,
        marginTop: 28,
        borderLeft: "3px solid #50e0a0", paddingLeft: 18,
      }}>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.75 }}>
          "무조건적인 수용이 아닌,<br />
          직접 검토하고 수용하는 안목이 중요합니다."
        </p>
      </div>
    </div>
  );
}
