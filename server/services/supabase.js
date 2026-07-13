const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function userHasVoted(idFlxCore03) {
  const { rows } = await pool.query(
    'SELECT 1 FROM votantes WHERE id_flx_core03 = $1',
    [idFlxCore03]
  );
  return rows.length > 0;
}

async function addVotante(idFlxCore03, flxCore03Nombre) {
  await pool.query(
    'INSERT INTO votantes (id_flx_core03, flx_core03_nombre) VALUES ($1, $2) ON CONFLICT DO NOTHING',
    [idFlxCore03, flxCore03Nombre]
  );
}

async function addVotos(votosMap, voterId) {
  const values = Object.entries(votosMap).map(([categoria, nombreVotado]) =>
    `('${categoria.replace(/'/g, "''")}', '${nombreVotado.replace(/'/g, "''")}', '${voterId.replace(/'/g, "''")}')`
  );
  await pool.query(
    `INSERT INTO votos (categoria, nombre_votado, voter_id) VALUES ${values.join(', ')}`
  );
}

async function getCandidatosCache() {
  const { rows } = await pool.query('SELECT id_sysadmi01, nombre_completo, imagen FROM candidatos');
  return rows;
}

async function setCandidatosCache(candidatos) {
  const client = await pool.connect();
  try {
    await client.query('TRUNCATE candidatos');
    for (const c of candidatos) {
      await client.query(
        'INSERT INTO candidatos (id_sysadmi01, nombre_completo, imagen) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
        [c.id_sysadmi01, c.nombre_completo, c.imagen || null]
      );
    }
  } finally {
    client.release();
  }
}

async function getRankings() {
  const { rows } = await pool.query(
    `SELECT categoria, nombre_votado, COUNT(*)::int as votos
     FROM votos
     GROUP BY categoria, nombre_votado
     ORDER BY categoria, votos DESC`
  );
  const rankings = {};
  for (const row of rows) {
    if (!rankings[row.categoria]) rankings[row.categoria] = [];
    if (rankings[row.categoria].length < 3) {
      rankings[row.categoria].push({ nombre: row.nombre_votado, votos: row.votos });
    }
  }
  return rankings;
}

module.exports = {
  userHasVoted, addVotante, addVotos,
  getCandidatosCache, setCandidatosCache, getRankings
};
