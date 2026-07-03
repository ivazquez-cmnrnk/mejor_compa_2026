const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

function read() {
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

function write(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

function userHasVoted(idFlxCore03) {
  const db = read();
  return db.votantes.some(v => v.idFlxCore03 === idFlxCore03);
}

function addVotante(idFlxCore03, flxCore03Nombre) {
  const db = read();
  db.votantes.push({ idFlxCore03, flxCore03Nombre });
  write(db);
}

function addVotos(votosMap) {
  const db = read();
  for (const [categoria, nombreVotado] of Object.entries(votosMap)) {
    if (!db.votos[categoria]) {
      db.votos[categoria] = [];
    }
    db.votos[categoria].push(nombreVotado);
  }
  write(db);
}

function getCandidatosCache() {
  const db = read();
  return db.candidatos;
}

function setCandidatosCache(candidatos) {
  const db = read();
  db.candidatos = candidatos;
  write(db);
}

function getRankings() {
  const db = read();
  const rankings = {};
  for (const [categoria, votos] of Object.entries(db.votos)) {
    const counts = {};
    for (const name of votos) {
      counts[name] = (counts[name] || 0) + 1;
    }
    const sorted = Object.entries(counts)
      .map(([nombre, votos]) => ({ nombre, votos }))
      .sort((a, b) => b.votos - a.votos)
      .slice(0, 3);
    rankings[categoria] = sorted;
  }
  return rankings;
}

module.exports = {
  read, write, userHasVoted, addVotante, addVotos,
  getCandidatosCache, setCandidatosCache, getRankings
};
