const { Router } = require('express');
const db = require('../services/db');

const router = Router();

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

router.post('/vote', (req, res) => {
  const { userId, userName, votos } = req.body;

  if (!userId || !userName || !votos) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  if (db.userHasVoted(String(userId))) {
    return res.status(409).json({ error: 'YA VOTASTE' });
  }

  const candidatos = db.getCandidatosCache();
  const candidatosMap = {};
  for (const c of candidatos) {
    candidatosMap[c.id_sysadmi01] = c.nombre_completo;
  }

  const missingCategories = [];
  for (const cat of CATEGORIES) {
    if (!votos[cat]) {
      missingCategories.push(cat);
    }
  }
  if (missingCategories.length > 0) {
    return res.status(400).json({ error: 'Faltan categorías: ' + missingCategories.join(', ') });
  }

  const votosNombres = {};
  for (const [cat, candidateId] of Object.entries(votos)) {
    const nombre = candidatosMap[String(candidateId)];
    if (!nombre) {
      return res.status(400).json({ error: `Candidato inválido para "${cat}"` });
    }
    votosNombres[cat] = nombre;
  }

  db.addVotante(String(userId), userName);
  db.addVotos(votosNombres);

  res.json({ success: true });
});

module.exports = router;
