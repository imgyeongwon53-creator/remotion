function ease(p: number) { return 1 - Math.pow(1 - Math.min(p, 1), 3); }
function ep(progress: number, delay: number, dur = 0.2) {
  return ease(Math.max(0, (progress - delay) / dur));
}

const COMPARE = [
  {
    type: "bad",
    label: "❌ 나쁜 프롬프트",
    example: '"번역해줘"',
    result: "맥락 없는 직역\n오류 가능성 높음",
    color: "#ff5050",
    bg: "rgba(255,80,80,0.07)",
    border: "rgba(255,80,80,0.3)",
  },
  {
    type: "good",
    label: "✅ 좋은 프롬프트",
    example: '"중국어 비즈니스 이메일을\n정중한 한국어로 번역해줘"',
    result: "목적에 맞는 고품질 결과\n즉시 활용 가능",
    color: "#50d0ff",
    bg: "rgba(80,208,255,0.07)",
    border: "rgba(80,208,255,0.3)",
  },
];

export default function Scene3_Learning1({ progress }: { progress: number }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "0 60px",
    }}>
      {/* Tag */}
      <div style={{ opacity: ep(progress, 0), marginBottom: 10 }}>
        <span style={{
          fontSize: 11, letterSpacing: 4, color: "#5090ff", textTransform: "uppercase",
        }}>AI 미디어 큐레이션 수업에서 배운 것 ①</span>
      </div>

      {/* Main title */}
      <div style={{
        opacity: ep(progress, 0.08),
        transform: `translateY(${(1 - ep(progress, 0.08)) * 24}px)`,
        marginBottom: 28,
      }}>
        <div style={{ fontSize: 34, fontWeight: 900, color: "#fff", lineHeight: 1.25 }}>
          프롬프트 설계에 따라<br />
          <span style={{ color: "#5090ff" }}>결과물의 질</span>이 달라진다
        </div>
      </div>

      {/* Comparison cards */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        {COMPARE.map((item, i) => {
          const p = ep(progress, 0.28 + i * 0.12, 0.22);
          return (
            <div key={item.type} style={{
              flex: 1, opacity: p,
              transform: `translateY(${(1 - p) * 20}px)`,
              background: item.bg,
              border: `1px solid ${item.border}`,
              borderRadius: 14, padding: "16px 18px",
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: item.color, marginBottom: 10 }}>{item.label}</div>
              <div style={{
                fontSize: 12, color: "rgba(255,255,255,0.7)",
                background: "rgba(0,0,0,0.25)", borderRadius: 8,
                padding: "8px 10px", marginBottom: 10,
                fontFamily: "monospace", whiteSpace: "pre-line",
              }}>{item.example}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                → {item.result}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quote */}
      <div style={{
        opacity: ep(progress, 0.6),
        transform: `translateY(${(1 - ep(progress, 0.6)) * 16}px)`,
        borderLeft: "3px solid #5090ff",
        paddingLeft: 18,
      }}>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.75 }}>
          "AI를 잘 활용하는 것이 중요하다는 것을<br />
          직접 코드 실습을 통해 깨달았습니다."
        </p>
      </div>
    </div>
  );
}
