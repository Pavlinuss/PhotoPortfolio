const Header = ({ title }) => {
    return (
      <header className="header">
        <div className="container header__content">
          <h1>{title}</h1>
          <div className="header__search">
            <input type="text" placeholder="Поиск людей и записей..." />
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;