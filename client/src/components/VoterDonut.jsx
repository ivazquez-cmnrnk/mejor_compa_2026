const R = 42;
const C = 2 * Math.PI * R;

export default function VoterDonut({ porcentaje, votaron, total }) {
  const offset = C - (porcentaje / 100) * C;

  return (
    <div className="voter-donut">
      <svg viewBox="0 0 120 130" className="voter-donut-svg">
        <circle
          cx="60" cy="60" r={R}
          fill="none"
          stroke="var(--color-surface)"
          strokeWidth="10"
        />
        {porcentaje > 0 && (
          <circle
            cx="60" cy="60" r={R}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="10"
            strokeDasharray={C}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
            className="voter-donut-arc"
          />
        )}
        <text x="60" y="56" textAnchor="middle" className="voter-donut-pct">
          {porcentaje}%
        </text>
        <text x="60" y="70" textAnchor="middle" className="voter-donut-label">
          vot{porcentaje !== 1 ? 'aron' : 'ó'}
        </text>
      </svg>
      <div className="voter-donut-count">
        {votaron} de {total} votantes
      </div>
    </div>
  );
}
