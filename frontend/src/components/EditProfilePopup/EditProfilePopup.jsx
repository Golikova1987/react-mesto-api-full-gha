import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import useFormValidation from "../../utils/useFormValidation.js";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoadingSubmit }) {
  const currentUser = useContext(CurrentUserContext)
  const { value, error, isValid, isInputValid, handleChange, reset, setValues } = useFormValidation();
 
    useEffect(() => {
      setValues("name", currentUser.name)
      setValues("description", currentUser.about)
    },[currentUser, setValues])

    function resetClose() {
      onClose()
      reset({name: currentUser.name, description: currentUser.about })
    }

    function handleSubmit(e) {
      e.preventDefault()
      onUpdateUser({ name: value.name, description: value.description}, reset)
    }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={resetClose}
      isValid={isValid}
      isLoadingSubmit={isLoadingSubmit}
      onSubmit={handleSubmit}
    >
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Имя"
        className={`popup__input popup__input_text_name ${isInputValid.name === undefined || isInputValid.name ? '' : 'popup__input_error'}`}
        required=""
        minLength={2}
        maxLength={40}
        onChange={handleChange}
        value={value.name ? value.name : ""}
        disabled={isLoadingSubmit}
      />
      <span className="popup__error" id="name-error">
        {error.name}
      </span>
      <input
        id="description"
        name="description"
        type="text"
        placeholder="О себе"
        className={`popup__input popup__input_text_description ${isInputValid.description === undefined || isInputValid.description ? '' : 'popup__input_error'}`}
        required=""
        minLength={2}
        maxLength={200}
        onChange={handleChange}
        value={value.description ? value.description : ""}
        disabled={isLoadingSubmit}
      />
      <span className="popup__error" id="description-error">
        {error.description}
      </span>
    </PopupWithForm>
  );
}
