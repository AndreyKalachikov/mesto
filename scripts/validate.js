// Исходный объект
const settingsObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-element',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__form-element_type_error',
  errorClass: 'popup__input-error_active'
}

// функция добавляет стиль и текст ошибок
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settingsObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settingsObject.errorClass);
};

// функция скрывает стиль и текст ошибок
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settingsObject.inputErrorClass);
  errorElement.classList.remove(settingsObject.errorClass);
  errorElement.textContent = '';
};

// функция проверяет поля input на валидность
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// функция добавляет слушатели для стилей валидности на все поля и кнопки
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(settingsObject.inputSelector));
  const buttonElement = formElement.querySelector(settingsObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// функция проверяет есть ли в форме невалидное поле (для кнопок)
const hasInvalidInput = (inputList) =>{
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// функция стилизует и блокирует/разблокирует кнопки сабмита в формах
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)){
    buttonElement.classList.add(settingsObject.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(settingsObject.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

// функция включает валидацию всех форм
const enableValidation = (settingsObject) => {
  const formList = Array.from(document.querySelectorAll(settingsObject.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement);
  })
}

enableValidation(settingsObject);
