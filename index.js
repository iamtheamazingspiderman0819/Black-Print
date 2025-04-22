// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


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
const db = getFirestore(app);

// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user's role from Firestore
    const userDocRef = doc(db, "Users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const role = userData.role;

      // Redirect based on role
      if (role === "admin") {
        window.location.href = "admin-dashboard.html";
      } else if (role === "user") {
        window.location.href = "user-dashboard.html";
      } else {
        alert("Unauthorized role.");
      }
    } else {
      alert("No role assigned. Contact support.");
    }

  } catch (error) {
    console.error("Login failed:", error.message);
    alert("Login failed. Check your email and password.");
  }
});
