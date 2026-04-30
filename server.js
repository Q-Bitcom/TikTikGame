const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const PORT = 3000;

const users = []; // Temporary database

app.use(session({
    secret: 'tic-tac-toe-secret', 
    resave: false,
    saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public')); 

// Route: Check if logged in
app.get('/auth-status', (req, res) => {
    if (req.session.loggedIn) {
        res.json({ loggedIn: true, username: req.session.username });
    } else {
        res.json({ loggedIn: false });
    }
});

// Route: Handle Sign Up
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    if (users.find(u => u.username === username)) {
        return res.send('Username taken! <a href="/">Go back</a>');
    }
    users.push({ username, password });
    res.send('Account created! <a href="/">Click here to log in.</a>');
});

// Route: Handle Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        req.session.loggedIn = true;
        req.session.username = username;
        res.redirect('/');
    } else {
        res.send('Invalid login. <a href="/">Go back</a>');
    }
});

// Route: Handle Logout (THE ONE THAT WAS BREAKING)
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/'); // Wipe memory and send back to login
    });
});

app.listen(PORT, () => {
    console.log(`Server spinning up on http://localhost:${PORT}`);
});