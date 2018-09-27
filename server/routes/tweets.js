const router = require('express').Router();
const { create,remove,update,findAll,findOne,search } = require('../controllers/tweetController');
const { auth } = require('../middlewares/auth');

router.post('/',auth, create);
router.get('/', findAll);
router.delete('/:id',auth, remove);
router.put('/:id',auth, update);
router.get('/:id', findOne);
router.post('/search', search);

module.exports = router;