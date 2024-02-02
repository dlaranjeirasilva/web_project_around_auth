import logo from '../images/logo__image.png';

function Header() {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Logo do site 'Around the US'"
        className="header__logo"
      />
    </header>
  );
}

export default Header;