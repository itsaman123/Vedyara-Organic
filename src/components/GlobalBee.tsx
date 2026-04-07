export default function GlobalBee() {
  return (
    <div className="bee-container">
      <div className="bee-body">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <ellipse cx="24" cy="24" rx="14" ry="10" fill="#F5D033" />

          <path d="M16 20h4v8h-4z" fill="#1A1A1A" />
          <path d="M24 19h4v10h-4z" fill="#1A1A1A" />
          <path d="M32 20h2v8h-2z" fill="#1A1A1A" />

          <ellipse
            cx="14"
            cy="18"
            rx="8"
            ry="5"
            fill="rgba(255,255,255,0.7)"
            stroke="rgba(200,200,200,0.5)"
            strokeWidth="0.5"
            className="bee-wing bee-wing-back"
          />

          <ellipse
            cx="14"
            cy="30"
            rx="8"
            ry="5"
            fill="rgba(255,255,255,0.9)"
            stroke="rgba(200,200,200,0.5)"
            strokeWidth="0.5"
            className="bee-wing bee-wing-front"
          />

          <circle cx="32" cy="22" r="2" fill="#1A1A1A" />
          <circle cx="36" cy="21" r="1.5" fill="white" opacity="0.6" />

          <path
            d="M34 18 Q36 14 35 11"
            stroke="#1A1A1A"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M36 18 Q38 14 37 11"
            stroke="#1A1A1A"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
