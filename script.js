// 1. Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj6KmcvgfVxCFTpjsL1GhpEVTMQH6OLAk",
  authDomain: "web-6ef07.firebaseapp.com",
  projectId: "web-6ef07",
  storageBucket: "web-6ef07.firebasestorage.app",
  messagingSenderId: "1028816794584",
  appId: "1:1028816794584:web:792e488366197446d778ad"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 2. Variables & UI Elements
const modal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userDisplay = document.getElementById("userDisplay");
const loginSection = document.getElementById("loginSection");
const signUpSection = document.getElementById("signUpSection");
let generatedOTP = null;

// 3. Navigation
loginBtn.onclick = () => { modal.style.display = "block"; };
document.getElementById("closeModal").onclick = () => { modal.style.display = "none"; };
document.getElementById("toSignUp").onclick = (e) => { e.preventDefault(); loginSection.style.display = "none"; signUpSection.style.display = "block"; };
document.getElementById("toLogin").onclick = (e) => { e.preventDefault(); signUpSection.style.display = "none"; loginSection.style.display = "block"; };

// 4. Auth State Tracking
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

// 5. SIGN UP & EMAIL LOGIC
document.getElementById('signUpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailAddr = document.getElementById('signupEmail').value;
    const name = document.getElementById('signupName').value;
    const password = document.getElementById('signupPassword').value;
    const otpInput = document.getElementById('otpInput').value;
    const mainBtn = document.getElementById('mainSignupBtn');

    if (!generatedOTP) {
        // Step A: Generate Code
        generatedOTP = Math.floor(100000 + Math.random() * 900000);

        // Step B: Prepare parameters exactly as they appear in your Template Body
        const templateParams = {
            email: emailAddr,      // Matches {{email}} in "To Email"
            passcode: generatedOTP, // Matches {{passcode}} in Body
            user_name: name,
            time: "15 minutes"     // Matches {{time}} in Body
        };

        // Step C: Send Email
        emailjs.send('service_r60hbpq', 'template_8hjqxzg', templateParams)
            .then(() => {
                alert("Success! Verification code sent to your Gmail.");
                document.getElementById('otpArea').style.display = "block";
                mainBtn.innerText = "Verify & Complete Sign Up";
            })
            .catch((err) => {
                alert("Email failed to send. Error: " + err.text);
                console.error("EmailJS Error:", err);
                generatedOTP = null; 
            });
            
    } else {
        // Step D: Verify OTP and Register in Firebase
        if (otpInput == generatedOTP) {
            auth.createUserWithEmailAndPassword(emailAddr, password)
                .then((result) => {
                    return result.user.updateProfile({ displayName: name });
                })
                .then(() => {
                    alert("Account Created Successfully!");
                    modal.style.display = "none";
                    generatedOTP = null;
                })
                .catch(err => alert("Firebase Error: " + err.message));
        } else {
            alert("Invalid code. Please check your email again.");
        }
    }
});

// 6. Login & Logout
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(document.getElementById('email').value, document.getElementById('password').value)
        .then(() => { modal.style.display = "none"; })
        .catch(err => alert("Login Failed: " + err.message));
});

logoutBtn.onclick = () => { auth.signOut(); };
