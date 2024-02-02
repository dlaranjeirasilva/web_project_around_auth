import PopupWithForm from "./PopupWithForm";

function DeleteConfirmationPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete(props.card);
  }

  return(
    <PopupWithForm
      title="Tem certeza?"
      name="delete"
      submitButtonText="Sim"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteConfirmationPopup;