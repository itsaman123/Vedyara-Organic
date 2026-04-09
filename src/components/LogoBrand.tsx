import { useState } from "react";

interface LogoBrandProps {
  /** "dark" = logo on a light/cream background (default, no filter)
   *  "light" = logo on a dark background (inverted to white) */
  variant?: "dark" | "light";
  /** Rendered height in px */
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

/** Inline SVG fallback – lotus icon + wordmark.
 *  Shown while the PNG hasn't loaded or when it fails. */
function LogoSVGFallback({
  height,
  variant,
}: {
  height: number;
  variant: "dark" | "light";
}) {
  const textColor = variant === "light" ? "#FFFFFF" : "#2E5010";
  const leafColor = variant === "light" ? "#FFFFFF" : "#3B6318";
  const goldColor = variant === "light" ? "rgba(255,255,255,0.85)" : "#C9A227";

  // Scale factor so the SVG fits the requested height
  const vbH = 230;
  const vbW = 420;
  const width = (height / vbH) * vbW;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${vbW} ${vbH}`}
      width={width}
      height={height}
      aria-label="Vedyara Organic"
      role="img"
    >
      {/* ── Gradients (only used in "dark" variant) ── */}
      <defs>
        <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={variant === "dark" ? "#4A7A28" : "#fff"} />
          <stop offset="100%" stopColor={variant === "dark" ? "#2E5010" : "#fff"} />
        </linearGradient>
        <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={variant === "dark" ? "#3D6820" : "#fff"} />
          <stop offset="100%" stopColor={variant === "dark" ? "#264510" : "#fff"} />
        </linearGradient>
      </defs>

      {/* ── Lotus leaves ── */}
      {/* far-left */}
      <ellipse cx="210" cy="95" rx="11" ry="34"
        fill={variant === "dark" ? "url(#lg2)" : leafColor}
        transform="rotate(-62 210 95) translate(-52 4)" />
      {/* mid-left */}
      <ellipse cx="210" cy="95" rx="12" ry="36"
        fill={variant === "dark" ? "url(#lg2)" : leafColor}
        transform="rotate(-38 210 95) translate(-28 0)" />
      {/* inner-left */}
      <ellipse cx="210" cy="95" rx="13" ry="38"
        fill={variant === "dark" ? "url(#lg1)" : leafColor}
        transform="rotate(-18 210 95) translate(-12 -2)" />
      {/* centre */}
      <ellipse cx="210" cy="80" rx="13" ry="42"
        fill={variant === "dark" ? "url(#lg1)" : leafColor} />
      {/* inner-right */}
      <ellipse cx="210" cy="95" rx="13" ry="38"
        fill={variant === "dark" ? "url(#lg1)" : leafColor}
        transform="rotate(18 210 95) translate(12 -2)" />
      {/* mid-right */}
      <ellipse cx="210" cy="95" rx="12" ry="36"
        fill={variant === "dark" ? "url(#lg2)" : leafColor}
        transform="rotate(38 210 95) translate(28 0)" />
      {/* far-right */}
      <ellipse cx="210" cy="95" rx="11" ry="34"
        fill={variant === "dark" ? "url(#lg2)" : leafColor}
        transform="rotate(62 210 95) translate(52 4)" />

      {/* ── Golden sun disc ── */}
      <circle cx="210" cy="52" r="15" fill={goldColor} />

      {/* ── Sun rays ── */}
      <g stroke={goldColor} strokeWidth="2.2" strokeLinecap="round">
        <line x1="210" y1="32" x2="210" y2="24" />
        <line x1="222" y1="36" x2="228" y2="30" />
        <line x1="228" y1="49" x2="237" y2="47" />
        <line x1="198" y1="36" x2="192" y2="30" />
        <line x1="192" y1="49" x2="183" y2="47" />
        <line x1="225" y1="62" x2="232" y2="67" />
        <line x1="195" y1="62" x2="188" y2="67" />
      </g>

      {/* ── "Vedyara" italic serif text ── */}
      <text
        x="210" y="162"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="68"
        fontWeight="bold"
        fontStyle="italic"
        fill={textColor}
        letterSpacing="2"
      >
        Vedyara
      </text>

      {/* ── "ORGANIC" label ── */}
      <text
        x="210" y="188"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="19"
        fontWeight="600"
        fill={textColor}
        letterSpacing="7"
      >
        ORGANIC
      </text>

      {/* ── Decorative gold lines ── */}
      <line x1="62"  y1="181" x2="128" y2="181" stroke={goldColor} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="292" y1="181" x2="358" y2="181" stroke={goldColor} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** ─────────────────────────────────────────────────────────────
 *  LogoBrand
 *
 *  Tries to load  /vedyara-logo.png  (place your actual logo PNG
 *  in the  public/  folder with that exact name).
 *  Falls back to the inline SVG approximation automatically.
 * ──────────────────────────────────────────────────────────── */
export default function LogoBrand({
  variant = "dark",
  height = 44,
  className = "",
  style = {},
}: LogoBrandProps) {
  const [pngFailed, setPngFailed] = useState(false);

  /* CSS filter applied to the PNG on dark backgrounds */
  const darkFilter =
    "brightness(0) invert(1)";

  /* Aspect-ratio: the logo SVG viewBox is 420 × 230 */
  const pngWidth = Math.round((height / 230) * 420);

  if (pngFailed) {
    return (
      <LogoSVGFallback height={height} variant={variant} />
    );
  }

  return (
    <img
      src="/vedyara-logo.webp"
      alt="Vedyara Organic"
      width={pngWidth}
      height={height}
      className={className}
      style={{
        height: `${height}px`,
        width: "auto",
        objectFit: "contain",
        filter: variant === "light" ? darkFilter : "none",
        display: "block",
        ...style,
      }}
      onError={() => setPngFailed(true)}
      draggable={false}
    />
  );
}
