// Переменные для профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopupElement = document.querySelector('.profile-popup');
const profilePopupCloseButtonElement = profilePopupElement.querySelector('.popup__close-button');
// Переменные для кнопки добавления карточки
const popupAddCardButtonElement = document.querySelector('.profile__add-button');
const popupAddCardElement = document.querySelector('.add-card-popup');
const popupAddCardCloseButtonElement = popupAddCardElement.querySelector('.popup__close-button');

// Переменные для формы профиля
const formElement = document.querySelector('#profile-form');
const nameInput = formElement.querySelector('#nameInput');
const jobInput = formElement.querySelector('#jobInput');
const profileName = document.querySelector('.profile__name');
const profilePersonal = document.querySelector('.profile__personal');
const formElementSubmitButton = formElement.querySelector('.popup__submit-button');

// Переменные для формы добавления карточки
const elementsContainer = document.querySelector('.elements');
const elementsTemplait = document.querySelector('#elements-template').content;
const cardAddFormElement = document.querySelector('#card-add-form');
const titleInput = cardAddFormElement.querySelector('#titleInput');
const linkInput = cardAddFormElement.querySelector('#linkInput');
const cardAddFormSubmitButton = cardAddFormElement.querySelector('.popup__submit-button');

// Переменные для попапа открытия изображения
const imageOpenPopupElement =  document.querySelector('.open-image-popup');
const cardImage = imageOpenPopupElement.querySelector('.popup__image');
const cardTitle = imageOpenPopupElement.querySelector('.popup__image-title');
const imageCloseButton = imageOpenPopupElement.querySelector('.popup__close-button');

// Функция создания карточки
function addCard(elementsCardName, elementsCardLink) {
  const elementsCard = elementsTemplait.cloneNode(true);
  const elementsCardImage = elementsCard.querySelector('.elements__image');
  const elementsCardTitle = elementsCard.querySelector('.elements__text');

  elementsCardImage.src = elementsCardLink;
  elementsCardImage.alt = elementsCardName;
  elementsCardTitle.textContent = elementsCardName;

  elementsCardImage.addEventListener('click', openImage);
  elementsCard.querySelector('.elements__like-button').addEventListener('click', pressLike);
  elementsCard.querySelector('.elements__delete-button').addEventListener('click', deleteCard);

  return elementsCard;
}

// Добавляем 6 исходных карточек из массива
initialCards.forEach(arrayElement => {
  elementsContainer.append(addCard(arrayElement.name, arrayElement.link));
});

// Функция добавления новой карточки на страницу
function addCardformSubmitHandler (evt) {
  evt.preventDefault()

  const newCardElement = addCard(titleInput.value, linkInput.value);
  elementsContainer.prepend(newCardElement);

  removePopup(popupAddCardElement)
}

// Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.elements__card').remove();
}

// Функция сохранения внесенных в профиль изменений
function formSubmitHandler (evt) {
  evt.preventDefault()
  profileName.textContent = nameInput.value;
  profilePersonal.textContent = jobInput.value;
  removePopup(profilePopupElement)
}

// Функция активатор лайка
function pressLike(evt) {
  evt.target.classList.toggle('elements__like-button_pressed');
}

// Функции открытия и закрытия попапа (+ добавляем/удаляем слушателя события для закрытия через Escape)
function addPopup(anyPopup) {
  anyPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByClickOnEscapeButton);
}
const removePopup = function(anyPopup) {
  anyPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByClickOnEscapeButton);
}

// Функция открытия попапа редактирования профиля
function openPropfilePopup() {
  nameInput.value = profileName.textContent;
  hideInputError(formElement, nameInput, 'popup__form-element_type_error', 'popup__input-error_active');
  jobInput.value = profilePersonal.textContent;
  hideInputError(formElement, jobInput, 'popup__form-element_type_error', 'popup__input-error_active');
  enableSubmitButton(formElementSubmitButton, 'popup__submit-button_disabled');
  addPopup(profilePopupElement);
  }

// Функция открытия попапа добавления карточки
function openAddCardPopup() {
  cardAddFormElement.reset();
  hideInputError(cardAddFormElement, titleInput, 'popup__form-element_type_error', 'popup__input-error_active');
  hideInputError(cardAddFormElement, linkInput, 'popup__form-element_type_error', 'popup__input-error_active');
  disableSubmitButton(cardAddFormSubmitButton, 'popup__submit-button_disabled');
  addPopup(popupAddCardElement);
}

// Функция открытия попапа с картинкой
function openImage(evt) {
  const imageTarget = evt.target;
  cardTitle.textContent = imageTarget.alt;
  cardImage.src = imageTarget.src;
  cardImage.alt = imageTarget.alt;
  addPopup(imageOpenPopupElement);
}

// Функция закрытия попапа по клику на оверлэй
function closePopupByClickOnOverlay(anyPopup) {
  return function(event){
  if (event.target === event.currentTarget){
    removePopup(anyPopup);
  }
}
}

// Для закрытия попапа по нажатию на Esc
function closePopupByClickOnEscapeButton(event) {
  if (event.key === 'Escape'){
    let popupOpened = document.querySelector('.popup_opened');
    removePopup(popupOpened);
  }
}

// Слушатели событий на кнопках
profileEditButton.addEventListener('click', openPropfilePopup);
profilePopupCloseButtonElement.addEventListener('click', () => removePopup(profilePopupElement));
formElement.addEventListener('submit', formSubmitHandler);

popupAddCardButtonElement.addEventListener('click', openAddCardPopup);
popupAddCardCloseButtonElement.addEventListener('click', () => removePopup(popupAddCardElement));
cardAddFormElement.addEventListener('submit', addCardformSubmitHandler);

imageCloseButton.addEventListener('click', () => removePopup(imageOpenPopupElement));

// Слушатели событий на оверлэях попапов
popupAddCardElement.addEventListener('click', closePopupByClickOnOverlay(popupAddCardElement));
profilePopupElement.addEventListener('click', closePopupByClickOnOverlay(profilePopupElement));
imageOpenPopupElement.addEventListener('click', closePopupByClickOnOverlay(imageOpenPopupElement));

