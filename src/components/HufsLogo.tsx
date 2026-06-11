export default function HufsLogo({ size = 80 }: { size?: number; color?: string }) {
  return (
    <img
      src="/hufs-logo.png"
      alt="한국외국어대학교"
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
}
