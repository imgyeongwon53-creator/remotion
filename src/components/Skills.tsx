import { useAnimatedValue } from "../useAnimatedValue";
import { skills } from "../motionData";

function SkillBar({ label, value, index }: { label: string; value: number; index: number }) {
  const animVal = useAnimatedValue(value, 1000, index * 150);

  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>{label}</span>
        <span style={{ color: "#1e90ff", fontSize: 14, fontWeight: 700 }}>{animVal}%</span>
      </div>
      <div style={{ height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${animVal}%`,
          background: "linear-gradient(90deg, #1e90ff, #00c8ff)",
          borderRadius: 4,
          boxShadow: "0 0 10px rgba(30,144,255,0.6)",
          transition: "none",
        }} />
      </div>
    </div>
  );
}

export default function Skills({ progress }: { progress: number }) {
  const fade = {
    opacity: Math.min(progress / 0.2, 1),
    transform: `translateY(${Math.max(0, (1 - progress / 0.2) * 20)}px)`,
  };

  return (
    <div style={{
      position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "0 80px",
    }}>
      <div style={{ ...fade, marginBottom: 32 }}>
        <div style={{ fontSize: 11, color: "#1e90ff", letterSpacing: 4, marginBottom: 8, textTransform: "uppercase" }}>
          Skills & Expertise
        </div>
        <div style={{ fontSize: 36, fontWeight: 800, color: "#fff" }}>핵심 역량</div>
      </div>

      <div style={{ opacity: Math.min((progress - 0.1) / 0.2, 1) }}>
        {skills.map((s, i) => (
          <SkillBar key={s.label} label={s.label} value={s.value} index={i} />
        ))}
      </div>
    </div>
  );
}
