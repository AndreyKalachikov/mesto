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
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// функция скрывает стиль и текст ошибок
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// функция проверяет поля input на валидность
const checkInputValidity = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

// функция добавляет слушатели для стилей валидности на все поля и кнопки
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

// функция проверяет есть ли в форме невалидное поле (для кнопок)
const hasInvalidInput = (inputList) =>{
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// функция стилизует и разблокирует кнопки сабмита в формах
const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

// функция стилизует и блокирует кнопки сабмита в формах
const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

// функция меняет состояние кнопки сабмита формы в зависимости от валидности полей
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)){
    disableSubmitButton(buttonElement, inactiveButtonClass);
  } else {
    enableSubmitButton(buttonElement, inactiveButtonClass);
  }
}

// функция включает валидацию всех форм
const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement, rest);
  })
}

enableValidation(settingsObject);
