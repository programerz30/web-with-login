// 1. Firebase Config
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

// 3. Modal Controls
const modal = document.getElementById("loginModal");
const btn = document.getElementById("loginBtn");
const closeBtn = document.getElementById("closeModal");

if (btn) {
    btn.onclick = () => { modal.style.display = "block"; };
}

if (closeBtn) {
    closeBtn.onclick = () => { modal.style.display = "none"; };
}

window.onclick = (event) => {
    if (event.target == modal) { modal.style.display = "none"; }
};

// 4. Login Function
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                alert("Login Successful!");
                modal.style.display = "none";
            })
            .catch((error) => {
                alert("Login failed: " + error.message);
                console.error("Firebase Error:", error.code);
            });
    });
}

// 5. Events Logic (Keep your existing events code below)
const myEvents = [
    { title: "AD ASTRA", date: "FEB 2024", description: "Technical skills.", link: "https://google.com" },
    { title: "SOFTWARE TESTING", date: "NOV 2024", description: "Industrial methods.", link: "https://google.com" },
    { title: "RADIANCE", date: "SEPT 2024", description: "Orientation.", link: "https://google.com" }
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
