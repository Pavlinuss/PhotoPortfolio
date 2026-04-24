import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LikeButton from '../LikeButton';

/**
 * @description Тестирует компонент кнопки лайка
 * @case Отображение количества лайков
 * @case Вызов onLike при клике с правильным postId
 */
describe('LikeButton Component', () => {
  const mockOnLike = jest.fn();

  beforeEach(() => {
    mockOnLike.mockClear();
  });

  test('должен корректно отображать переданное количество лайков', () => {
    render(<LikeButton likesCount={42} postId={1} onLike={mockOnLike} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  test('должен вызывать onLike при клике', () => {
    render(<LikeButton likesCount={10} postId={99} onLike={mockOnLike} />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    
    expect(mockOnLike).toHaveBeenCalledTimes(1);
    expect(mockOnLike).toHaveBeenCalledWith(99); // Проверяем, что передался правильный ID
  });
});