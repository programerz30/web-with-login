// 1. Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj6KmcvgfVxCFTpjsL1GhpEVTMQH6OLAK",
  authDomain: "web-6ef07.firebaseapp.com",
  projectId: "web-6ef07",
  storageBucket: "web-6ef07.firebasestorage.app",
  messagingSenderId: "1028816794584",
  appId: "1:1028816794584:web:792e488366197446d778ad",
  measurementId: "G-TB7WB1E17B"
};

// 2. Initialize
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 3. UI Elements
const modal = document.getElementById("loginModal");
const btn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const closeBtn = document.getElementById("closeModal");
const userEmailSpan = document.getElementById("userEmail");

const loginSection = document.getElementById("loginSection");
const signUpSection = document.getElementById("signUpSection");
const toSignUp = document.getElementById("toSignUp");
const toLogin = document.getElementById("toLogin");

// Modal Controls
if (btn) btn.onclick = () => { modal.style.display = "block"; };
if (closeBtn) closeBtn.onclick = () => { modal.style.display = "none"; };
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

// Switch between Login and Sign Up
toSignUp.onclick = (e) => { e.preventDefault(); loginSection.style.display = "none"; signUpSection.style.display = "block"; };
toLogin.onclick = (e) => { e.preventDefault(); signUpSection.style.display = "none"; loginSection.style.display = "block"; };

// 4. Authentication State Observer (Guest vs Member)
auth.onAuthStateChanged((user) => {
    if (user) {
        // Logged In (Member)
        console.log("Logged in as:", user.email);
        btn.style.display = "none";
        logoutBtn.style.display = "inline-block";
        userEmailSpan.style.display = "inline-block";
        userEmailSpan.innerText = user.email.split('@')[0].toUpperCase();
    } else {
        // Logged Out (Guest)
        console.log("Viewing as guest");
        btn.style.display = "inline-block";
        logoutBtn.style.display = "none";
        userEmailSpan.style.display = "none";
    }
});

// 5. Handle Sign In
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => { alert("Welcome back!"); modal.style.display = "none"; })
        .catch((error) => alert("Login Error: " + error.message));
});

// 6. Handle Sign Up
document.getElementById('signUpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => { alert("Account created! You are now a member."); modal.style.display = "none"; })
        .catch((error) => alert("Sign Up Error: " + error.message));
});

// 7. Handle Logout
logoutBtn.onclick = () => {
    auth.signOut().then(() => alert("Logged out!"));
};

// 8. Events Grid Data
const myEvents = [
    { title: "AD ASTRA", date: "FEB 2024", description: "Technical skill set journey.", link: "https://google.com" },
    { title: "SOFTWARE TESTING", date: "NOV 2024", description: "Industrial methods.", link: "https://google.com" },
    { title: "RADIANCE", date: "SEPT 2024", description: "Orientation event.", link: "https://google.com" }
];

const container = document.getElementById('event-grid');
if (container) {
    myEvents.forEach(event => {
        container.innerHTML += `
            <div class="card">
                <span class="date">🗓 ${event.date}</span>
                <h2>${event.title}</h2>
                <p>${event.description}</p>
                <a href="${event.link}" target="_blank" style="color:#3498db; text-decoration:none; font-weight:bold;">Learn More →</a>
            </div>
        `;
    });
}
