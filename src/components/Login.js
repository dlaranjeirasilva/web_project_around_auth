import { Link, withRouter } from 'react-router-dom';
import Header from './Header';

function Login() {
  return(
    <>
    <Header headerAccess='Entrar' />
    <div className="login">
      <p className="login__welcome">
        Bem vindo de volta!
      </p>
      <form onSubmit={this.handleSubmit} className="login__form">
        <label htmlFor="username">
          Nome de usuário:
        </label>
        <input required id="username" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
        <label htmlFor="password">
          Senha::
        </label>
        <input required id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
        <div className="login__button-container">
          <button type="submit" onSubmit={this.handleSubmit} className="login__link">Faça o login</button>
        </div>
      </form>

      <div className="login__signup">
        <p>Pronto para começar sua jornada?</p>
        <Link to="/register" className="signup__link">Inscrever-se</Link>
      </div>
    </div>
    </>
  );
}

export default withRouter(Login);