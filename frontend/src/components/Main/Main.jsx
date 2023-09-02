import { useContext } from "react";
import Card from "../Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Spinner from "../Spinner/Spinner.jsx";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardDelete,
  cards,
  isLoading
}) {
  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <button
            type="button"
            className="profile__edit-avatar"
            onClick={onEditAvatar}
          >
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватарка" />
          </button>
          <div className="profile__info">
            <div className="profile__name-container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button
            className="profile__add-button"
            type="button"
            onClick={onAddPlace}
          />
        </div>
      </section>
      <section aria-label="Карточки с фотографиями" className="photos">
        <div className="cards">
          {isLoading ? <Spinner/> : cards.map((data) => {
            return (
              <Card card={data} key={data._id} onCardClick={onCardClick} onCardDelete={onCardDelete}/>
            )
          })}
          {/* <Spinner/> */}
        </div>
      </section>
    </main>
  );
}
