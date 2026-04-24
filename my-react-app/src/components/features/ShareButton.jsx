const ShareButton = ({ onShare, postId }) => {
    return (
      <button className="action-btn share-btn" onClick={() => onShare(postId)}>
        ↗️ Поделиться
      </button>
    );
  };
  
  export default ShareButton;