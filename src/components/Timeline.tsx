import { timeline } from "../motionData";

export default function Timeline({ progress }: { progress: number }) {
  return (
    <div style={{
      position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "0 80px",
    }}>
      <div style={{
        opacity: Math.min(progress / 0.2, 1),
        transform: `translateY(${Math.max(0, (1 - progress / 0.2) * 20)}px)`,
        marginBottom: 40,
      }}>
        <div style={{ fontSize: 11, color: "#1e90ff", letterSpacing: 4, marginBottom: 8, textTransform: "uppercase" }}>Career</div>
        <div style={{ fontSize: 36, fontWeight: 800, color: "#fff" }}>커리어 타임라인</div>
      </div>

      <div style={{ position: "relative" }}>
        {/* vertical line */}
        <div style={{
          position: "absolute", left: 56, top: 0,
          width: 2,
          height: `${Math.min((progress - 0.1) / 0.5 * 100, 100)}%`,
          background: "linear-gradient(180deg, #1e90ff, transparent)",
        }} />

        {timeline.map((item, i) => {
          const delay = 0.15 + i * 0.15;
          const p = Math.max(0, Math.min((progress - delay) / 0.2, 1));
          return (
            <div key={item.year} style={{
              display: "flex", alignItems: "center", gap: 32, marginBottom: 32,
              opacity: p, transform: `translateX(${(1 - p) * -20}px)`,
            }}>
              <div style={{
                width: 56, textAlign: "right",
                fontSize: 13, fontWeight: 700, color: "#1e90ff",
              }}>
                {item.year}
              </div>
              <div style={{
                width: 12, height: 12, borderRadius: "50%",
                background: "#1e90ff",
                boxShadow: "0 0 12px rgba(30,144,255,0.8)",
                flexShrink: 0,
              }} />
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{item.role}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{item.company}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
