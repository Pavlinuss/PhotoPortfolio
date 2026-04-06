document.addEventListener('DOMContentLoaded', () => {
  console.log('PhotoPortfolio script loaded');
  initFilter();
  initModal();
  initSlider();
});

import { API_CONFIG } from './api/config.js';
import ApiService from './api/apiService.js';
import LocalStorageService from './storage/localStorage.js';
import { createPhotoElement } from './utils/dataParser.js';

class APIIntegrationManager {
    constructor() {
        this.localStorage = new LocalStorageService();
        this.api = null;
        this.container = document.getElementById('data-container');
        this.loader = document.getElementById('loading-indicator');
        this.init();
    }

    async init() {
        this.localStorage.clearExpired();
        
        const config = API_CONFIG.unsplash;
        this.api = new ApiService(config.baseURL, config.apiKey);
        
        this.setupEventListeners();
        
        this.fetchData('portfolio photography');
    }

    setupEventListeners() {
        document.getElementById('search-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = document.getElementById('search-input').value.trim();
            if (query) this.fetchData(query);
        });

        document.getElementById('refresh-btn')?.addEventListener('click', () => {
            const query = document.getElementById('search-input').value.trim() || 'portfolio photography';
            this.fetchData(query, true); 
        });

        document.getElementById('clear-cache-btn')?.addEventListener('click', () => {
            this.localStorage.getAllKeys().forEach(key => {
                if (key.startsWith('unsplash_cache_')) {
                    this.localStorage.remove(key);
                }
            });
            this.showNotification('Кэш фотографий очищен', 'success');
        });

        document.getElementById('show-favorites-btn')?.addEventListener('click', () => {
            this.renderFavorites();
        });
    }

    async fetchData(query, forceRefresh = false) {
        this.showLoading(true);
        const cacheKey = `unsplash_cache_${query}`;

        try {
            if (!forceRefresh) {
                const cachedData = this.localStorage.get(cacheKey);
                if (cachedData) {
                    this.renderData(cachedData);
                    this.showNotification('Данные загружены из кэша (Оффлайн)', 'success');
                    this.showLoading(false);
                    return;
                }
            }

            const data = await this.api.get(API_CONFIG.unsplash.endpoints.search, { query: query, per_page: 12 });
            
            if (data && data.results) {
                this.localStorage.set(cacheKey, data.results);
                this.renderData(data.results);
                this.showNotification('Данные успешно загружены с сервера', 'success');
            } else {
                this.renderData([]);
            }

        } catch (error) {
            this.handleAPIError(error);
            const cachedData = this.localStorage.get(cacheKey);
            if (cachedData) this.renderData(cachedData);
        } finally {
            this.showLoading(false);
        }
    }

    renderData(photosArray) {
        this.container.innerHTML = ''; 
        
        if (!photosArray || photosArray.length === 0) {
            this.container.innerHTML = '<p>Фотографии не найдены.</p>';
            return;
        }

        photosArray.forEach(photo => {
            const el = createPhotoElement(photo, this.toggleFavorite.bind(this));
            this.container.appendChild(el);
        });
    }

    toggleFavorite(photo) {
        let favorites = this.localStorage.get('portfolio_favorites') || [];
        
        const existingIndex = favorites.findIndex(p => p.id === photo.id);
        if (existingIndex !== -1) {
            favorites.splice(existingIndex, 1);
            this.showNotification('Удалено из избранного', 'success');
        } else {
            favorites.push(photo);
            this.showNotification('Добавлено в избранное', 'success');
        }
        
        this.localStorage.set('portfolio_favorites', favorites, 31536000000);
    }

    renderFavorites() {
        const favorites = this.localStorage.get('portfolio_favorites') || [];
        this.renderData(favorites);
        this.showNotification(`Показано избранное: ${favorites.length} фото`, 'success');
    }

    handleAPIError(error) {
        let errorMsg = 'Произошла ошибка загрузки данных';
        if (!navigator.onLine) errorMsg = 'Отсутствует подключение к интернету! (Оффлайн режим)';
        else if (error.message.includes('401')) errorMsg = 'Ошибка авторизации. Проверьте API ключ.';
        else if (error.message.includes('403')) errorMsg = 'Превышен лимит запросов к API.';
        
        this.showNotification(errorMsg, 'error');
    }

    showLoading(show) {
        this.loader.style.display = show ? 'block' : 'none';
        if(show) this.container.innerHTML = '';
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; padding: 15px; border-radius: 5px; color: white; z-index: 1000;
            background-color: ${type === 'error' ? '#f44336' : '#4CAF50'};
            box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: opacity 0.3s;
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new APIIntegrationManager();
});