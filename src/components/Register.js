import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import successIcon from "../images/successIcon.png";
import errorIcon from "../images/errorIcon.png";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoToolTip";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [stateInfoTooltip, setStateInfoTooltip] = useState(false);
  const navigate = useNavigate();

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } 
    if (name === "password") {
      setPassword(value);
    } 
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();

    const openInfoTooltip = () => {
      setIsInfoTooltipOpen(true);
    };

    auth.register(email, password)
    .then((res) => {
      const { _id, email } = res.data || {};
      
      openInfoTooltip();
      setStateInfoTooltip(_id && email ? true : false);
      
      if(_id && email) {
        onRegister();
        setTimeout(() => {
          navigate('/signin')
        }, 2000);
      } else {
        console.log(res.error)
        openInfoTooltip();
        setStateInfoTooltip(false);
      }
    })
    .catch((err) => {
      console.error(err.message);
      return err.message;
    });
  };

  const statusInfoTooltip = () => {
    if (stateInfoTooltip) {
      return {
        icon: successIcon,
        iconAlt: "Ícone de sucesso",
        message: "Vitória! Você está cadastrado.",
      };
    } else {
      return {
        icon: errorIcon,
        iconAlt: "Ícone de erro",
        message: "Ops, algo saiu errado! Por favor, tente novamente.",
      };
    }
  };

  const closeInfoTooltip = () => {
    setIsInfoTooltipOpen(false);
  };

  return (
    <>
    <InfoTooltip 
      isOpen={isInfoTooltipOpen}
      closeInfoTooltip={closeInfoTooltip}
      statusInfoTooltip={statusInfoTooltip}
    />
    <AuthForm
      title='Inscrever-se'
      submitButtonText='Inscrever-se'
      onSubmit={handleSubmitRegister}
      redirectPage="/signin"
      redirectText='Já é um membro? Faça o login aqui!'
    >
      <input
        className="auth-section__input"
        value={email}
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChangeRegister}
      />
      <input
        className="auth-section__input"
        value={password}
        name="password"
        type="password"
        placeholder="Senha"
        onChange={handleChangeRegister}
      />
    </AuthForm>
  </>
  );
  }
  
  export default Register;