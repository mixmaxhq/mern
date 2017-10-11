const path = require('path');
const router = require('express').Router();

router.get('/api', (req, res) => {
  res.json({ message: 'hello world.' });
});

router.get('/app', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'layout.html'));
});

router.get('*', (req, res) => {
  res.redirect('/app');
});

module.exports = router;
