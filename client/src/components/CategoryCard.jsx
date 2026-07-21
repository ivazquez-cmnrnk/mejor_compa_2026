import { useState } from 'react';

const MEDALS = ['🥇', '🥈', '🥉'];
const CLASSES = ['gold', 'silver', 'bronze'];

export default function CategoryCard({ categoria, podium }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const topThree = podium.slice(0, 3);

  return (
    <>
      <div className="category-card" onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }}>
        <h3>{categoria}</h3>
        {topThree.length === 0 ? (
          <div className="no-votes">Sin votos aún</div>
        ) : (
          <div className="podium">
            {topThree.map((item, i) => (
              <div key={i} className={`podium-item ${CLASSES[i] || ''}`}>
                <span className="podium-medal">{MEDALS[i] || ''}</span>
                <span className="podium-name">{item.nombre}</span>
                <span className="podium-votes">{item.votos} voto{item.votos !== 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            <h3>{categoria}</h3>
            <div className="modal-list">
              {podium.map((item, i) => (
                <div key={i} className={`podium-item ${i < 3 ? CLASSES[i] : ''}`}>
                  <span className="podium-medal">{i < 3 ? MEDALS[i] : `#${i + 1}`}</span>
                  <span className="podium-name">{item.nombre}</span>
                  <span className="podium-votes">{item.votos} voto{item.votos !== 1 ? 's' : ''}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
