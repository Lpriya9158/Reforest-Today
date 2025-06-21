// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA15DmiE7ix_YjyQkMX7HSCj6lgvW2mzwc",
  authDomain: "reforest-today.firebaseapp.com",
  databaseURL: "https://reforest-today-default-rtdb.firebaseio.com",
  projectId: "reforest-today",
  storageBucket: "reforest-today.appspot.com",
  messagingSenderId: "256372941027",
  appId: "1:256372941027:web:602bf1ef04288df8a865d6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Get form elements
const submit = document.getElementById('submit');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');

// Check if the form elements exist
if (!submit || !emailField || !passwordField) {
  console.error("Form elements (submit, email, password) not found.");
} else {
  // Listen for submit button click
  submit.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default form submission

    const email = emailField.value;
    const password = passwordField.value;

    // Check if email and password are not empty
    if (!email || !password) {
      alert("Please fill out both the email and password fields.");
      return;
    }

    console.log("Email:", email);
    console.log("Password:", password);

    // Create a new user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User signed up successfully
        const user = userCredential.user;
        alert("Account Created Successfully!");

        // Store user data in Realtime Database
        return set(ref(db, 'users/' + user.uid), {
          email: user.email,
          signupDate: new Date().toISOString(),
          userId: user.uid
        });
      })
      .then(() => {
        console.log("User data saved successfully.");
        // Redirect to home page after successful signup
        window.location.href = "index.html";
      })
      .catch((error) => {
        // Handle errors during signup and data saving
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during signup or saving data:", errorCode, errorMessage);
        alert(errorMessage);
      });
  });
}
