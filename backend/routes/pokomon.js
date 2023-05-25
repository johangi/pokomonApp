const express = require('express');
const requireAuth = require('../middleware/requireAuth')
const { getPokomons, createPokomon, deletePokomon, updatePokomon } = require('../controllers/pokomonController');

const router = express.Router();
router.use(requireAuth);

router.post('/:username', getPokomons);

router.post('/create', createPokomon);

router.delete('/delete/:id', deletePokomon);

router.put('/update', updatePokomon);

module.exports = router;