const { Router } = require('express');

const {
  createPatternCode,
  deletePatternCode
} = require('../controllers/Pattern_codes');

const {
  getPatternByCode,
  createPattern,
  allPatterns,
  deletePattern
} = require('../controllers/Patterns');

const { Signin, Signup } = require('../controllers/Auth');
const passport = require('passport');
require('../../config/passport')(passport);

const router = Router();

router.get('/', (req, res) => res.send('Welcome MAFE'));

router.post('/signin', Signin);
router.post('/signup', Signup);

router.get('/pattern/:code', getPatternByCode);

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

router.post(
  '/destroy_pattern',
  passport.authenticate('jwt', { session: false }),
  deletePattern
);

router.post(
  '/pattern_code',
  passport.authenticate('jwt', { session: false }),
  createPatternCode
);

router.post(
  '/destroy_pattern_code',
  passport.authenticate('jwt', { session: false }),
  deletePatternCode
);

module.exports = router;
