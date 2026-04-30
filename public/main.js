let authMode = 'login'; 

async function checkLogin() {
    try {
        const response = await fetch('/auth-status');
        const data = await response.json();
        if (!data.loggedIn) {
            renderAuthScreen(); 
        } else {
            showGameScreen(data.username);
        }
    } catch (err) {
        console.error("Connection error:", err);
    }
}

function renderAuthScreen() {
    const isLogin = authMode === 'login';
    document.body.innerHTML = `
        <div style="padding: 50px; text-align: center; font-family: sans-serif;">
            <h1>Tic Tac Toe AI</h1>
            <div style="border: 1px solid #ccc; padding: 30px; border-radius: 12px; display: inline-block; width: 300px; background: white;">
                <h2>${isLogin ? 'Log In' : 'Create Account'}</h2>
                <form action="${isLogin ? '/login' : '/signup'}" method="POST">
                    <input type="text" name="username" placeholder="Username" style="width: 80%; padding: 10px; margin-bottom: 10px;" required><br>
                    <input type="password" name="password" placeholder="Password" style="width: 80%; padding: 10px; margin-bottom: 10px;" required><br>
                    <button type="submit">${isLogin ? 'Enter Game' : 'Register'}</button>
                </form>
                <p>${isLogin ? "Need an account?" : "Have an account?"}</p>
                <button onclick="toggleAuth()">${isLogin ? 'Switch to Sign Up' : 'Switch to Log In'}</button>
            </div>
        </div>`;
}

function toggleAuth() {
    authMode = authMode === 'login' ? 'signup' : 'login';
    renderAuthScreen();
}

function showGameScreen(name) {
    document.body.innerHTML = `
        <div style="text-align: center; padding: 50px; font-family: sans-serif;">
            <h1>Hello, ${name}!</h1>
            <div id="grid" style="font-size: 24px; margin: 20px;">[ Tic Tac Toe Grid Coming Soon ]</div>
            <br>
            <a href="/logout" style="color: red; font-weight: bold; text-decoration: none; border: 1px solid red; padding: 5px 10px; border-radius: 5px;">Logout</a>
        </div>`;
}

checkLogin();