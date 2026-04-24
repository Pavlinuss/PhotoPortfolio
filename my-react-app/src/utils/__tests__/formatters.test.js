
import { formatNumber, timeAgo } from '../formatters';

/**
 * @description Тестирует функции форматирования данных для соцсети
 * @case Нормальные значения
 * @case Граничные значения (boundary cases)
 * @case Ошибки и исключения
 */
describe('Formatters Utilities', () => {
  
  describe('formatNumber', () => {
    test('должен корректно обрабатывать нормальный случай (< 1000)', () => {
      expect(formatNumber(150)).toBe('150');
      expect(formatNumber(999)).toBe('999');
    });

    test('должен обрабатывать тысячи (K) и миллионы (M)', () => {
      expect(formatNumber(1500)).toBe('1.5K');
      expect(formatNumber(1000)).toBe('1K');
      expect(formatNumber(2500000)).toBe('2.5M');
    });

    test('должен обрабатывать ошибки (null, undefined, NaN)', () => {
      expect(formatNumber(null)).toBe('0');
      expect(formatNumber(undefined)).toBe('0');
      expect(formatNumber('строка')).toBe('0');
    });
  });

  describe('timeAgo', () => {
    test('должен возвращать "только что" для недавнего времени', () => {
      const now = new Date();
      expect(timeAgo(now.toISOString())).toBe('только что');
    });

    test('должен корректно рассчитывать часы', () => {
      const past = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 часа назад
      expect(timeAgo(past.toISOString())).toBe('2 ч. назад');
    });

    test('должен обрабатывать ошибки и некорректные даты', () => {
      expect(timeAgo('invalid-date')).toBe('Неверная дата');
      expect(timeAgo(null)).toBe('Неизвестно');
    });
  });
});