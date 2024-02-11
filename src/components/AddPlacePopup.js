import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [nameError, setNameError] = useState('');
  const [linkError, setLinkError] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const inputValidation = (e, setParameter) => {
    if (!e.target.checkValidity()) {
      setParameter(e.target.validationMessage);
    } else {
      setParameter('');
    }
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
    inputValidation(e, setNameError);
  }

  const handleLinkChange = (e) => {
    setLink(e.target.value);
    inputValidation(e, setLinkError);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAddPlaceSubmit({
      name,
      link,
    });

    setName('');
    setLink('');
  }

  const handleClosePopup = () => {
    setName('');
    setLink('');
    setNameError('');
    setLinkError('');
    props.onClose();
  }

  useEffect(() => {
    if (name.trim() !== '' && link.trim() !== '' && !nameError && !linkError) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [name, link, nameError, linkError]);

  return(
    <PopupWithForm
      title="Novo Local"
      name="card"
      submitButtonText="Salvar"
      isOpen={props.isOpen}
      onClose={handleClosePopup}
      onSubmit={handleSubmit}
      onSubmitValidation={isSubmitDisabled}
    >
      <input
        id="title-input"
        className="form__input"
        type="text"
        name="title"
        placeholder="Título"
        onChange={handleNameChange}
        value={name}
        required
        minLength="2"
        maxLength="30"
      />
      <span className={`form__input-error title-input-error ${nameError ? 'form__input-error_active' : ''}`}>{nameError}</span>
      <input
        id="url-input"
        className="form__input"
        type="url"
        name="img_url"
        placeholder="Link da imagem"
        onChange={handleLinkChange}
        value={link}
        required
      />
      <span className={`form__input-error url-input-error ${linkError ? 'form__input-error_active' : ''}`}>{linkError}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;