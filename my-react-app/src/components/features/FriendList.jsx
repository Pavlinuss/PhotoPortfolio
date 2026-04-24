import Card from '../ui/Card';
import Avatar from '../ui/Avatar';

const FriendList = ({ friends }) => {
  return (
    <Card className="friend-list">
      <h3>Мои друзья ({friends.length})</h3>
      <div className="friend-list__items">
        {friends.map(friend => (
          <div key={friend.id} className="friend-item">
            <Avatar src={friend.avatar} alt={friend.name} size="small" online={friend.online} />
            <span className="friend-item__name">{friend.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default FriendList;