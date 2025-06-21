 
   // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js ";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey:"AIzaSyA15DmiE7ix_YjyQkMX7HSCj6lgvW2mzwc",
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
 
// submit
const submit = document.getElementById('submit');
submit.addEventListener("click",function(event){
    event.preventDefault()
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        window.location.href ="index.html"
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });

})