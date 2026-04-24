
const LikeButton = ({ likesCount, onLike, postId }) => {
    return (
      <button className="action-btn like-btn" onClick={() => onLike(postId)}>
        ❤️ <span>{likesCount}</span>
      </button>
    );
  };
  
  export default LikeButton;