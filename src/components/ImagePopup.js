import closeIcon from '../images/close-icon.png';

function ImagePopup({card, onClose}) {
  return(
    <section id="modal-popup" className={`modal ${card ? 'modal_opened' : ''}`}>
      <div className="modal__popup-container">
        <img
          id="popup-modal__button"
          className="modal__popup-button"
          src={closeIcon}
          alt="Ícone para fechar"
          onClick={onClose}
        />
        {card && (
          <div className="modal__popup-info">
            <img
              src={card.link}
              alt={card.name}
              className="modal__popup-image"
            />
            <h2 className="modal__popup-title">{card.name}</h2>
          </div>
        )}
      </div>
    </section>
  );
}

export default ImagePopup;