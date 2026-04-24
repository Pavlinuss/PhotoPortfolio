import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PostCard from '../PostCard';

/**
 * @description Тестирует композитный компонент поста
 * @case Рендер с картинкой и без
 * @case Проверка проброса пропсов в дочерние компоненты (Like, Share)
 */
describe('PostCard Component', () => {
  const mockPost = {
    id: 1,
    author: { name: 'Иван', avatar: 'ivan.jpg' },
    date: 'Вчера',
    content: 'Текстовый контент поста',
    likes: 15,
    comments: 3,
    image: null
  };

  const mockHandlers = {
    onLike: jest.fn(),
    onShare: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('отображает текст поста, автора и дату', () => {
    render(<PostCard post={mockPost} {...mockHandlers} />);
    
    expect(screen.getByText('Иван')).toBeInTheDocument();
    expect(screen.getByText('Текстовый контент поста')).toBeInTheDocument();
    expect(screen.getByText('Вчера')).toBeInTheDocument();
  });

  test('не отображает изображение, если оно не передано', () => {
    render(<PostCard post={mockPost} {...mockHandlers} />);
    const image = screen.queryByAltText('Post content');
    expect(image).not.toBeInTheDocument();
  });

  test('отображает изображение, если оно передано', () => {
    const postWithImg = { ...mockPost, image: 'post-image.jpg' };
    render(<PostCard post={postWithImg} {...mockHandlers} />);
    
    const image = screen.getByAltText('Post content');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'post-image.jpg');
  });

  test('пробрасывает клик на дочернюю кнопку LikeButton', () => {
    render(<PostCard post={mockPost} {...mockHandlers} />);
        
    const likeSpan = screen.getByText('15'); 
    fireEvent.click(likeSpan);
    
    expect(mockHandlers.onLike).toHaveBeenCalledWith(1);
  });
});