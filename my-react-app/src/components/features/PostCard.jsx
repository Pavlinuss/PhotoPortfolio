import Card from '../ui/Card';
import Avatar from '../ui/Avatar';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';

const PostCard = ({ post, onLike, onShare }) => {
  return (
    <Card className="post-card">
      <div className="post-card__header">
        <Avatar src={post.author.avatar} alt={post.author.name} size="medium" />
        <div className="post-card__author-info">
          <h4>{post.author.name}</h4>
          <span className="post-card__date">{post.date}</span>
        </div>
      </div>
      
      <div className="post-card__content">
        <p>{post.content}</p>
        {/* Условный рендеринг картинки */}
        {post.image && (
          <img src={post.image} alt="Post content" className="post-card__image" />
        )}
      </div>

      <div className="post-card__actions">
        <LikeButton likesCount={post.likes} onLike={onLike} postId={post.id} />
        <button className="action-btn comment-btn">
          💬 <span>{post.comments}</span>
        </button>
        <ShareButton onShare={onShare} postId={post.id} />
      </div>
    </Card>
  );
};

export default PostCard;