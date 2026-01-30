// 1. Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj6KmcvgfVxCFTpjsL1GhpEVTMQH6OLAk",
  authDomain: "web-6ef07.firebaseapp.com",
  projectId: "web-6ef07",
  storageBucket: "web-6ef07.firebasestorage.app",
  messagingSenderId: "1028816794584",
  appId: "1:1028816794584:web:792e488366197446d778ad"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 2. UI Elements
const modal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userDisplay = document.getElementById("userDisplay");
const loginSection = document.getElementById("loginSection");
const signUpSection = document.getElementById("signUpSection");
let generatedOTP = null;

// 3. Navigation & Modal Logic
loginBtn.onclick = () => { modal.style.display = "block"; };
document.getElementById("closeModal").onclick = () => { modal.style.display = "none"; };

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

// 4. Auth State Tracking (Update UI when logged in)
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

// 5. SIGN UP & OTP LOGIC
document.getElementById('signUpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Force initialize EmailJS with your Public Key right before use
    emailjs.init("Cr8Skylldo6vUX6ae"); 

    const emailAddr = document.getElementById('signupEmail').value;
    const name = document.getElementById('signupName').value;
    const password = document.getElementById('signupPassword').value;
    const otpInput = document.getElementById('otpInput').value;
    const mainBtn = document.getElementById('mainSignupBtn');

    // PHASE 1: Generate and Send OTP
    if (!generatedOTP) {
        generatedOTP = Math.floor(100000 + Math.random() * 900000);

        // This object matches the {{tags}} in your EmailJS template screenshot
        const templateParams = {
            email: emailAddr,      // Matches {{email}} in "To Email" field
            passcode: generatedOTP, // Matches {{passcode}} in your Main Body
            user_name: name,
            time: "15 minutes"     // Matches {{time}} in your Main Body
        };

        // Sending via your Service and Template IDs
        emailjs.send('service_r60hbpq', 'template_8hjqxzg', templateParams)
            .then(() => {
                alert("Success! Verification code sent to " + emailAddr);
                document.getElementById('otpArea').style.display = "block";
                mainBtn.innerText = "Verify & Complete Registration";
                mainBtn.style.backgroundColor = "#2ecc71";
            })
            .catch((err) => {
                alert("Email Error: " + err.text + ". Ensure 'Private Key' is UNCHECKED in EmailJS Security.");
                console.error("EmailJS Error details:", err);
                generatedOTP = null; 
            });
            
    } 
    // PHASE 2: Verify Code and Create Account
    else {
        if (otpInput == generatedOTP) {
            auth.createUserWithEmailAndPassword(emailAddr, password)
                .then((result) => {
                    // Update user profile with their name
                    return result.user.updateProfile({ displayName: name });
                })
                .then(() => {
                    alert("Account Verified & Created Successfully!");
                    modal.style.display = "none";
                    generatedOTP = null;
                })
                .catch(err => {
                    alert("Firebase Error: " + err.message);
                });
        } else {
            alert("The code you entered is incorrect. Please check your Gmail again.");
        }
    }
});

// 6. LOGIN & LOGOUT
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, pass)
        .then(() => {
            modal.style.display = "none";
            alert("Welcome back!");
        })
        .catch(err => {
            alert("Login Failed: " + err.message);
        });
});

logoutBtn.onclick = () => {
    auth.signOut().then(() => {
        alert("Logged out successfully.");
    });
};
