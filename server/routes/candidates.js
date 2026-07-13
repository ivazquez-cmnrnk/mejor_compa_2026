const { Router } = require('express');
const sievert = require('../services/sievert');
const db = require('../services/supabase');

const router = Router();

router.get('/candidates', async (req, res) => {
  try {
    const candidatos = await sievert.getCandidatos();
    await db.setCandidatosCache(candidatos);
    res.json(candidatos);
  } catch (err) {
    console.error('Error obteniendo candidatos:', err.message);
    const cached = await db.getCandidatosCache();
    if (cached && cached.length > 0) {
      return res.json(cached);
    }
    res.status(500).json({ error: 'Error al obtener lista de personal' });
  }
});

module.exports = router;
