    /**
     * O'yin kartochkalarini nomi va janri bo'yicha dinamik filtrlash funksiyasi.
     * Foydalanuvchi matn kiritishi bilan real vaqtda qidiruvni amalga oshiradi.
     */
    document.addEventListener('DOMContentLoaded', () => {
        // 1. Kerakli HTML elementlarini aniqlash
        const searchInput = document.querySelector('.game-search-input');
        // Sahifadagi barcha o'yin kartochkalarini tanlab olish
        const gameCards = document.querySelectorAll('.game-card');

        /**
         * 2. Qidiruv maydoniga 'keyup' (tugmani qo'yib yuborish) hodisasi uchun tinglovchi o'rnatish
         */
        searchInput.addEventListener('keyup', (e) => {
            // Kiritilgan qidiruv matnini olish va uni kichik harflarga o'tkazish
            const searchTerm = e.target.value.toLowerCase();

            // Barcha kartochkalar bo'ylab aylanib chiqish va mos kelishini tekshirish
            gameCards.forEach(card => {
                
                // 3. Har bir kartochkadan nom va janr ma'lumotlarini olish
                const titleElement = card.querySelector('.game-title');
                const genreElement = card.querySelector('.game-genre');

                // Agar sarlavha yoki janr elementlari topilmasa, o'tkazib yuborish
                if (!titleElement || !genreElement) return;

                const title = titleElement.textContent.toLowerCase();
                const genre = genreElement.textContent.toLowerCase();
                
                // 4. Filtrlash shartini tekshirish: qidiruv matni sarlavha YOKI janrda bormi?
                const isMatch = title.includes(searchTerm) || genre.includes(searchTerm);

                // 5. Kartochkaning ko'rinishini yangilash
                if (isMatch) {
                    // Mos kelsa, uni ko'rsatish
                    // Games.css da .game-card flex bo'lgani uchun 'flex' ishlatiladi.
                    card.style.display = 'flex'; 
                } else {
                    // Mos kelmasa, yashirish
                    card.style.display = 'none'; 
                }
            });
        });
    });
