const { Router } = require('express');
const sievert = require('../services/sievert');
const db = require('../services/db');

const router = Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Faltan usuario o contraseña' });
  }

  try {
    const data = await sievert.getUserAccess(username, password);

    if (data.resultid !== 'success') {
      return res.status(401).json({ error: data.resulttext || 'Credenciales incorrectas' });
    }

    const user = data.user;
    const voted = db.userHasVoted(String(user.idFlxCore03));

    res.json({ voted, user });
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(401).json({ error: 'Usuario o Contraseña incorrectos.' });
    }
    console.error('Error en login:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
