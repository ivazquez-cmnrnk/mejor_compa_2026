const { Router } = require('express');
const db = require('../services/db');

const router = Router();

router.get('/rankings', (req, res) => {
  const rankings = db.getRankings();
  res.json(rankings);
});

module.exports = router;
