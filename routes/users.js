const express = require('express');

const router = express.Router();

// Login Page
router.get('/login', (req, res) => {
    res.send('Login');
});

// Signup Page
router.get('/signup', (req, res) => {
    res.send('Signup');
});


module.exports = router;