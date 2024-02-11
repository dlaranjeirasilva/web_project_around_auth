import closeIcon from '../images/close-icon.png';

function InfoTooltip({ isOpen, closeInfoTooltip, statusInfoTooltip }) {
  return(
    <section id="modal-popup" className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div className="modal__popup-container">
        <img
          id="popup-modal__button"
          className="modal__popup-button"
          src={closeIcon}
          alt="Ícone para fechar"
          onClick={closeInfoTooltip}
        />
        <div className="modal__popup-tool-tip">
        <img
          src={statusInfoTooltip().icon}
          alt={statusInfoTooltip().iconAlt}
          className="modal__popup-icon"
        />
        <h2 className="modal__popup-message">{statusInfoTooltip().message}</h2>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;