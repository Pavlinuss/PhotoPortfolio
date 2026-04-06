export default class LocalStorageService {
    constructor() {
        this.storage = window.localStorage;
    }

    isCacheEnvelope(obj) {
        return !!obj &&
            typeof obj === 'object' &&
            Object.prototype.hasOwnProperty.call(obj, 'value') &&
            typeof obj.timestamp === 'number' &&
            typeof obj.expiry === 'number';
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

            const parsed = JSON.parse(itemStr);

            if (this.isCacheEnvelope(parsed)) {
                const now = new Date().getTime();
                if (now > parsed.expiry) {
                    this.remove(key);
                    return null;
                }
                return parsed.value;
            }

            // If something stored plain JSON (not our cache envelope), return it as-is.
            return parsed;
        } catch (error) {
            // Non-JSON values (e.g. "all") may coexist in localStorage; treat them as raw strings.
            if (error instanceof SyntaxError) {
                return this.storage.getItem(key);
            }
            console.error('Error reading from localStorage:', error);
            return null;
        }
    }

    remove(key) {
        this.storage.removeItem(key);
    }

    clearExpired() {
        const now = new Date().getTime();
        for (let i = 0; i < this.storage.length; i++) {
            const key = this.storage.key(i);
            if (!key) continue;
            const itemStr = this.storage.getItem(key);
            if (!itemStr) continue;

            try {
                const parsed = JSON.parse(itemStr);
                if (this.isCacheEnvelope(parsed) && now > parsed.expiry) {
                    this.remove(key);
                }
            } catch {
                // ignore non-JSON items
            }
        }
    }
    
    getAllKeys() {
        return Object.keys(this.storage);
    }
}