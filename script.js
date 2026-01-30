// 1. Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj6KmcvgfVxCFTpjsL1GhpEVTMQH6OLAk",
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

// 3. UI Selectors
const modal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const closeBtn = document.getElementById("closeModal");
const userDisplay = document.getElementById("userDisplay");

const loginSection = document.getElementById("loginSection");
const signUpSection = document.getElementById("signUpSection");

// Variables for Verification Logic
let generatedOTP = null;

// Modal Open/Close Logic
if (loginBtn) loginBtn.onclick = () => { modal.style.display = "block"; };
if (closeBtn) closeBtn.onclick = () => { modal.style.display = "none"; };
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

// Toggle Forms
document.getElementById("toSignUp").onclick = (e) => {
    e.preventDefault();
    loginSection.style.display = "none";
    signUpSection.style.display = "block";
};
document.getElementById("toLogin").onclick = (e) => {
    e.preventDefault();
    signUpSection.style.display = "none";
    loginSection.style.display = "block";
};

// 4. Auth State Observer (Member vs Guest)
auth.onAuthStateChanged((user) => {
    if (user) {
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
        userDisplay.style.display = "inline-block";
        userDisplay.innerText = user.displayName || user.email.split('@')[0];
    } else {
        loginBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
        userDisplay.style.display = "none";
    }
});

// 5. Handle Login
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => { modal.style.display = "none"; alert("Logged in successfully!"); })
        .catch((err) => alert("Login Error: " + err.message));
});

// 6. Handle Multi-Step Sign Up with OTP
document.getElementById('signUpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('signupEmail').value;
    const name = document.getElementById('signupName').value;
    const password = document.getElementById('signupPassword').value;
    const otpInput = document.getElementById('otpInput').value;
    const mainBtn = document.getElementById('mainSignupBtn');
    const otpArea = document.getElementById('otpArea');

    // Step 1: Generate & "Send" OTP
    if (!generatedOTP) {
        generatedOTP = Math.floor(100000 + Math.random() * 900000);
        
        // In a real app, you'd call an API here. For now, we simulate sending it.
        console.log("SIMULATED EMAIL SENT TO " + email + " | CODE: " + generatedOTP);
        alert("A verification code was sent to " + email + " (Check browser console for simulation)");
        
        otpArea.style.display = "block";
        mainBtn.innerText = "Verify & Complete Registration";
        mainBtn.style.backgroundColor = "#27ae60";
    } 
    // Step 2: Verify OTP and Register
    else {
        if (otpInput == generatedOTP) {
            auth.createUserWithEmailAndPassword(email, password)
                .then((result) => {
                    // Update the user profile with their name
                    return result.user.updateProfile({ displayName: name });
                })
                .then(() => {
                    alert("Account Created Successfully!");
                    modal.style.display = "none";
                    generatedOTP = null; // reset
                })
                .catch((err) => alert("Error: " + err.message));
        } else {
            alert("Incorrect verification code. Please try again.");
        }
    }
});

// 7. Logout
logoutBtn.onclick = () => {
    auth.signOut().then(() => alert("You have logged out."));
};

// 8. Event Grid (Simulated Data)
const myEvents = [
    { title: "AD ASTRA", date: "FEB 2024", description: "Technical skill building.", link: "#" },
    { title: "SOFT TESTING", date: "NOV 2024", description: "Modern QA methods.", link: "#" },
    { title: "RADIANCE", date: "SEPT 2024", description: "Freshman orientation.", link: "#" }
];

const container = document.getElementById('event-grid');
if (container) {
    myEvents.forEach(evt => {
        container.innerHTML += `
            <div class="card" style="background:white; padding:20px; border-radius:8px; margin:10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <h3>${evt.title}</h3>
                <p>${evt.date}</p>
                <p>${evt.description}</p>
            </div>`;
    });
}

