const express = require('express');
// const requireAuth = require('../middleware/requireAuth');
const { getAllPokomons, getPokomons, createPokomon, deletePokomon } = require('../controllers/pokomonController');

const router = express.Router();

router.get('/', getAllPokomons);

// router.use(requireAuth);

router.get('/:username', getPokomons);

router.post('/create', createPokomon);

router.delete('/delete/:id', deletePokomon)

module.exports = router;