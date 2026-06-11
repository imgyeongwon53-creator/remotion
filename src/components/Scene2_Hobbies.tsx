function ease(p: number) { return 1 - Math.pow(1 - Math.min(p, 1), 3); }

const HOBBIES = [
  {
    emoji: "🍜",
    title: "외대 맛집 탐방",
    desc: "교내외 숨은 맛집을 직접 발로 찾아다니는\n美食 探險家",
    color: "#ff9060",
    border: "rgba(255,144,96,0.3)",
    bg: "rgba(255,100,50,0.08)",
  },
  {
    emoji: "💃",
    title: "댄스 동아리 '才人'",
    desc: "재능있는 사람들이 모인 중앙댄스동아리\n춤으로 표현하는 나만의 언어",
    color: "#c080ff",
    border: "rgba(192,128,255,0.3)",
    bg: "rgba(160,80,255,0.08)",
  },
];

export default function Scene2_Hobbies({ progress }: { progress: number }) {
  const titleFade = { opacity: ease(Math.max(0, progress / 0.2)), transform: `translateY(${(1 - ease(Math.max(0, progress / 0.2))) * 20}px)` };

  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "0 60px",
    }}>
      <div style={{ ...titleFade, marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: "#5090ff", letterSpacing: 4, marginBottom: 6, textTransform: "uppercase" }}>
          My Life
        </div>
        <div style={{ fontSize: 32, fontWeight: 800, color: "#fff" }}>취미 & 활동</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {HOBBIES.map((h, i) => {
          const delay = 0.15 + i * 0.18;
          const p = ease(Math.max(0, (progress - delay) / 0.22));
          const float = Math.sin(progress * Math.PI * 5 + i * Math.PI) * 7;
          return (
            <div key={h.title} style={{
              opacity: p,
              transform: `translateX(${(1 - p) * -30}px)`,
              display: "flex", alignItems: "center", gap: 20,
              background: h.bg,
              border: `1px solid ${h.border}`,
              borderRadius: 16, padding: "20px 24px",
            }}>
              <div style={{
                fontSize: 48, flexShrink: 0,
                display: "inline-block",
                transform: `translateY(${float * p}px)`,
              }}>{h.emoji}</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: h.color, marginBottom: 6 }}>{h.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, whiteSpace: "pre-line" }}>{h.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
