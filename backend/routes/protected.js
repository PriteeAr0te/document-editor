const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const jwtSecret = 'YouarepreetY'; 

router.get('/protect', verifyToken, (req, res) => {
    res.status(200).json({ success: "User Authenticated", user: req.user });
});

function verifyToken(req, res, next) {
    // Get token from headers
    const token = req.headers.authtoken;
    console.log(token)

    // Check if token is present
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: Token not provided" });
    }

    // Verify token
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }

        // Attach the decoded user information to the request object for further use
        req.user = decoded.user;

        // Continue to the next middleware
        next();
    });
}

module.exports = router;
