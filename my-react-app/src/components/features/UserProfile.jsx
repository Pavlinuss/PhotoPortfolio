import Card from '../ui/Card';
import Avatar from '../ui/Avatar';

const UserProfile = ({ user }) => {
  return (
    <Card className="user-profile">
      <div className="user-profile__header">
        <Avatar src={user.avatar} alt={user.fullName} size="large" online={true} />
        <h2 className="user-profile__name">{user.fullName}</h2>
        <span className="user-profile__username">@{user.username}</span>
      </div>
      <p className="user-profile__bio">{user.bio}</p>
      <div className="user-profile__stats">
        <div className="stat-item">
          <strong>{user.postsCount}</strong>
          <span>Постов</span>
        </div>
        <div className="stat-item">
          <strong>{user.friendsCount}</strong>
          <span>Друзей</span>
        </div>
      </div>
    </Card>
  );
};

export default UserProfile;