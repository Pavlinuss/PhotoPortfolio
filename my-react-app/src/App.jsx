// src/App.jsx
import { currentUser, friends, posts } from './data/mockData';
import Header from './components/layout/Header';
import UserProfile from './components/features/UserProfile';
import FriendList from './components/features/FriendList';
import PostCard from './components/features/PostCard';
import './App.css';

function App() {
  // Заглушки для обработчиков событий (как требует задание)
  const handleLike = (postId) => {
    console.log(`Лайк поставлен посту с ID: ${postId}`);
    // В будущем здесь будет логика изменения state
  };

  const handleShare = (postId) => {
    console.log(`Открыто окно "Поделиться" для поста с ID: ${postId}`);
  };

  return (
    <div className="app">
      <Header title="SocialNetwork" />
      
      <main className="container main-layout">
        {/* Левая колонка (Профиль и Друзья) */}
        <aside className="sidebar">
          <UserProfile user={currentUser} />
          <FriendList friends={friends} />
        </aside>

        {/* Правая колонка (Лента новостей) */}
        <section className="feed">
          <h2>Лента новостей</h2>
          <div className="feed__posts">
            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onLike={handleLike} 
                onShare={handleShare} 
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;