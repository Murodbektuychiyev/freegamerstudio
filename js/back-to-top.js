// 1. Elementlar tanlab olindi
const backToTopBtn = document.getElementById('backToTopBtn');
    
// 2. Sahifa pastga siljiganida tugmani ko'rsatish/yashirish funksiyasi
window.onscroll = function() {

// Agar foydalanuvchi 200px dan ko'proq pastga tushgan bo'lsa
if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    backToTopBtn.classList.add('show');
} else {
    backToTopBtn.classList.remove('show');
}
};
    
// 3. Tugma bosilganda sahifani tepaga siljitish funksiyasi
backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
// Silliq siljitish effekti
window.scrollTo({
    top: 0,
    behavior: 'smooth'
});
});