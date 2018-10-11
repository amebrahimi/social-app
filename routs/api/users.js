const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

// @rout    Get api/users/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Users works"}));


// @rout    Post api/users/register
// @desc    Register users route
// @access  Public
router.post('/register', (req, res) => {
    // Check validation
    const {errors, isValid} = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const {email, name, password} = req.body;
    User.findOne({email: email})
        .then(user => {
            if (user) {
                errors.email = 'Email already Exists';
                return res.status(400).json(errors);
            } else {
                const avatar = gravatar.url(email, {
                    s: '200', // size
                    r: 'pg',
                    d: 'mm' // Default
                });

                const newUser = new User({
                    name: name,
                    email: email,
                    avatar,
                    password: password
                });


                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });

            }
        });
});


// @rout    Post api/users/login
// @desc    Login User / Returning token
// @access  Public
router.post('/login', (req, res) => {
    // Check validation
    const {errors, isValid} = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({email})
        .then(user => {
            // Check for user
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
            // Check Password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User Matched

                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }; // Create jwt payload

                        // Sign Token
                        jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            });
                    } else {
                        errors.password = ' Password incorrect';
                        return res.status(400).json(errors);
                    }
                });
        });
});

// @rout    Get api/users/current
// @desc    Return current user
// @access  Private

router.get('/current', passport.authenticate('jwt', {session: false}, null), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;