import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useCallback, useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";

import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import { auth } from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteCard, setDeleteCard] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const setStatesCloseAllPopups = useCallback(() => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopup(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }, []);

  const closePopupOnEsc = useCallback(
    (event) => {
      if (event.key === "Escape") {
        setStatesCloseAllPopups();
        document.removeEventListener("keydown", closePopupOnEsc);
      }
    },
    [setStatesCloseAllPopups]
  );

  const closeAllPopups = useCallback(() => {
    setStatesCloseAllPopups();
    document.removeEventListener("keydown", closePopupOnEsc);
  }, [setStatesCloseAllPopups, closePopupOnEsc]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEvantListenersDocument();
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEvantListenersDocument();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEvantListenersDocument();
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopup(true);
    setEvantListenersDocument();
  }

  function handleCardDelete(cardId) {
    setDeleteCard(cardId);
    setIsDeleteCardPopupOpen(true);
    setEvantListenersDocument();
  }

  function setEvantListenersDocument() {
    document.addEventListener("keydown", closePopupOnEsc);
  }

  useEffect(() => {
    setIsLoading(true);
    loggedIn &&
      Promise.all([
        api.getInfo(localStorage.jwt),
        api.getInitialCards(localStorage.jwt),
      ])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
          setIsLoading(false);
        })
        .catch((err) => console.error(`Ошибка при загрузке ${err}`));
  }, [loggedIn]);

  useEffect(() => {
    const tokenCheck = () => {
      const token = localStorage.getItem("jwt");
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/");
            setUserEmail(res.email);
          }
        })
        .catch((err) =>
          console.error(`Ошибка авторизации при повторном входе ${err}`)
        );
    };
    tokenCheck();
  }, [navigate]);

  function handleDeleteCardSubmit(event) {
    event.preventDefault();
    setIsLoadingSubmit(true);
    api
      .deleteCard(deleteCard, localStorage.jwt)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return card._id !== deleteCard;
          })
        );
        closeAllPopups();
        setIsLoadingSubmit(false);
      })
      .catch((err) => console.error(`Ошибка удаления карточки ${err}`))
      .finally(() => setIsLoadingSubmit(false));
  }

  function handleUpdateUser(data, reset) {
    setIsLoadingSubmit(true);
    api
      .setUserInfo(data, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
        setIsLoadingSubmit(false);
      })
      .catch((err) => console.error(`Ошибка редактирования профиля ${err}`))
      .finally(() => setIsLoadingSubmit(false));
  }

  function handleUpdateAvatar(data, reset) {
    setIsLoadingSubmit(true);
    api
      .setAvatar(data, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
        setIsLoadingSubmit(false);
      })
      .catch((err) => console.error(`Ошибка редактирования аватара ${err}`))
      .finally(() => setIsLoadingSubmit(false));
  }

  // function handleAddPlaceSubmit(data, reset) {
  //   setIsLoadingSubmit(true);
  //   api
  //     .addCard(data, localStorage.jwt)
  //     .then((res) => {
  //       // console.dir(res);
  //       setCards([res, ...cards]);
  //       closeAllPopups();
  //       reset();
  //       setIsLoadingSubmit(false);
  //     })
  //     .catch((err) => console.error(`Ошибка добавления карточки ${err}`))
  //     .finally(() => setIsLoadingSubmit(false));
  // }

  function handleAddPlaceSubmit(data, reset) {
    setIsLoadingSubmit(true);
    api
      .addCard(data, localStorage.jwt)
      .then(({ data }) => {
        // console.dir(data);
        setCards([data, ...cards]);
        closeAllPopups();
        reset();
        setIsLoadingSubmit(false);
      })
      .catch((err) => console.error(`Ошибка добавления карточки ${err}`))
      .finally(() => setIsLoadingSubmit(false));
  }


  function handleRegister(value) {
    const { email, password } = value;
    auth
      .registration(email, password)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setIsSuccess(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setIsSuccess(false);
        console.error(`Ошибка регистрации ${err}`);
      });
  }

  function handleLogin({ email, password }) {
    auth
      .authorization(email, password)
      .then(() => {
        setLoggedIn(true);
        setUserEmail(email);
        navigate("/");
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setIsSuccess(false);
        console.error(`Ошибка авторизации ${err}`);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setUserEmail("");
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header email={userEmail} loggedIn={loggedIn} onLogout={handleLogout} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} />}
          />
          <Route
            path="/sign-up"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoadingSubmit={isLoadingSubmit}
        />

        <AddPlacePopup
          onClose={closeAllPopups}
          isLoadingSubmit={isLoadingSubmit}
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isLoadingSubmit={isLoadingSubmit}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          button="Да"
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeleteCardSubmit}
          isLoadingSubmit={isLoadingSubmit}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
