import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import useFormValidation from "../../utils/useFormValidation.js";


export default function AddPlacePopup({isOpen, onClose, onAddPlace, isLoadingSubmit}) {

  const { value, error, isValid, isInputValid, handleChange, reset } = useFormValidation();

  function resetClose() {
    onClose()
    reset()
  }

  function handleSubmit(e) {
    e.preventDefault()
    onAddPlace({ mesto: value.mesto, link: value.link}, reset)
  }


  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      button="Создать"
      isOpen={isOpen}
      onClose={resetClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      isLoadingSubmit={isLoadingSubmit}
    >
      <input
        id="mesto"
        name="mesto"
        type="text"
        placeholder="Название"
        className={`popup__input popup__input_name ${isInputValid.mesto === undefined || isInputValid.mesto ? '' : 'popup__input_error'}`}
        required=""
        minLength={2}
        maxLength={30}
        onChange={handleChange}
        value={value.mesto ? value.mesto : ""}
        disabled={isLoadingSubmit}
      />
      <span className="popup__error" id="mesto-error">{error.mesto}</span>
      <input
        id="link"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        className={`popup__input popup__input_link ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input_error'}`}
        required=""
        onChange={handleChange}
        value={value.link ? value.link : ""}
        disabled={isLoadingSubmit}
      />
      <span className="popup__error" id="link-error">{error.link}</span>
    </PopupWithForm>
  )
}