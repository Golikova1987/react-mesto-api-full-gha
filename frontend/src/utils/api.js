class Api {
  constructor(options) {
    this._url = options.baseUrl;
    // this._headers = options.headers;
    // this._authorization = options.headers.authorization;
  }
//Проверка ответа сервера и преобразование из json
  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
}
//загрузка карточек с сервера
  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
   })
   .then(this._getResponseData)
  }
//загрузкам информации о пользователе с сервера
  getInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        // authorization: this._authorization
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._getResponseData)
  }
//сохранение отредактированного профиля на сервере
  setUserInfo(data, token) { 
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.description,
      })
    })
    .then(this._getResponseData)
  }
//обновление аватара
  setAvatar(data, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._getResponseData)
  }
//добавление новой карточки
  addCard(data, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.mesto,
        link: data.link,
      })
    })
    .then(this._getResponseData)
  }
//постановка лайка
  addLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        "Authorization" : `Bearer ${token}`
      } 
    })
    .then(this._getResponseData)
  }
  //удаление лайка
  deleteLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${token}`
      } 
    })
    .then(this._getResponseData) 
  }
//удаление карточек
  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._getResponseData)
  }

}
//создание экземпляра класса Api
const api = new Api({
  // baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  baseUrl: "http://localhost:3000",
  // baseUrl: "https://conejito.practicum.nomoredomainsicu.ru",
  // headers: {
  //   authorization: "4794d416-5184-43be-8376-438ba82ab5d1",
  //   "Content-Type": "application/json",
  // }
});

export default api;
