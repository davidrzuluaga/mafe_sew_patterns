const { Router } = require('express');

const {
  getPattern,
  createPattern,
  allPatterns,
  updatePattern,
  deletePattern
} = require('../controllers/Patterns');

const { Signin, Signup } = require('../controllers/Auth');
const passport = require('passport');
require('../../config/passport')(passport);

const router = Router();

router.get('/', (req, res) => res.send('Welcome'));

router.post('/signin', Signin);
router.post('/signup', Signup);

router.get(
  '/pattern/:codeId',
  getPattern
);

router.get(
  '/patterns',
  passport.authenticate('jwt', { session: false }),
  allPatterns
);

router.post(
  '/pattern',
  passport.authenticate('jwt', { session: false }),
  createPattern
);

router.put(
  '/pattern',
  passport.authenticate('jwt', { session: false }),
  updatePattern
);

router.post(
  '/destroy_pattern',
  passport.authenticate('jwt', { session: false }),
  deletePattern
);

module.exports = router;
