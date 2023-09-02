import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Likes from "../Likes/Likes.jsx";

export default function Card({ card, onCardClick, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext)
  
  return (
    <article className="cards__element">
      {currentUser._id === card.owner._id && <button className="cards__button-delete" type="button" onClick={() => onCardDelete(card._id)}/>}
      <img
        className="cards__photo"
        src={card.link}
        alt={`Изображение ${card.name}`}
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className="cards__name">
        <h2 className="cards__title">{card.name}</h2>
        {/* <div className="cards__like-elements">
          <button className="cards__button-like" type="button" />
          <span className="cards__number-likes">{card.likes.length}</span>
        </div> */}
        <Likes likes={card.likes} myid={currentUser._id} cardid={card._id} />
      </div>
    </article>
  );
}
