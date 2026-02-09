console.log("PhotoPortfolio script loaded");

const btn = document.getElementById('gallery-btn');

if (btn) {
    btn.addEventListener('click', () => {
        
        const gallerySection = document.querySelector('.gallery-preview');
        if (gallerySection) {
            gallerySection.scrollIntoView({ behavior: 'smooth' });
        } else {
            alert("Добро пожаловать в галерею!");
        }
    });
} else {
    console.error("Кнопка не найдена!");
}