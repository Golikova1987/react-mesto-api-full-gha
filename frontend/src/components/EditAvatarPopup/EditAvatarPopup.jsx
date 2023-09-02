import { useRef } from "react";
import useFormValidation from "../../utils/useFormValidation.js";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoadingSubmit }) {
  const { value, error, isValid, isInputValid, handleChange, reset } = useFormValidation()
  const input = useRef()

  function resetClose() {
    onClose()
    reset()
  }

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({avatar: input.current.value}, reset)
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={resetClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        className={`popup__input popup__input_avatar ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__input_error'}`}
        name="avatar"
        id="avatar"
        type="url"
        placeholder="ссылка на картинку"
        required=""
        ref={input}
        value={value.avatar ? value.avatar : ""}
        disabled={isLoadingSubmit}
        onChange={handleChange}
      />
      <span className="popup__error" id="avatar-error">{error.avatar}</span>
    </PopupWithForm>
  )
}