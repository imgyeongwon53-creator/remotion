import { profile } from "../motionData";

export default function Intro({ progress }: { progress: number }) {

  const fadeIn = (delay: number) => ({
    opacity: progress > delay ? Math.min((progress - delay) / 0.15, 1) : 0,
    transform: `translateY(${progress > delay ? Math.max(0, (1 - (progress - delay) / 0.15) * 30) : 30}px)`,
    transition: "none",
  });

  return (
    <div style={{
      position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 16,
    }}>
      {/* Logo circle */}
      <div style={{
        width: 90, height: 90, borderRadius: "50%",
        background: "linear-gradient(135deg, #1e90ff, #0050c8)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 36, fontWeight: 900, color: "#fff",
        boxShadow: "0 0 40px rgba(30,144,255,0.5)",
        ...fadeIn(0),
      }}>
        {profile.name[0]}
      </div>

      <div style={{ ...fadeIn(0.1), textAlign: "center" }}>
        <div style={{ fontSize: 44, fontWeight: 800, color: "#fff", letterSpacing: -1 }}>
          {profile.name}
        </div>
      </div>

      <div style={{
        ...fadeIn(0.2),
        fontSize: 18, color: "#1e90ff", fontWeight: 600, letterSpacing: 4, textTransform: "uppercase",
      }}>
        {profile.title}
      </div>

      <div style={{ ...fadeIn(0.3), fontSize: 14, color: "rgba(255,255,255,0.5)", letterSpacing: 2 }}>
        {profile.subtitle}
      </div>

      {/* Divider */}
      <div style={{
        ...fadeIn(0.35),
        width: `${Math.min((progress - 0.35) / 0.2 * 200, 200)}px`,
        height: 1, background: "linear-gradient(90deg, transparent, #1e90ff, transparent)",
        marginTop: 8,
      }} />

      <div style={{ ...fadeIn(0.4), fontSize: 16, color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}>
        "{profile.tagline}"
      </div>
    </div>
  );
}
