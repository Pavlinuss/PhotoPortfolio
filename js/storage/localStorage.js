export default class LocalStorageService {
    constructor() {
        this.storage = window.localStorage;
    }

    set(key, value, cacheDurationMs = 3600000) { 
        try {
            const item = {
                value: value,
                timestamp: new Date().getTime(),
                expiry: new Date().getTime() + cacheDurationMs
            };
            this.storage.setItem(key, JSON.stringify(item));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }

    get(key) {
        try {
            const itemStr = this.storage.getItem(key);
            if (!itemStr) return null;

            const item = JSON.parse(itemStr);
            const now = new Date().getTime();

            if (now > item.expiry) {
                this.remove(key);
                return null;
            }
            return item.value;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    }

    remove(key) {
        this.storage.removeItem(key);
    }

    clearExpired() {
        for (let i = 0; i < this.storage.length; i++) {
            const key = this.storage.key(i);
            this.get(key); 
        }
    }
    
    getAllKeys() {
        return Object.keys(this.storage);
    }
}