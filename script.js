// 1. Initialize EmailJS immediately at the top
(function() {
    emailjs.init("Cr8Skylldo6vUX6ae"); // Your Public Key
})();

// 2. Firebase Configuration
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

// 3. UI Elements
const modal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userDisplay = document.getElementById("userDisplay");
const loginSection = document.getElementById("loginSection");
const signUpSection = document.getElementById("signUpSection");
let generatedOTP = null;

// 4. Modal Navigation
loginBtn.onclick = () => { modal.style.display = "block"; };
document.getElementById("closeModal").onclick = () => { modal.style.display = "none"; };
document.getElementById("toSignUp").onclick = (e) => { 
    e.preventDefault(); 
    loginSection.style.display = "none"; 
    signUpSection.style.display = "block"; 
};

// 5. SIGN UP & OTP Logic
document.getElementById('signUpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailAddr = document.getElementById('signupEmail').value;
    const name = document.getElementById('signupName').value;
    const password = document.getElementById('signupPassword').value;
    const otpInput = document.getElementById('otpInput').value;
    const mainBtn = document.getElementById('mainSignupBtn');

    if (!generatedOTP) {
        generatedOTP = Math.floor(100000 + Math.random() * 900000);

        // Parameters match your Content tab exactly
        const templateParams = {
            email: emailAddr,      // Matches {{email}}
            passcode: generatedOTP, // Matches {{passcode}}
            time: "15 minutes"     // Matches {{time}}
        };

        // Using your IDs
        emailjs.send('service_r60hbpq', 'template_8hjqxzg', templateParams)
            .then(() => {
                alert("Success! Code sent to " + emailAddr);
                document.getElementById('otpArea').style.display = "block";
                mainBtn.innerText = "Verify & Complete Registration";
            })
            .catch((err) => {
                // Detailed alert to catch any remaining security blocks
                alert("Error: " + err.text + "\nCheck EmailJS > Account > Security.");
                console.error("EmailJS Failed:", err);
                generatedOTP = null; 
            });
            
    } else {
        if (otpInput == generatedOTP) {
            auth.createUserWithEmailAndPassword(emailAddr, password)
                .then((res) => res.user.updateProfile({ displayName: name }))
                .then(() => {
                    alert("Account Created!");
                    location.reload(); 
                })
                .catch(err => alert("Firebase Error: " + err.message));
        } else {
            alert("Incorrect code. Check your Gmail.");
        }
    }
});
