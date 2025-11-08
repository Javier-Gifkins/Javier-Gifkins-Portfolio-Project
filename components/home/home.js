// Simple Authentication Functions

// Check if user is already logged in
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is logged in
        document.getElementById('authSection').style.display = 'none';
        document.getElementById('userSection').style.display = 'block';
        document.getElementById('userEmail').textContent = user.email;
    } else {
        // User is not logged in
        document.getElementById('authSection').style.display = 'block';
        document.getElementById('userSection').style.display = 'none';
    }
});

// Login function
function login() {
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            document.getElementById('authMessage').textContent = 'Logged in!';
        })
        .catch((error) => {
            document.getElementById('authMessage').textContent = 'Error: ' + error.message;
        });
}

// Sign up function
function signup() {
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            document.getElementById('authMessage').textContent = 'Account created!';
        })
        .catch((error) => {
            document.getElementById('authMessage').textContent = 'Error: ' + error.message;
        });
}

// Logout function
function logout() {
    firebase.auth().signOut();
}

// Continue without login
function continueWithoutLogin() {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('authMessage').textContent = 'Browsing as guest';
}
