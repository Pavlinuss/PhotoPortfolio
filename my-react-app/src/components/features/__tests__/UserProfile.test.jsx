import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProfile from '../UserProfile';

/**
 * @description Тестирует презентационный компонент профиля пользователя
 */
describe('UserProfile Component', () => {
  const mockUser = {
    id: 1,
    username: 'test_user',
    fullName: 'Тест Тестов',
    avatar: 'test.jpg',
    bio: 'Привет, мир!',
    friendsCount: 10,
    postsCount: 5
  };

  test('должен отображать основную информацию пользователя', () => {
    render(<UserProfile user={mockUser} />);
    
    expect(screen.getByText('Тест Тестов')).toBeInTheDocument();
    expect(screen.getByText('@test_user')).toBeInTheDocument();
    expect(screen.getByText('Привет, мир!')).toBeInTheDocument();
  });

  test('должен отображать статистику (посты и друзья)', () => {
    render(<UserProfile user={mockUser} />);
    
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});