// Import the necessary functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCtZMJXDGnx5-9VH5LldprLq4jibOaY5uA",
    authDomain: "free-gamer-studio.firebaseapp.com",
    projectId: "free-gamer-studio",
    storageBucket: "free-gamer-studio.firebasestorage.app",
    messagingSenderId: "495104622765",
    appId: "1:495104622765:web:f97c716a381e2143334624",
    measurementId: "G-FLPK84GS1Q"
};

// Initialize Firebase and Analytics
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log("Firebase muvaffaqiyatli ulandi!"); 
