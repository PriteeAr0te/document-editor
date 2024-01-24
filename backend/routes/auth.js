const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const validateRegister = [
    body('username', 'Username is required').not().isEmpty(),
    body('lastname', 'Lastname is required').not().isEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
];
const jwtSecret = 'YouarepreetY';

router.post('/register', validateRegister, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, lastname, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ error: "User already exists", field: "email" });
        }

        user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "Username has already been registered" });
        }


        user = await User.create({ username, lastname, email, password });
        const data = {
            user: {
                id: user.id,
            }
        }

        const authtoken = jwt.sign(data, jwtSecret);
        console.log("token", authtoken);
        if (user) {
          res.status(200).json({ success: "User Registered Successfully", authtoken });
        } else {
          throw new Error("User creation failed");
        }
        
        if (!user) {
            throw new Error("User creation failed");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Login route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log(info.message);
            return res.status(401).json({ error: "Login Failed" });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            const data = {
                user: {
                    id: user.id,
                }
            };
            const authtoken = jwt.sign(data, jwtSecret);
            res.status(200).json({ success: "Login Successful", authtoken });
        });
    })(req, res, next);
});



router.get('/session', (req, res) => {
    if (req.isAuthenticated()) {
        req.session.test ? req.session.test++ : req.session.test = 1;
        res.send(req.session.test.toString() + " " + req.user.username + " " + req.user.lastname);
        // console.log(req.session.test.toString());
    } else {
        res.status(400).json({ error: "Unauthorized" });
    }
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json({ success: "Logout Successful" });
});


module.exports = router;
