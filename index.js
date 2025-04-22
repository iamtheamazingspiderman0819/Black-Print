// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvm2N7kTKZw5l78QMvRTC743kX_h8K7qc",
  authDomain: "black-print-aa763.firebaseapp.com",
  projectId: "black-print-aa763",
  storageBucket: "black-print-aa763.firebasestorage.app",
  messagingSenderId: "573022196691",
  appId: "1:573022196691:web:665a06d2c14b962d545526"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get form elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Handle login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('Logged in successfully:', user);
        // Redirect to dashboard or home page after successful login
        window.location.href = '/dashboard.html'; // Create this page for your app
    } catch (error) {
        console.error('Login error:', error.message);
        alert('Login failed: ' + error.message);
    }
});
