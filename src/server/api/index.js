const router = require('express').Router();
const api = require('./api');

router.get('', api.list);
router.post('', api.create);
router.post('/send', api.send);
router.get('/:id', api.get);
router.put('/:id', api.update);
router.delete('/:id', api.remove);

module.exports = router;
