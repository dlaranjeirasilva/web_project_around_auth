import PopupWithForm from "./PopupWithForm";
import { useContext, useRef, useState } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  const currentUser = useContext(CurrentUserContext)
  const avatarRef = useRef("");
  const [linkError, setLinkError] = useState('');

  const isSubmitDisabled = !linkError;

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  const handleLinkChange = (e) => {
    if (!e.target.checkValidity()) {
      setLinkError(e.target.validationMessage);
    } else {
      setLinkError('');
    }
  }

  function handleClosePopup() {
    avatarRef.current.value = currentUser.avatar;
    setLinkError('');
    props.onClose();
  }

  return(
    <PopupWithForm
      title="Alterar a foto do perfil"
      name="avatar"
      submitButtonText="Salvar"
      isOpen={props.isOpen}
      onClose={handleClosePopup}
      onSubmit={handleSubmit}
      onSubmitValidation={!isSubmitDisabled}
    >
      <input
        id="avatar-input"
        className="form__input"
        type="url"
        name="avatar_url"
        placeholder="Link da imagem de avatar"
        required
        ref={avatarRef}
        defaultValue={currentUser.avatar}
        onChange={handleLinkChange}
      />
      <span className={`form__input-error avatar-input-error ${linkError ? 'form__input-error_active' : ''}`}>{linkError}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;