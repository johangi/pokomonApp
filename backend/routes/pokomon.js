const express = require('express');
// const requireAuth = require('../middleware/requireAuth');
const { getAllPokomons, getPokomons, createPokomon } = require('../controllers/pokomonController');

const router = express.Router();

router.get('/', getAllPokomons);

// router.use(requireAuth);

router.get('/:username', getPokomons);

router.post('/create', createPokomon);

module.exports = router;