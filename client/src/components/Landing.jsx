import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import VoterDonut from './VoterDonut';

const CATEGORIES = [
  "El más Argel", "Alma de Jubilado", "El más Fachero/a",
  "El más Personaje", "El más Manija", "El más Chamuyero/a",
  "El que te hace la segunda", "El adicto al mate",
  "Al que siempre se pone la 10", "El más Paciente",
  "El más Detallista", "El Rey/Reina del Drama",
  "El más Resolutivo", "El más Fit", "El más Pichado",
  "El más Alegre", "El de la Risa contagiosa",
  "El del mejor peinado", "El mas pollera", "El mejor cocinero",
  "El mejor deportista", "El más Glotón", "El más descansero",
  "El mejor bailarín", "El más Ratón", "EL/la más gritón",
  "El más borrachin"
];

export default function Landing() {
  const [rankings, setRankings] = useState({});
  const [voterStats, setVoterStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/rankings').then(r => r.json()),
      fetch('/api/voter-stats').then(r => r.json())
    ])
      .then(([rankingsData, statsData]) => {
        setRankings(rankingsData);
        setVoterStats(statsData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="header">
        <h1>🏆 Mejor Compañero 2026</h1>
        <p>Votá a tus compañeros en cada categoría</p>
      </div>

      <div className="votar-btn-container">
        <Link to="/login" className="votar-btn">
          🗳️ Votar
        </Link>
      </div>

      {voterStats && (
        <VoterDonut
          porcentaje={voterStats.porcentaje}
          votaron={voterStats.votaron}
          total={voterStats.total}
        />
      )}

      {loading ? (
        <div className="loading">Cargando rankings...</div>
      ) : (
        <div className="categories-grid">
          {CATEGORIES.map(cat => (
            <CategoryCard
              key={cat}
              categoria={cat}
              podium={rankings[cat] || []}
            />
          ))}
        </div>
      )}
    </div>
  );
}
