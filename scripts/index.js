const profileEditButton = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('#nameInput');
let jobInput = formElement.querySelector('#jobInput');
let profileName = document.querySelector('.profile__name');
let profilePersonal = document.querySelector('.profile__personal');

// Функции открытия и закрытия попапа
const addPopup = function() {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profilePersonal.textContent;
}
const removePopup = function() {
  popupElement.classList.remove('popup_opened');
}

// Функция сохранения внесенных в профиль изменений
function formSubmitHandler (evt) {
  evt.preventDefault()
  profileName.textContent = nameInput.value;
  profilePersonal.textContent = jobInput.value;
removePopup()
}


profileEditButton.addEventListener('click', addPopup);
popupCloseButtonElement.addEventListener('click', removePopup);
formElement.addEventListener('submit', formSubmitHandler);





// Ориентир кнопки лайка для следующей проектной работы
// let likeButtons = document.querySelectorAll('.elements__like-button');
// for(let i = 0; i < likeButtons.length ; i++) {
//   likeButtons[i].addEventListener('click', function () {
//     likeButtons[i].classList.toggle('elements__like-button_pressed');
//   });
// }
