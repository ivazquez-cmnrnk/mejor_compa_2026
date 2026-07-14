const { Router } = require('express');
const db = require('../services/supabase');
const sievert = require('../services/sievert');

const router = Router();

router.get('/voter-stats', async (req, res) => {
  try {
    const candidatos = await sievert.getCandidatos();
    const stats = await db.getVoterStats(candidatos.length);
    res.json(stats);
  } catch (err) {
    console.error('Error obteniendo estadísticas:', err.message);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

module.exports = router;
