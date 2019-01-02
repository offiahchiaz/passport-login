const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// User model
const User = require('../models/user');

// Login Page
router.get('/login', (req, res) =>  res.render('login'));

// Signup Page
router.get('/signup', (req, res) => res.render('signup'));

// Signup POST
router.post('/signup', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // Check required fields
    if(!name || !email || !password || !password2) {
        errors.push({msg: 'Please fill in all fields'});
    }

    // Check passwords match
    if (password !== password2) {
        errors.push({msg: 'Passwords do not match'});
    }

    // Check password length
    if (password.length < 6) {
        errors.push({msg: 'Password should be at least 6 characters'});
    }

    if (errors.length > 0) {
        res.render('signup', { errors, name, email, password, password2 });
    } else {
        // Validation passed
        User.findOne({email: email})
            .then((user) => {
                if (user) {
                    // User exists
                    errors.push({msg: 'Email is already registered'});
                    res.render('signup', { errors, name, email, password, password2 });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    // Hash password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            // Set password to hashed
                            newUser.password = hash;
                            // Save user
                            newUser.save()
                                .then((user) => {
                                    console.log(user);
                                    req.flash('success_msg', 'you are now registered');
                                    res.redirect('/users/login');
                                })
                                .catch((e) => console.log(e));
                        });
                    });
                }
            });

    }
});

module.exports = router;