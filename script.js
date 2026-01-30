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

// 4. SIGN UP & OTP LOGIC
document.getElementById('signUpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailAddr = document.getElementById('signupEmail').value;
    const name = document.getElementById('signupName').value;
    const password = document.getElementById('signupPassword').value;
    const otpInput = document.getElementById('otpInput').value;
    const mainBtn = document.getElementById('mainSignupBtn');

    if (!generatedOTP) {
        generatedOTP = Math.floor(100000 + Math.random() * 900000);

        // Parameters match your Content screenshot exactly
        const templateParams = {
            email: emailAddr,      // Matches {{email}}
            passcode: generatedOTP, // Matches {{passcode}}
            user_name: name,
            time: "15 minutes"     // Matches {{time}}
        };

        // We use your Service ID, Template ID, and Public Key
        emailjs.send('service_r60hbpq', 'template_8hjqxzg', templateParams, 'Cr8Skylldo6vUX6ae')
            .then(() => {
                alert("Success! Verification code sent to your Gmail.");
                document.getElementById('otpArea').style.display = "block";
                mainBtn.innerText = "Verify Code & Sign Up";
            })
            .catch((err) => {
                alert("Error: " + err.text + ". Check EmailJS Security settings.");
                console.error("EmailJS Error:", err);
                generatedOTP = null; 
            });
            
    } else {
        if (otpInput == generatedOTP) {
            auth.createUserWithEmailAndPassword(emailAddr, password)
                .then((res) => res.user.updateProfile({ displayName: name }))
                .then(() => {
                    alert("Account Created Successfully!");
                    modal.style.display = "none";
                    generatedOTP = null;
                })
                .catch(err => alert("Firebase Error: " + err.message));
        } else {
            alert("Wrong code! Check your Gmail again.");
        }
    }
});

// 5. Login & Logout
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(document.getElementById('email').value, document.getElementById('password').value)
        .then(() => modal.style.display = "none")
        .catch(err => alert("Login Failed: " + err.message));
});

logoutBtn.onclick = () => auth.signOut();
