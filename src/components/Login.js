import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import * as auth from "../utils/auth";
import errorIcon from "../images/errorIcon.png";
import InfoTooltip from "./InfoToolTip";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const navigate = useNavigate();

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } 
    if (name === "password") {
      setPassword(value);
    } 
  };

  const statusInfoTooltip = () => {
    return {
      icon: errorIcon,
      iconAlt: "Ícone de erro",
      message: "Ops, dados inválidos! Por favor, tente novamente.",
    };
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setIsInfoTooltipOpen(true);
      return;
    }

    auth.authorize(email, password)
    .then((res) => {
      
      if (res.token) {
        setEmail("");
        setPassword("");

        onLogin();
        setTimeout(() => {
          navigate("/web_project_around_react");
        }, 2000);
      } else {
        setIsInfoTooltipOpen(true);
      }
    })
    .catch((err) => {
      console.error(err);
      setIsInfoTooltipOpen(true);
      return err.message;
    });
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth.checkToken(jwt)
      .then((res) => {
        if (res) {
          onLogin();
          navigate("/web_project_around_react");
        }
      });
    }
  };

  tokenCheck();
  return (
    <>
    <InfoTooltip 
      isOpen={isInfoTooltipOpen}
      closeInfoTooltip={() => setIsInfoTooltipOpen(false)}
      statusInfoTooltip={statusInfoTooltip}
    />
    <AuthForm
      title='Entrar'
      submitButtonText='Entrar'
      onSubmit={handleSubmitLogin}
      redirectPage="/signup"
      redirectText='Ainda não é membro? Inscreva-se aqui!'
    >
      <input
        className="auth-section__input"
        value={email}
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChangeLogin}
      />
      <input
        className="auth-section__input"
        value={password}
        name="password"
        type="password"
        placeholder="Senha"
        onChange={handleChangeLogin}
      />
    </AuthForm>
  </>
  );
};

export default Login;