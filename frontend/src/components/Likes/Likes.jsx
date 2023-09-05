import { useEffect, useState } from "react"
import api from "../../utils/api"

export default function Likes({ likes, myid, cardid}) {
  const [isLike, setIsLike] = useState(false)
  const [count, setCount] =useState(likes.length)

  useEffect(() => {
    setIsLike(likes.some(element => myid === element._id))
  }, [likes, myid])

  function handleCardLike() {
    if (isLike) {
      api.deleteLike(cardid, localStorage.jwt)
        .then(res => {
          // console.dir(res);
          setIsLike(false)
          setCount(res.likes.length)
        })
        .catch((err) => console.error(`Ошибка снятия лайка ${err}`))
    } else {
      api.addLike(cardid, localStorage.jwt)
        .then(res => {
          setIsLike(true)
          setCount(res.likes.length)
        })
        .catch((err) => console.error(`Ошибка при добавлении лайка ${err}`))
    }
  }

  return (
    <div className="cards__like-elements">
      <button className={`cards__button-like ${isLike ? 'cards__button-like_active' : ''}`} type="button" onClick={handleCardLike}/>
      <span className="cards__number-likes">{count}</span>
    </div>
  )
}