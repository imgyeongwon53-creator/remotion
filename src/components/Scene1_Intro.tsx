import { Img, staticFile } from "remotion";
import HufsLogo from "./HufsLogo";

function ease(p: number) { return 1 - Math.pow(1 - Math.min(p, 1), 3); }

export default function Scene1_Intro({ progress }: { progress: number }) {
  const fadeSlide = (delay: number, duration = 0.18) => {
    const p = ease(Math.max(0, (progress - delay) / duration));
    return { opacity: p, transform: `translateY(${(1 - p) * 28}px)` };
  };

  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 0,
    }}>
      {/* Photo */}
      <div style={{
        ...fadeSlide(0),
        width: 130, height: 130,
        borderRadius: "50%",
        overflow: "hidden",
        border: "3px solid rgba(100,160,255,0.5)",
        boxShadow: "0 0 40px rgba(80,140,255,0.35)",
        marginBottom: 20,
        flexShrink: 0,
      }}>
        <Img
          src={staticFile("photo.jpg")}
          alt="임경원"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
        />
      </div>

      {/* Name */}
      <div style={{ ...fadeSlide(0.1), textAlign: "center", marginBottom: 6 }}>
        <div style={{ fontSize: 46, fontWeight: 900, color: "#fff", letterSpacing: -1 }}>임경원</div>
        <div style={{ fontSize: 18, fontWeight: 500, color: "rgba(170,200,255,0.6)", letterSpacing: 4, marginTop: 4 }}>林敬圆</div>
      </div>

      {/* Divider */}
      <div style={{
        ...fadeSlide(0.2),
        width: 160, height: 2,
        background: "linear-gradient(90deg, transparent, #5090ff, transparent)",
        margin: "10px 0",
      }} />

      {/* University + Logo */}
      <div style={{ ...fadeSlide(0.25), display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <HufsLogo size={32} />
        <span style={{ fontSize: 17, color: "#8ab4ff", fontWeight: 700 }}>한국외국어대학교</span>
      </div>

      {/* Major + grade */}
      <div style={{ ...fadeSlide(0.32), display: "flex", gap: 10, marginTop: 4 }}>
        <span style={{
          padding: "4px 14px", borderRadius: 20,
          background: "rgba(80,144,255,0.18)", border: "1px solid rgba(80,144,255,0.35)",
          fontSize: 13, color: "#aac8ff",
        }}>차이나데이터큐레이션</span>
        <span style={{
          padding: "4px 14px", borderRadius: 20,
          background: "rgba(80,144,255,0.18)", border: "1px solid rgba(80,144,255,0.35)",
          fontSize: 13, color: "#aac8ff",
        }}>25학번</span>
      </div>
    </div>
  );
}
