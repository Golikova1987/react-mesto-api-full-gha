export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <section className={`popup popup_background ${isOpen && 'popup_is-opened'}`} id="popup-image" onClick={onClose}>
      <figure className="popup__image-container" onClick={(event => event.stopPropagation())}>
        <img className="popup__image" src={card.link} alt={`Изображение ${card.name}`}/>
        <figcaption className="popup__caption">{card.name}</figcaption>
        <button className="popup__close" type="button" onClick={onClose}/>
      </figure>
    </section>
  )
}