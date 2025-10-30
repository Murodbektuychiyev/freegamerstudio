// =======================================================
// 1. FIREBASE KERAKLI FUNKSIYALARINI IMPORT QILISH
// =======================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut 
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";


// =======================================================
// 2. FIREBASE KONFIGURATSIYASI VA INICIALIZATSIYA
// =======================================================
const firebaseConfig = {
    apiKey: "AIzaSyCtZMJXDGnx5-9VH5LldprLq4jibOaY5uA",
    authDomain: "free-gamer-studio.firebaseapp.com",
    projectId: "free-gamer-studio",
    storageBucket: "free-gamer-studio.firebasestorage.app",
    messagingSenderId: "495104622765",
    appId: "1:495104622765:web:f97c716a381e2143334624",
    measurementId: "G-FLPK84GS1Q"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Autentifikatsiya obyektini olish

// Yordamchi funksiyalar
const showMessage = (message) => { alert(message); };

// FUNKSIYA: Emaildan Bosh Harflarni (Initials) Yaratish
const getInitials = (email) => {
    if (!email) return 'U';
    let username = email.split('@')[0];
    let parts = username.split(/[\._\-]/);
    let initials = '';
    
    if (parts.length >= 2) {
        initials = parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase();
    } else if (parts.length === 1 && username.length > 0) {
        initials = username.substring(0, 2).toUpperCase();
    } else {
        initials = 'U';
    }
    return initials.length > 0 ? initials : 'U';
};


// =======================================================
// 3. RO'YXATDAN O'TISH MANTIG'I
// =======================================================
const setupRegistration = () => {
    const registrationForm = document.querySelector('form[action="/register"]');
    if (!registrationForm) return;

    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const authButton = registrationForm.querySelector('.btn-auth');
        const password = registrationForm.password.value;
        const confirmPassword = registrationForm['confirm-password'].value;
        const email = registrationForm.email.value;

        if (password !== confirmPassword) { showMessage("Xato: Parollar mos kelmadi! Iltimos, ularni qayta tekshiring."); return; }

        authButton.disabled = true; authButton.textContent = "Yuklanmoqda...";

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            window.location.href = "./homepage.html"; 
        } catch (error) {
            let displayMessage = "Ro'yxatdan o'tishda xatolik: " + error.code;
            showMessage(displayMessage);
        } finally {
            authButton.disabled = false; authButton.textContent = "Tizimga kirish 🚀";
        }
    });
};


// =======================================================
// 4. TIZIMGA KIRISH MANTIG'I
// =======================================================
const setupLogin = () => {
    const loginForm = document.querySelector('form[action="/login"]');
    if (!loginForm) return;

    const emailInput = loginForm.username; 
    const passwordInput = loginForm.password; 

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const authButton = loginForm.querySelector('.btn-auth');
        const email = emailInput.value;
        const password = passwordInput.value;

        authButton.disabled = true; authButton.textContent = "Yuklanmoqda...";

        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = "./homepage.html"; 
        } catch (error) {
            let displayMessage = "Tizimga kirishda xatolik: " + error.code;
            showMessage(displayMessage);
        } finally {
            authButton.disabled = false; authButton.textContent = "Tizimga kirish 🚀";
        }
    });
};


// =======================================================
// 5. HOMEPAGE UCHUN HOLATNI TEKSHIRISH (onAuthStateChanged)
// =======================================================
const setupHomepage = () => {
    const avatarInitials = document.getElementById('userAvatarInitials');
    const userEmailDisplay = document.getElementById('userEmailDisplay');
    const welcomeMessage = document.getElementById('welcomeMessage');

    if (!avatarInitials) return;
    
    // Autentifikatsiya holatini kuzatish
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // TIZIMGA KIRGAN (LOGGED IN)
            const email = user.email;
            const initials = getInitials(email); 
            
            // HTML ma'lumotlarini yangilash
            avatarInitials.textContent = initials; // MT
            userEmailDisplay.innerHTML = email; 
            welcomeMessage.textContent = `Xush kelibsiz, ${email}!`; 
            
        } else {
            // TIZIMGA KIRMANGAN (LOGGED OUT)
            
            // HTML dagi default holatni o'rnatish
            avatarInitials.textContent = "NO";
            userEmailDisplay.innerHTML = '<a href="./login.html" style="color: white; text-decoration: none;">Tizimga kiring</a>';
            welcomeMessage.textContent = "Xush kelibsiz, Mehmon!"; 
        }
    });
};


// =======================================================
// 6. BARCHA MANTIG'NI ULASH
// =======================================================
document.addEventListener('DOMContentLoaded', () => {
    setupRegistration();
    setupLogin();
    setupHomepage(); 
});
