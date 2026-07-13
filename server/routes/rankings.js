const { Router } = require('express');
const db = require('../services/supabase');

const router = Router();

router.get('/rankings', async (req, res) => {
  const rankings = await db.getRankings();
  res.json(rankings);
});

module.exports = router;
