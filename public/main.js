async function checkLogin() {
    const response = await fetch('/auth-status');
    const data = await response.json();

    if (!data.loggedIn) {
        showLoginScreen();
    } else {
        showGameScreen();
    }
}

function showLoginScreen() {
    document.body.innerHTML = `
        <div id="login-container" style="padding: 50px; text-align: center;">
            <h1>Tic Tac Toe AI</h1>
            <h2>Please Log In</h2>
            <form action="/login" method="POST">
                <input type="text" name="username" placeholder="Username" required><br><br>
                <input type="password" name="password" placeholder="Password" required><br><br>
                <button type="submit">Enter Game</button>
            </form>
        </div>
    `;
}

function showGameScreen() {
    document.body.innerHTML = `<h1>Welcome to the Game!</h1><div id="grid"></div>`;
    // Later, you'll put your Tic Tac Toe grid code here!
}

// Run this as soon as the page loads
checkLogin();