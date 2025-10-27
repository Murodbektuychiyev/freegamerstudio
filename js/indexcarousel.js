document.querySelectorAll('.news-carousel-container, .testimonial-carousel-container').forEach(container => {
    const track = container.querySelector('.carousel-track');
    const items = container.querySelectorAll('.carousel-item');
    const nextBtn = container.querySelector('.next-btn');
    const prevBtn = container.querySelector('.prev-btn');
    const autoplayInterval = 2000; // 2 soniya (millisekundda)
    let currentIndex = 0;
    let autoSlideTimer;
    
    // Karusel elementlari yo'q bo'lsa, kodni to'xtatamiz
    if (items.length === 0) return; 

    // Element kengligi + CSSdagi gap (30px)
    const itemWidth = items[0].offsetWidth + 30; 

    function updateCarousel() {
        const offset = -currentIndex * itemWidth;
        track.style.transform = `translateX(${offset}px)`;

        // Tugmachalarni o'chirish/yoqish
        prevBtn.disabled = (currentIndex === 0);
        nextBtn.disabled = (currentIndex >= items.length - 1); 
    }

    function slideNext() {
        // Oxirgi element bo'lsa (yoki unga yaqin bo'lsa), birinchisiga qaytamiz
        if (currentIndex >= items.length - 1) {
            currentIndex = 0; // Birinchisiga qaytish
        } else {
            currentIndex++; // Keyingi elementga o'tish
        }
        updateCarousel();
    }
    
    // Auto-slide funksiyasini boshlash
    function startAutoplay() {
        // Avvalgi taymerni to'xtatish
        stopAutoplay(); 
        
        // Yangi taymerni boshlash
        autoSlideTimer = setInterval(slideNext, autoplayInterval);
    }

    // Auto-slide funksiyasini to'xtatish
    function stopAutoplay() {
        clearInterval(autoSlideTimer);
    }
    
    // Foydalanuvchi Karuselga kursorini olib borsa, to'xtatamiz
    container.addEventListener('mouseenter', stopAutoplay);
    
    // Foydalanuvchi Karuseldan kursorini olib ketsa, qayta boshlaymiz
    container.addEventListener('mouseleave', startAutoplay);


    // --- Tugma hodisalari ---
    
    // Tugmani bosishda avtomatik surishni to'xtatib, qayta boshlash
    nextBtn.addEventListener('click', () => {
        slideNext();
        startAutoplay(); // Har bir bosishdan keyin taymerni qayta boshlaymiz
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
            startAutoplay(); // Har bir bosishdan keyin taymerni qayta boshlaymiz
        }
    });

    // Boshlang'ich holatni o'rnatish va avtomatik surishni ishga tushirish
    updateCarousel();
    startAutoplay();
});
