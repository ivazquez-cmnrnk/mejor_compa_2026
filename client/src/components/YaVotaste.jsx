import { Link, useLocation } from 'react-router-dom';

export default function YaVotaste() {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div className="auth-page">
      <div className="auth-card ya-votaste">
        <div className="icon">⛔</div>
        <h2>YA VOTASTE</h2>
        {user && <p>Ya registramos tu voto, {user.flxCore03Nombre}.</p>}
        <p>Gracias por participar 🙌</p>
        <Link to="/" className="votar-btn" style={{ textDecoration: 'none' }}>
          Ver rankings
        </Link>
      </div>
    </div>
  );
}
