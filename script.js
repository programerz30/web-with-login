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

// 2. Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 3. UI Elements
const modal = document.getElementById("loginModal");
const btn = document.getElementById("loginBtn");
const span = document.getElementsByClassName("close")[0];
const loginForm = document.getElementById('loginForm');

// Open Modal
if(btn) {
    btn.onclick = () => modal.style.display = "block";
}

// Close Modal
if(span) {
    span.onclick = () => modal.style.display = "none";
}

// Close Modal if user clicks outside of it
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// 4. Handle Login Submission
if(loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log("Attempting login with:", email);

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log("Logged in:", userCredential.user);
                alert("Login Successful! Welcome back.");
                modal.style.display = "none";
                // Optional: window.location.reload(); // Refresh to update UI
            })
            .catch((error) => {
                console.error("Login Error:", error.code, error.message);
                alert("Login failed: " + error.message);
            });
    });
}

// 5. Events Grid Logic
const myEvents = [
    {
        title: "AD ASTRA",
        date: "FEB 2024",
        description: "A month-long journey to build your technical skill set.",
        link: "https://www.google.com"
    },
    {
        title: "SOFTWARE TESTING",
        date: "NOV 2024",
        description: "Industrial approach to modern software methods.",
        link: "https://www.google.com"
    },
    {
        title: "RADIANCE",
        date: "SEPT 2024",
        description: "An exclusive orientation and networking event for freshmen.",
        link: "https://www.google.com"
    }
];

const container = document.getElementById('event-grid');
if(container) {
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
