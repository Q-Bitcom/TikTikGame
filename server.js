const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const PORT = 3000;

// 1. Give the server a memory (Sessions)
app.use(session({
    secret: 'tic-tac-toe-secret', 
    resave: false,
    saveUninitialized: true
}));

// Allow the server to read form data
app.use(express.urlencoded({ extended: true })); 

// Share the public folder (This automatically loads index.html and main.js!)
app.use(express.static('public')); 

// 2. THE NEW API: main.js will call this to check if the user is logged in
app.get('/auth-status', (req, res) => {
    if (req.session.loggedIn) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});

// 3. Handle the login form submission from main.js
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check the password
    if (username === 'player' && password === '1234') {
        req.session.loggedIn = true;
        res.redirect('/'); // Send them back to index.html, which will now draw the game!
    } else {
        res.send('Invalid login. Try player / 1234. <a href="/">Go back</a>');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});