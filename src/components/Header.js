import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as auth from "../utils/auth";
import logo from '../images/logo__image.png';

function Header() {
  const [email, setEmail] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
  
    if (jwt) {
      auth.checkToken(jwt)
      .then((res) => {
        if(res.data.email) {
          setEmail(res.data.email);
        } else {
          setEmail('');
        }
      })
    }
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setEmail('')
  };

  function getPathInfo() {
    const pathname = location.pathname;
  
    if (pathname === "/web_project_around_react") {
      return {
        headerText: "Sair",
        user: email,
        onClick: () => {
          handleLogout();
          navigate("/signin");
        },
      };
    } else if (pathname === "/signup") {
      return {
        headerText: "Entrar",
        onClick: () => {
          handleLogout();
          navigate("/signin");
        },
      };
    } else if (pathname === "/signin") {
      return {
        headerText: "Inscrever-se",
        link: "/singup",
        onClick: () => {
          handleLogout();
          navigate("/signup");
        },
      };
    } else {
      return { link: "/" };
    }
  }
  
  const { headerText, user, onClick } = getPathInfo();

  return (
    <header className="header">
      <img
        src={logo}
        alt="Logo do site 'Around the US'"
        className="header__logo"
      />
      <div className="header-auth">
        <p className='header-auth__access' onClick={onClick}>{ user || headerText }</p>
        { user &&
          <button className="header-auth__action" onClick={onClick}>
            { headerText }
          </button>
        }
      </div>
    </header>
  );
}

export default Header;