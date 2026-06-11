import HufsLogo from "./HufsLogo";

function ease(p: number) { return 1 - Math.pow(1 - Math.min(p, 1), 3); }

export default function Scene5_Outro({ progress }: { progress: number }) {
  const scaleIn = ease(Math.min(progress / 0.4, 1));
  const ring1 = ease(Math.max(0, (progress - 0.2) / 0.4));
  const textP = ease(Math.max(0, (progress - 0.35) / 0.3));

  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 16,
    }}>
      {/* Rings */}
      {[280, 220, 160].map((size, i) => (
        <div key={size} style={{
          position: "absolute",
          width: size, height: size,
          borderRadius: "50%",
          border: "1px solid rgba(80,144,255,0.15)",
          opacity: ring1 * (1 - i * 0.25),
          transform: `scale(${0.6 + ring1 * 0.4})`,
        }} />
      ))}

      {/* Logo */}
      <div style={{
        opacity: scaleIn,
        transform: `scale(${0.5 + scaleIn * 0.5})`,
        marginBottom: 8,
      }}>
        <HufsLogo size={90} color="#8ab4ff" />
      </div>

      {/* Text */}
      <div style={{
        opacity: textP,
        transform: `translateY(${(1 - textP) * 20}px)`,
        textAlign: "center",
      }}>
        <div style={{ fontSize: 28, fontWeight: 900, color: "#fff", marginBottom: 6 }}>
          한국외국어대학교
        </div>
        <div style={{ fontSize: 16, color: "#8ab4ff", letterSpacing: 1, marginBottom: 16 }}>
          차이나데이터큐레이션 · 25학번 임경원
        </div>
        <div style={{
          fontSize: 13, color: "rgba(255,255,255,0.4)",
          lineHeight: 1.7, letterSpacing: 0.5,
        }}>
          AI 미디어 큐레이션 수업으로 한 걸음 더 성장했습니다.<br />
          데이터로 세상을 큐레이팅할 임경원입니다 🌏
        </div>
      </div>
    </div>
  );
}
