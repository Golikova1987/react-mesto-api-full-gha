export default function PopupWithForm({ name, title, button, children, isOpen, onClose, onSubmit, isLoadingSubmit, isValid=true }) {
  return (
    <section className={`popup popup_type_${name} ${isOpen && 'popup_is-opened'}`} onClick={onClose}>
      <div className="popup__container" onClick={(event => event.stopPropagation())}>
        <h2 className={`popup__title ${name === 'delete-card' && 'popup__title_type_delete'}`}>{title}</h2>
        <form
        className="popup__form popup__form_profile"
        name={name}
        noValidate
        onSubmit={onSubmit}
        >
          {children}
          <button type="submit" 
          className={`popup__button-save ${isLoadingSubmit ? 'popup__button-save_loading' : ''} ${isValid ? '' : 'popup__button-save_invalid'}`}
          disabled={isLoadingSubmit}
          >
          {isLoadingSubmit ? '' : button||'Сохранить'}
          </button>
        </form>
        <button className="popup__close" type="button" onClick={onClose} />
      </div>
    </section>
  )
}