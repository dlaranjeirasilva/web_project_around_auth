import garbageCan from '../images/garbage-can.png';
import hollowHeart from '../images/hollow-heart.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';

function Card({
  card,
  onCardClick,
  onCardLike,
  onDeleteClick
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__garbage-can ${isOwn ? '' : 'card__garbage-can_hidden'}`
  );
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__button ${isLiked ? 'card__button_active' : ''}`;
  const cardLikeButtonAlt = isLiked ? 'Coração marcado' : 'Coração desmarcado';

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onDeleteClick(card);
  }

  return(
    <ul id={card._id} className="card">
      <img
        src={garbageCan}
        alt="Lixeira"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={handleClick}
      />
      <li className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__data">
          <img
            src={hollowHeart}
            alt={cardLikeButtonAlt}
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="card__likes">{card.likes.length}</p>
        </div>
      </li>
    </ul>
  );
}

export default Card;