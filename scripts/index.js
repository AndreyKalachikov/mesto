const profileEditButton = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');

const addPopup = function() {
  popupElement.classList.add("popup_opened");
}
const removePopup = function() {
  popupElement.classList.remove("popup_opened");
}

profileEditButton.addEventListener('click', addPopup);
popupCloseButtonElement.addEventListener('click', removePopup);




let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('#nameInput');
let jobInput = formElement.querySelector('#jobInput');

function formSubmitHandler (evt) {
  evt.preventDefault()

  let profileName = document.querySelector('.profile__name');
  let profilePersonal = document.querySelector('.profile__personal');

  profileName.textContent = nameInput.value;
  profilePersonal.textContent = jobInput.value;

removePopup()
}

formElement.addEventListener('submit', formSubmitHandler);










