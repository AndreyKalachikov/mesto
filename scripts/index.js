// Переменные для профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopupElement = document.querySelector('.profile-popup');
const profilePopupCloseButtonElement = profilePopupElement.querySelector('.popup__close-button');
// Переменные для кнопки добавления карточки
const popupAddCardButtonElement = document.querySelector('.profile__add-button');
const addCardPopupElement = document.querySelector('.add-card-popup');
const addCardPopupCloseButtonElement = addCardPopupElement.querySelector('.popup__close-button');

// Переменные для формы профиля
const formElement = document.querySelector('#profile-form');
const nameInput = formElement.querySelector('#nameInput');
const jobInput = formElement.querySelector('#jobInput');
const profileName = document.querySelector('.profile__name');
const profilePersonal = document.querySelector('.profile__personal');

// Переменные для формы добавления карточки
const elementsContainer = document.querySelector('.elements');
const elementsTemplait = document.querySelector('#elements-template').content;
const addCardFormElement = document.querySelector('#add-card-form');
const titleInput = addCardFormElement.querySelector('#titleInput');
const linkInput = addCardFormElement.querySelector('#linkInput');

// Переменные для попапа открытия изображения
const openImagePopupElement =  document.querySelector('.open-image-popup');
const cardImage = openImagePopupElement.querySelector('.open-image-popup__image');
const cardTitle = openImagePopupElement.querySelector('.open-image-popup__title');
const closeImageButton = openImagePopupElement.querySelector('.popup__close-button');

// Данные исходных карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Функция добавления исходных карточек
function addInitialCards (someArr) {
  for (let i=0; i<someArr.length; i++) {
  const initialCard = elementsTemplait.querySelector('.elements__card').cloneNode(true);
  const initialCardImage = initialCard.querySelector('.elements__image');
  initialCardImage.src = someArr[i].link;
  initialCardImage.alt = someArr[i].name;
  initialCardImage.addEventListener('click', openImage);
  initialCard.querySelector('.elements__text').textContent = someArr[i].name;
  initialCard.querySelector('.elements__like-button').addEventListener('click', pressLike);
  initialCard.querySelector('.elements__delete-button').addEventListener('click', deleteCard);
  elementsContainer.append(initialCard);
  }
}
addInitialCards (initialCards);

// Функция сохранения внесенных в профиль изменений
function formSubmitHandler (evt) {
  evt.preventDefault()
  profileName.textContent = nameInput.value;
  profilePersonal.textContent = jobInput.value;
  removePopup(profilePopupElement)
}

// Функция добавления карточки
function addCard(evt) {
  evt.preventDefault()
  const elementsCard = elementsTemplait.querySelector('.elements__card').cloneNode(true);
  const elementsCardImage = elementsCard.querySelector('.elements__image');
  elementsCardImage.src = linkInput.value;
  elementsCardImage.alt = titleInput.value;
  elementsCardImage.addEventListener('click', openImage);
  elementsCard.querySelector('.elements__text').textContent = titleInput.value;
  elementsCard.querySelector('.elements__like-button').addEventListener('click', pressLike);
  elementsCard.querySelector('.elements__delete-button').addEventListener('click', deleteCard);
  elementsContainer.prepend(elementsCard);

  titleInput.value = '';
  linkInput.value = '';
  removePopup(addCardPopupElement)
}

// Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.elements__card').remove();
}

// Функция активатор лайка
function pressLike(evt) {
  evt.target.classList.toggle('elements__like-button_pressed');
}

// Функция открытия попапа с картинкой
function openImage(evt) {
  const openImagePopupElement = document.querySelector('.open-image-popup');
  const cardImage = openImagePopupElement.querySelector('.open-image-popup__image');
  const cardTitle = openImagePopupElement.querySelector('.open-image-popup__title');

  openImagePopupElement.classList.add('popup_opened');

  const imageTarget = evt.target;
  cardTitle.textContent = imageTarget.alt;
  cardImage.src = imageTarget.src;
}


// Функции открытия и закрытия попапа
function addPopup(anyPopup) {
  anyPopup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profilePersonal.textContent;
}
const removePopup = function(anyPopup) {
  anyPopup.classList.remove('popup_opened');
}

// Слушатели событий на кнопках
profileEditButton.addEventListener('click', () => addPopup(profilePopupElement));
profilePopupCloseButtonElement.addEventListener('click', () => removePopup(profilePopupElement));
formElement.addEventListener('submit', formSubmitHandler);

popupAddCardButtonElement.addEventListener('click', () => addPopup(addCardPopupElement));
addCardPopupCloseButtonElement.addEventListener('click', () => removePopup(addCardPopupElement));
addCardFormElement.addEventListener('submit', addCard);

closeImageButton.addEventListener('click', () => removePopup(openImagePopupElement));
