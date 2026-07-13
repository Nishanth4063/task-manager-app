const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secure_jwt_secret_key';

// ==========================================
// 1. REGISTER ROUTE (Secured with Bcrypt)
// ==========================================
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or Email is already registered.' });
        }

        // Generate a salt and hash the plain-text password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Store the cryptographically secured password string
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// 2. LOGIN ROUTE (Secured with Bcrypt & JWT)
// ==========================================
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Compare the incoming plain text password against the stored cryptographic hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: 'Authentication successful.',
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// 3. TEMPORARY DEVELOPMENT UTILITY ROUTES
// ==========================================

// GET: http://127.0.0.1:5000/api/auth/view-users
router.get('/view-users', async (req, res) => {
    try {
        const users = await User.find({}, '-password'); 
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: http://127.0.0.1:5000/api/auth/purge-user?email=TARGET_EMAIL
router.get('/purge-user', async (req, res) => {
    try {
        const targetEmail = req.query.email;
        if (!targetEmail) {
            return res.status(400).json({ error: "Provide an email query parameter. Example: ?email=test@test.com" });
        }
        
        const result = await User.deleteOne({ email: targetEmail });
        res.status(200).json({ 
            message: `Purge attempt completed for ${targetEmail}`, 
            details: result 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
// Modify this line inside routes/auth.js:
router.get('/view-users', async (req, res) => {
    try {
        const users = await User.find({}); // REMOVE the '-password' argument here
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});