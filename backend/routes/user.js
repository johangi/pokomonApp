const express = require('express');

// controller functions
const { loginUser, signupUser } = require('../controllers/userController');
const { getAllPokomons } = require('../controllers/pokomonController');

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// getAll for pokomons
router.get('/', getAllPokomons);

module.exports = router;