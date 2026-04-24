
const Avatar = ({ src, alt, size = 'medium', online = false }) => {
    return (
      <div className={`avatar-container avatar--${size}`}>
        <img src={src} alt={alt} className="avatar-img" />
        {online && <span className="avatar-online-badge"></span>}
      </div>
    );
  };
  
  export default Avatar;