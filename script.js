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

const modal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userDisplay = document.getElementById("userDisplay");
const loginSection = document.getElementById("loginSection");
const signUpSection = document.getElementById("signUpSection");
let generatedOTP = null;

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

document.getElementById('signUpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const emailValue = document.getElementById('signupEmail').value;
    const name = document.getElementById('signupName').value;
    const password = document.getElementById('signupPassword').value;
    const otpInput = document.getElementById('otpInput').value;
    const mainBtn = document.getElementById('mainSignupBtn');

    if (!generatedOTP) {
        generatedOTP = Math.floor(100000 + Math.random() * 900000);

        // Matching your template variables exactly
        const templateParams = {
            email: emailValue, // Matches {{email}} in your screenshot
            otp: generatedOTP,   // Ensure {{otp}} is in your template body
            user_name: name
        };

        // Using your IDs: service_r60hbpq and template_8hjqxzg
        emailjs.send('service_r60hbpq', 'template_8hjqxzg', templateParams)
            .then(() => {
                alert("Success! Check your Gmail for the code.");
                document.getElementById('otpArea').style.display = "block";
                mainBtn.innerText = "Verify Code & Register";
            })
            .catch((err) => {
                alert("Email failed to send. Check console for details.");
                console.error("EmailJS Error:", err);
                generatedOTP = null; 
            });
            
    } else {
        if (otpInput == generatedOTP) {
            auth.createUserWithEmailAndPassword(emailValue, password)
                .then((res) => res.user.updateProfile({ displayName: name }))
                .then(() => {
                    alert("Account Created!");
                    modal.style.display = "none";
                    generatedOTP = null;
                })
                .catch(err => alert(err.message));
        } else {
            alert("Wrong code!");
        }
    }
});

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(document.getElementById('email').value, document.getElementById('password').value)
        .then(() => modal.style.display = "none")
        .catch(err => alert(err.message));
});

logoutBtn.onclick = () => auth.signOut();
