const path = require('path');
const router = require('express').Router();

router.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

router.use('/api', require('./api'));

router.get('/app', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'layout.html'));
});

router.get('*', (req, res) => {
  res.redirect('/app');
});

module.exports = router;
