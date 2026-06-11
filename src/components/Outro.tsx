import { profile } from "../motionData";

export default function Outro({ progress }: { progress: number }) {
  const p = Math.min(progress / 0.4, 1);

  return (
    <div style={{
      position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 16,
    }}>
      <div style={{
        opacity: p,
        transform: `scale(${0.8 + p * 0.2})`,
        textAlign: "center",
      }}>
        <div style={{ fontSize: 52, fontWeight: 900, color: "#fff", letterSpacing: -1 }}>
          Let's <span style={{ color: "#1e90ff" }}>Connect</span>
        </div>
        <div style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginTop: 12, letterSpacing: 2 }}>
          {profile.name} · {profile.title}
        </div>
      </div>

      <div style={{
        marginTop: 24,
        opacity: Math.min((progress - 0.3) / 0.3, 1),
        display: "flex", gap: 16,
      }}>
        {["Portfolio", "LinkedIn", "Email"].map((label) => (
          <div key={label} style={{
            padding: "10px 24px",
            border: "1px solid rgba(30,144,255,0.5)",
            borderRadius: 100,
            fontSize: 13,
            color: "#1e90ff",
            letterSpacing: 1,
          }}>
            {label}
          </div>
        ))}
      </div>

      {/* Pulsing ring */}
      <div style={{
        position: "absolute",
        width: 300, height: 300,
        borderRadius: "50%",
        border: "1px solid rgba(30,144,255,0.15)",
        animation: "pulse 2s ease-in-out infinite",
        pointerEvents: "none",
      }} />
    </div>
  );
}
