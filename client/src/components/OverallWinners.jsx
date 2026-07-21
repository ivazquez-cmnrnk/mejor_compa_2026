export default function OverallWinners({ rankings, candidates }) {
  const winnerMap = {};

  Object.entries(rankings).forEach(([cat, podium]) => {
    const topThree = podium.slice(0, 3);
    topThree.forEach((item, index) => {
      if (!winnerMap[item.nombre]) {
        const candidate = candidates.find(c => c.nombre_completo === item.nombre);
        // Sometimes names might have extra spaces or capitalization issues, but assuming they match exactly.
        winnerMap[item.nombre] = {
          nombre: item.nombre,
          imagen: candidate?.imagen || '/default-avatar.png',
          wins: [],
          score: 0
        };
      }
      winnerMap[item.nombre].wins.push({ categoria: cat, puesto: index + 1, votos: item.votos });
      winnerMap[item.nombre].score += (3 - index);
    });
  });

  const winners = Object.values(winnerMap).sort((a, b) => b.score - a.score);
  
  // Sort wins for each winner by position (1 to 3) ascending, then by votes descending
  winners.forEach(w => {
    w.wins.sort((a, b) => {
      if (a.puesto !== b.puesto) return a.puesto - b.puesto;
      return b.votos - a.votos;
    });
  });

  if (winners.length === 0) return null;

  return (
    <div className="overall-winners-section">
      <h2 className="section-title">🌟 Ganadores Generales</h2>
      <div className="winners-grid">
        {winners.map(w => (
          <div key={w.nombre} className="winner-card">
            {w.imagen ? (
              <img src={w.imagen} alt={w.nombre} className="winner-photo" />
            ) : (
              <div className="winner-photo-placeholder">👤</div>
            )}
            <h3 className="winner-name">{w.nombre}</h3>
            <div className="winner-wins">
              {w.wins.map((win, idx) => (
                <div key={idx} className="win-badge">
                  <span className={`win-pos pos-${win.puesto}`}>
                    {win.puesto === 1 ? '🥇' : win.puesto === 2 ? '🥈' : '🥉'}
                  </span>
                  <span className="win-cat">
                    {win.categoria} <span className="win-votes">({win.votos} voto{win.votos !== 1 ? 's' : ''})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
