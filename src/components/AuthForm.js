import { Link } from "react-router-dom";

function AuthForm({
  title, 
  submitButtonText,
  onSubmit,
  redirectPage,
  redirectText,
  children
}) {

  return(
    <section className="auth-section">
      <div className="auth-section__container">
        <form className="auth-section__form" noValidate onSubmit={onSubmit}>
          <h2 className="auth-section__title">{title}</h2>
          {children}
          <button type="submit" className="auth-section__button">
            {submitButtonText}
          </button>
          <Link to={redirectPage} className="auth-section__link">
            {redirectText}
          </Link>
        </form>
      </div>
    </section>
  );
}

export default AuthForm;