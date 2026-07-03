const MEDALS = ['🥇', '🥈', '🥉'];
const CLASSES = ['gold', 'silver', 'bronze'];

export default function CategoryCard({ categoria, podium }) {
  return (
    <div className="category-card">
      <h3>{categoria}</h3>
      {podium.length === 0 ? (
        <div className="no-votes">Sin votos aún</div>
      ) : (
        <div className="podium">
          {podium.map((item, i) => (
            <div key={i} className={`podium-item ${CLASSES[i] || ''}`}>
              <span className="podium-medal">{MEDALS[i] || ''}</span>
              <span className="podium-name">{item.nombre}</span>
              <span className="podium-votes">{item.votos} voto{item.votos !== 1 ? 's' : ''}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
