// Переменные для профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopupElement = document.querySelector('.profile-popup');
const profilePopupCloseButtonElement = profilePopupElement.querySelector('.popup__close-button');
// Переменные для кнопки добавления карточки
const popupAddCardButtonElement = document.querySelector('.profile__add-button');
const addCardPopupElement = document.querySelector('.add-card-popup');
const addCardPopupCloseButtonElement = addCardPopupElement.querySelector('.popup__close-button');


// Переменные для формы профиля
let formElement = document.querySelector('#profile-form');
let nameInput = formElement.querySelector('#nameInput');
let jobInput = formElement.querySelector('#jobInput');
let profileName = document.querySelector('.profile__name');
let profilePersonal = document.querySelector('.profile__personal');

// Функция сохранения внесенных в профиль изменений
function formSubmitHandler (evt) {
  evt.preventDefault()
  profileName.textContent = nameInput.value;
  profilePersonal.textContent = jobInput.value;
removePopup(profilePopupElement)
}


// Переменные для формы добавления карточки
const elementsContainer = document.querySelector('.elements');
const elementsTemplait = document.querySelector('#elements-template').content;
let addCardFormElement = document.querySelector('#add-card-form');
let titleInput = addCardFormElement.querySelector('#titleInput');
let linkInput = addCardFormElement.querySelector('#linkInput');

// Функция добавления карточки
function addCard(evt) {
  evt.preventDefault()
  const elementsCard = elementsTemplait.querySelector('.elements__card').cloneNode(true);
  elementsCard.querySelector('.elements__text').textContent = titleInput.value;
  elementsCard.querySelector('.elements__image').src = linkInput.value;
  elementsCard.querySelector('.elements__like-button').addEventListener('click', pressLike)
  elementsContainer.prepend(elementsCard);

  titleInput.value = '';
  linkInput.value = '';
  removePopup(addCardPopupElement)
}

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

// Функция активатор лайка
function pressLike(evt) {
  evt.target.classList.toggle('elements__like-button_pressed');
}

// Функция добавления исходных карточек
function addInitialCards (someArr) {
  for (let i=0; i<someArr.length; i++) {
  const initialCard = elementsTemplait.querySelector('.elements__card').cloneNode(true);
  initialCard.querySelector('.elements__text').textContent = someArr[i].name;
  initialCard.querySelector('.elements__image').src = someArr[i].link;
  initialCard.querySelector('.elements__like-button').addEventListener('click', pressLike)
  elementsContainer.append(initialCard);
  }
}
addInitialCards (initialCards);


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















// Ориентир кнопки лайка для следующей проектной работы
// let likeButtons = document.querySelectorAll('.elements__like-button');
// for(let i = 0; i < likeButtons.length ; i++) {
//   likeButtons[i].addEventListener('click', function () {
//     likeButtons[i].classList.toggle('elements__like-button_pressed');
//   });
// }
