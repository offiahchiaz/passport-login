const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
    res.send('Welcome to passport login tutorial');
});


module.exports = router;