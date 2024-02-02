import pencilIcon from '../images/pencil-icon.svg';
import Card from './Card';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  cards,
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onDeleteClick,
  onCardLike,
  onCardClick,
  children
}) {
  const currentUser = useContext(CurrentUserContext);

  return(
    <main className="main">

      {children}

      <section className="profile">
        <div className="profile__container">
          <div className="spinner"></div>
          <img
          src={currentUser.avatar}
          alt="Imagem de perfil do usuário"
            className="profile__avatar"
          />
          <img
            src={pencilIcon}
            alt="Lápis do botão de edição de avatar"
            className="profile__edit-avatar"
            onClick={onEditAvatarClick}
          />
        </div>
        <div className="profile-info">
          <h2 className="profile-info__name">{currentUser.name}</h2>
          <p className="profile-info__about-me">{currentUser.about}</p>
          <img
            id="profile-modal"
            src={pencilIcon}
            alt="Lápis do botão de edição de perfil"
            className="profile-info__button"
            onClick={onEditProfileClick}
          />
        </div>
        <input
          id="addCard_modal"
          className="profile__button"
          type="button"
          value="+"
          onClick={onAddPlaceClick}
        />
      </section>

      <section className="cards">
        {cards.map(card => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;