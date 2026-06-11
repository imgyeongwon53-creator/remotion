import { stats } from "../motionData";

export default function Stats({ progress }: { progress: number }) {
  return (
    <div style={{
      position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 40,
    }}>
      <div style={{
        opacity: Math.min(progress / 0.2, 1),
        transform: `translateY(${Math.max(0, (1 - progress / 0.2) * 20)}px)`,
        textAlign: "center",
      }}>
        <div style={{ fontSize: 11, color: "#1e90ff", letterSpacing: 4, marginBottom: 8, textTransform: "uppercase" }}>
          Numbers
        </div>
        <div style={{ fontSize: 36, fontWeight: 800, color: "#fff" }}>숫자로 보는 나</div>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, width: "100%", padding: "0 60px",
        opacity: Math.min((progress - 0.15) / 0.25, 1),
      }}>
        {stats.map((s, i) => {
          const delay = i * 0.08;
          const p = Math.max(0, Math.min((progress - 0.15 - delay) / 0.2, 1));
          return (
            <div key={s.label} style={{
              background: "rgba(30,144,255,0.08)",
              border: "1px solid rgba(30,144,255,0.3)",
              borderRadius: 16, padding: "28px 16px", textAlign: "center",
              opacity: p,
              transform: `translateY(${(1 - p) * 30}px)`,
              boxShadow: "0 0 30px rgba(30,144,255,0.1)",
            }}>
              <div style={{ fontSize: 42, fontWeight: 900, color: "#1e90ff", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 8, letterSpacing: 1 }}>{s.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
