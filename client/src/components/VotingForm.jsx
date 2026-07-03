import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import CandidateSelect from './CandidateSelect';

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

export default function VotingForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  const [candidatos, setCandidatos] = useState([]);
  const [votos, setVotos] = useState({});
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetch('/api/candidates')
      .then(res => res.json())
      .then(data => setCandidatos(data))
      .catch(() => setError('Error al cargar la lista de personal'));
  }, [user, navigate]);

  function handleSelect(categoria, candidateId) {
    setVotos(prev => ({ ...prev, [categoria]: candidateId }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const missing = CATEGORIES.filter(cat => !votos[cat]);
    if (missing.length > 0) {
      setError(`Faltan seleccionar: ${missing.join(', ')}`);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.idFlxCore03,
          userName: user.flxCore03Nombre,
          votos
        })
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          navigate('/ya-votaste', { state: { user } });
          return;
        }
        setError(data.error || 'Error al registrar voto');
        return;
      }

      navigate('/');
    } catch {
      setError('Error de conexión con el servidor');
    } finally {
      setSubmitting(false);
    }
  }

  if (!user) return null;

  return (
    <div className="voting-page">
      <h2>🗳️ Votación</h2>
      <p className="sub">
        {user.flxCore03Nombre} — Seleccioná un compañero por categoría
      </p>

      <form onSubmit={handleSubmit}>
        <div className="voting-grid">
          {CATEGORIES.map(cat => (
            <CandidateSelect
              key={cat}
              categoria={cat}
              candidatos={candidatos}
              value={votos[cat]}
              onChange={id => handleSelect(cat, id)}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button type="submit" className="submit-btn" disabled={submitting} style={{ maxWidth: 400 }}>
            {submitting ? 'Enviando...' : 'Enviar votos'}
          </button>
        </div>

        {error && <p className="error-msg">{error}</p>}
      </form>

      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Link to="/" className="back-link">← Volver</Link>
      </div>
    </div>
  );
}
