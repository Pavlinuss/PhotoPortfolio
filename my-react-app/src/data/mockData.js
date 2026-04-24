
export const currentUser = {
    id: 1,
    username: 'ivan_dev',
    fullName: 'Иван Иванов',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan',
    bio: 'Frontend разработчик. Изучаю React и люблю красивый UI.',
    friendsCount: 42,
    postsCount: 15
  };
  
  export const friends = [
    { id: 101, name: 'Анна Смирнова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna', online: true },
    { id: 102, name: 'Петр Васильев', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Petr', online: false },
    { id: 103, name: 'Елена Соколова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena', online: true },
  ];
  
  export const posts = [
    {
      id: 1,
      author: {
        name: 'Мария Кузнецова',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
      },
      date: '2 часа назад',
      content: 'Наконец-то разобралась с компонентным подходом в React! 🎉 Оказывается, передавать props очень удобно.',
      likes: 12,
      comments: 3,
      image: 'https://media.licdn.com/dms/image/v2/D4D12AQE1jct35mvvbA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1681071229259?e=2147483647&v=beta&t=p3YtTn8L_badY_CwBCC_ieYJo2cV2XjodrgSvVVzvsE'
    },
    {
      id: 2,
      author: currentUser, // Пост от текущего пользователя
      date: 'Вчера в 18:30',
      content: 'Работаю над новой лабораторной. Создаю социальную сеть. Пока все идет по плану! 💻',
      likes: 5,
      comments: 1,
      image: null // Пост без картинки
    },
    {
      id: 3,
      author: {
        name: 'Алексей Попов',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
      },
      date: '2 дня назад',
      content: 'Кто-нибудь может объяснить разницу между Virtual DOM и обычным DOM простыми словами?',
      likes: 8,
      comments: 15,
      image: null
    }
  ];