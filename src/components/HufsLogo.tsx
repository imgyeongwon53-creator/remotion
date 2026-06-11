export default function HufsLogo({ size = 80, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Globe circle */}
      <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="3" fill="none" opacity="0.9" />
      {/* Latitude lines */}
      <ellipse cx="50" cy="50" rx="44" ry="18" stroke={color} strokeWidth="2" fill="none" opacity="0.6" />
      <line x1="6" y1="50" x2="94" y2="50" stroke={color} strokeWidth="2" opacity="0.6" />
      {/* Longitude vertical */}
      <ellipse cx="50" cy="50" rx="22" ry="44" stroke={color} strokeWidth="2" fill="none" opacity="0.6" />
      {/* HUFS text */}
      <text
        x="50" y="57"
        textAnchor="middle"
        fill={color}
        fontSize="14"
        fontWeight="800"
        fontFamily="Arial, sans-serif"
        letterSpacing="1"
      >
        HUFS
      </text>
    </svg>
  );
}
