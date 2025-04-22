// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Firebase config (same as your login file)
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
const db = getFirestore(app);

// DOM Elements
const userNameElements = document.querySelectorAll("#userName");
const userEmailElement = document.getElementById("userEmail");
const logoutBtn = document.getElementById('logoutBtn');
const navLinks = document.querySelectorAll('.nav-links li a');
const topBarTitle = document.querySelector('.top-bar h1');
const contentArea = document.querySelector('.content-area');

// Check authentication state
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDocRef = doc(db, "Users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            
            // Check if user is admin
            if (data.role !== 'admin') {
                alert('Unauthorized access: Admin privileges required');
                await signOut(auth);
                window.location.href = "index.html";
                return;
            }
            
            // Update user info
            const displayName = data.name || "Admin";
            userNameElements.forEach(el => el.textContent = displayName);
            if (userEmailElement) userEmailElement.textContent = data.email || user.email;
            
        } else {
            alert("No user profile found.");
        }
    } else {
        // Not logged in, redirect to login page
        window.location.href = "index.html";
    }
});

// Handle navigation clicks
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#' && this.id !== 'logoutBtn') {
            e.preventDefault();
            
            // Update active state
            navLinks.forEach(item => {
                item.parentElement.classList.remove('active');
            });
            this.parentElement.classList.add('active');
            
            // Update page title
            const sectionName = this.querySelector('span').textContent;
            topBarTitle.textContent = sectionName;
            
            // Update content (in a real app, you would load the actual content)
            contentArea.innerHTML = `
                <div id="welcome-message">
                    <h2>${sectionName}</h2>
                    <p>This is the ${sectionName.toLowerCase()} section of your dashboard.</p>
                </div>
            `;
        }
    });
});

// Handle logout
logoutBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        await signOut(auth);
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error signing out:', error);
        alert('Error signing out. Please try again.');
    }
});
