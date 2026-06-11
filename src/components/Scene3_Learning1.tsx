function ease(p: number) { return 1 - Math.pow(1 - Math.min(p, 1), 3); }
function ep(progress: number, delay: number, dur = 0.2) {
  return ease(Math.max(0, (progress - delay) / dur));
}

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

      {/* Progress bar visual */}
      <div style={{ opacity: ep(progress, 0.28), marginBottom: 28 }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
          {[
            { label: "나쁜 프롬프트", val: 30, color: "#ff5050" },
            { label: "좋은 프롬프트", val: 92, color: "#50d0ff" },
          ].map((item) => (
            <div key={item.label} style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>
                <span>{item.label}</span>
                <span style={{ color: item.color }}>{Math.round(item.val * ep(progress, 0.35, 0.35))}%</span>
              </div>
              <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${item.val * ep(progress, 0.35, 0.35)}%`,
                  background: item.color,
                  borderRadius: 4,
                  boxShadow: `0 0 10px ${item.color}80`,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div style={{
        opacity: ep(progress, 0.55),
        transform: `translateY(${(1 - ep(progress, 0.55)) * 16}px)`,
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
