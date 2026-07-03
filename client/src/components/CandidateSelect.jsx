import { useState, useRef, useEffect } from 'react';

export default function CandidateSelect({ candidatos, value, onChange, categoria }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);
  const inputRef = useRef(null);
  const selected = candidatos.find(c => c.id_sysadmi01 === value);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (open) {
      setSearch('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = candidatos.filter(c =>
    c.nombre_completo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="candidate-select">
      <span className="cat-label">{categoria}</span>
      <div className="select-wrapper" ref={ref}>
        <button
          type="button"
          className="custom-select-btn"
          onClick={() => setOpen(!open)}
        >
          {selected ? (
            <>
              <img src={selected.imagen} alt="" className="candidate-thumb" />
              <span>{selected.nombre_completo}</span>
            </>
          ) : (
            <span className="placeholder">— Seleccionar —</span>
          )}
          <span className="arrow">{open ? '▲' : '▼'}</span>
        </button>
        {open && (
          <div className="custom-select-dropdown">
            <div className="search-sticky">
              <input
                ref={inputRef}
                type="text"
                className="search-input"
                placeholder="🔍 Buscar persona..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="dropdown-options">
              {filtered.length === 0 ? (
                <div className="dropdown-empty">Sin resultados</div>
              ) : (
                filtered.map(c => (
                  <div
                    key={c.id_sysadmi01}
                    className={`custom-select-option ${value === c.id_sysadmi01 ? 'selected' : ''}`}
                    onClick={() => { onChange(c.id_sysadmi01); setOpen(false); }}
                  >
                    <img src={c.imagen} alt="" className="candidate-thumb" />
                    <span>{c.nombre_completo}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
