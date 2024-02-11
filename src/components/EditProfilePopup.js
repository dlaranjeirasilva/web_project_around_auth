import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const inputValidation = (e, setParameter) => {
    if (!e.target.checkValidity()) {
      setParameter(e.target.validationMessage);
    } else {
      setParameter('');
    }
  }

  const isSubmitDisabled = !nameError && !descriptionError;

  const handleNameChange = (e) => {
    setName(e.target.value);
    inputValidation(e, setNameError);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    inputValidation(e, setDescriptionError);
  }

  const handleClosePopup = () => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setNameError('');
    setDescriptionError('');
    props.onClose();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  return(
    <PopupWithForm
      title="Editar perfil"
      name="profile"
      submitButtonText="Salvar"
      isOpen={props.isOpen}
      onClose={handleClosePopup}
      onSubmit={handleSubmit}
      onSubmitValidation={!isSubmitDisabled}
    >
      <input
        id="name-input"
        className="form__input"
        type="text"
        name="name"
        placeholder="Nome"
        required
        value={name}
        onChange={handleNameChange}
        minLength="2"
        maxLength="40"
      />
      <span className={`form__input-error name-input-error ${nameError ? 'form__input-error_active' : ''}`}>
        {nameError}
      </span>
      <input
        id="about-me-input"
        className="form__input"
        type="text"
        name="about-me"
        placeholder="Sobre mim"
        required
        value={description}
        onChange={handleDescriptionChange}
        minLength="2"
        maxLength="80"
      />
      <span className={`form__input-error about-me-input-error ${descriptionError ? 'form__input-error_active' : ''}`}>
        {descriptionError}
      </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;