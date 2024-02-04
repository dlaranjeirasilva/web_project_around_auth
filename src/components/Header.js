import logo from '../images/logo__image.png';

function Header(props) {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Logo do site 'Around the US'"
        className="header__logo"
      />
      <p className='header__access'>{props.headerAccess}</p>
    </header>
  );
}

export default Header;