import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteConfirmationPopup from './DeleteConfirmationPopup';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)
  const [selectedDeletionCard, setSelectedDeletionCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
    } else {
      api.removeLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
    }
  }

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
  }

  function handleAddPlaceSubmit(cardData) {
    api.addNewCard(cardData.name, cardData.link)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups();
      });
  }

  useEffect(() => {
    api.getInitialCards()
      .then(cardData => {
        setCards(cardData)
      })
  }, []);

  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser(data);
      })
  }, []);

  const handleAuth = () => {
    setLoggedIn(true);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleDeleteClick = (card) => {
    setSelectedDeletionCard(card)
    setDeletePopupOpen(true)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  };

  const handleUpdateUser = (userData) => {
    api.editUser(userData.name, userData.about)
      .then((updatedData) => {
        setCurrentUser(updatedData)
        closeAllPopups();
      });
  }

  const handleUpdateAvatar = (avatarData) => {
    api.updateAvatar(avatarData.avatar)
      .then((updatedAvatar) => {
        setCurrentUser(updatedAvatar);
        closeAllPopups();
      });
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setDeletePopupOpen(false)
    setSelectedCard(null)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <BrowserRouter>
        <div className="page">
          <Header />
          <Routes>
            <Route path="/signin" element={
              <Login onLogin={handleAuth} />
            }
            />
            <Route path="/signup" element={
              <Register onRegister={handleAuth} />
            }
            />
            <Route path="/" element={loggedIn ? (
                  <Navigate to="/web_project_around_react" replace />
                ) : (
                  <Navigate to="/signin" replace />
                )
            }
            />
            <Route path="/web_project_around_react" element={
              <ProtectedRoute
                loggedIn={loggedIn}
                children={
                  <>
                    <Main 
                      cards={cards}
                      onEditProfileClick={handleEditProfileClick}
                      onAddPlaceClick={handleAddPlaceClick}
                      onEditAvatarClick={handleEditAvatarClick}
                      onDeleteClick={handleDeleteClick}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                      onCardClick={handleCardClick}
                    >
                      <EditProfilePopup 
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                      />

                      <AddPlacePopup 
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlaceSubmit={handleAddPlaceSubmit}
                      />

                      <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                      />

                      <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                      />
                      
                      <DeleteConfirmationPopup
                        isOpen={isDeletePopupOpen}
                        onClose={closeAllPopups}
                        onCardDelete={handleCardDelete}
                        card={selectedDeletionCard}
                      />
                    </Main>
                  </>
                }
                />
              }
            /> 
          </Routes>
          <Footer />  
        </div>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
