// Paste this at the TOP of script.js
const firebaseConfig = {
  apiKey: "AIzaSyCj6KmcvgfVxCFTpjsL1GhpEVTMQH6OLAK",
  authDomain: "web-6ef07.firebaseapp.com",
  projectId: "web-6ef07",
  storageBucket: "web-6ef07.firebasestorage.app",
  messagingSenderId: "1028816794584",
  appId: "1:1028816794584:web:792e488366197446d778ad",
  measurementId: "G-TB7WB1E17B"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Handle Login
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Welcome back!");
            modal.style.display = "none";
            // You can now hide the login button and show a "Logout" button
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
});
const modal = document.getElementById("loginModal");
const btn = document.getElementById("loginBtn");
const span = document.getElementsByClassName("close")[0];

// Open Modal
btn.onclick = () => modal.style.display = "block";

// Close Modal
span.onclick = () => modal.style.display = "none";

// Handle Login Submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log("Attempting login with:", email);
    
    // NEXT STEP: Send this data to a server
    // For now, let's just pretend it worked
    alert("Authentication requires a backend server!");
});
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