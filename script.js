const firebaseConfig = {
  apiKey: "AIzaSyCj6KmcvgfVxCFTpjsL1GhpEVTMQH6OLAk",
  authDomain: "web-6ef07.firebaseapp.com",
  projectId: "web-6ef07",
  storageBucket: "web-6ef07.firebasestorage.app",
  messagingSenderId: "1028816794584",
  appId: "1:1028816794584:web:792e488366197446d778ad",
  measurementId: "G-TB7WB1E17B"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const modal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userDisplay = document.getElementById("userDisplay");
const loginSection = document.getElementById("loginSection");
const signUpSection = document.getElementById("signUpSection");

let generatedOTP = null;

// Modal Navigation
loginBtn.onclick = () => { modal.style.display = "block"; };
document.getElementById("closeModal").onclick = () => { modal.style.display = "none"; };
document.getElementById("toSignUp").onclick = (e) => { e.preventDefault(); loginSection.style.display = "none"; signUpSection.style.display = "block"; };
document.getElementById("toLogin").onclick = (e) => { e.preventDefault(); signUpSection.style.display = "none"; loginSection.style.display = "block"; };

// Auth Observer
auth.onAuthStateChanged((user) => {
    if (user) {
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
        userDisplay.style.display = "inline-block";
        userDisplay.innerText = "Hi, " + (user.displayName || "Member");
    } else {
        loginBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
        userDisplay.style.display = "none";
    }
});

// REAL Registration with EmailJS
document.getElementById('signUpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const name = document.getElementById('signupName').value;
    const password = document.getElementById('signupPassword').value;
    const otpInput = document.getElementById('otpInput').value;
    const mainBtn = document.getElementById('mainSignupBtn');
    const otpArea = document.getElementById('otpArea');

    if (!generatedOTP) {
        // Step 1: Generate Code
        generatedOTP = Math.floor(100000 + Math.random() * 900000);

        // Step 2: Send REAL Email
        const templateParams = {
            to_email: email,
            otp: generatedOTP,
            user_name: name
        };

        // Your Service ID is service_r60hbpq
        // 2. TODO: Replace 'YOUR_TEMPLATE_ID' with your real ID from EmailJS
        emailjs.send('service_r60hbpq', 'template_8hjqxzg', templateParams)
            .then(function() {
                alert("Success! Code sent to " + email);
                otpArea.style.display = "block";
                mainBtn.innerText = "Verify & Complete Registration";
            }, function(error) {
                alert("Failed to send email. Check your Public Key or Template ID.");
                console.log("Error:", error);
            });
            
    } else {
        // Step 3: Verify Code
        if (otpInput == generatedOTP) {
            auth.createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    return res.user.updateProfile({ displayName: name });
                })
                .then(() => {
                    alert("Welcome! Account Created.");
                    modal.style.display = "none";
                    generatedOTP = null;
                })
                .catch(err => alert(err.message));
        } else {
            alert("Wrong code! Please try again.");
        }
    }
});

// Login and Logout
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(document.getElementById('email').value, document.getElementById('password').value)
        .then(() => modal.style.display = "none")
        .catch(err => alert("Login Error: " + err.message));
});

logoutBtn.onclick = () => auth.signOut();

