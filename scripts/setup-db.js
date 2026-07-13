const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const QUERIES = [
  `CREATE TABLE IF NOT EXISTS candidatos (
    id_sysadmi01 TEXT PRIMARY KEY,
    nombre_completo TEXT NOT NULL,
    imagen TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS votantes (
    id_flx_core03 TEXT PRIMARY KEY,
    flx_core03_nombre TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS votos (
    id SERIAL PRIMARY KEY,
    categoria TEXT NOT NULL,
    nombre_votado TEXT NOT NULL,
    voter_id TEXT REFERENCES votantes(id_flx_core03),
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS idx_votos_categoria ON votos(categoria)`
];

async function setup() {
  console.log('Conectando a la base de datos...');
  const client = await pool.connect();
  try {
    for (const sql of QUERIES) {
      await client.query(sql);
    }
    console.log('Tablas verificadas/creadas correctamente.');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

setup();
