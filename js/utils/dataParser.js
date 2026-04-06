export const createPhotoElement = (photo, toggleFavoriteCallback) => {
    const item = document.createElement('div');
    item.className = 'photo-card';
    
    const imgUrl = photo.urls?.regular || '';
    const author = photo.user?.name || 'Неизвестный автор';
    const altText = photo.alt_description || 'Фотография портфолио';

    item.innerHTML = `
        <img src="${imgUrl}" alt="${altText}" loading="lazy" style="width: 100%; border-radius: 8px;">
        <div class="photo-info" style="padding: 10px 0;">
            <p><strong>Фотограф:</strong> ${author}</p>
            <button class="btn-favorite" data-id="${photo.id}">
                ❤️ В избранное
            </button>
        </div>
    `;

    const favBtn = item.querySelector('.btn-favorite');
    favBtn.addEventListener('click', () => toggleFavoriteCallback(photo));

    return item;
};