import {initialCardsData} from './cardsData.js'
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js'

const photoCardSettings = {
  photoListSelector: '.photos__list',
  photoCardSelector: '.photos__card',
  photoImageSelector: '.photos__image',
  photoFigcaptionSelector: '.photos__figcaption',
  photoLikeButtonSelector: '.photos__like-button',
  photoDeleteButtonSelector: '.photos__delete-button',
  photoImageClass: 'photos__image',
  photoLikeButtonClass: 'photos__like-button',
  photoDeleteButtonClass: 'photos__delete-button',
  photoLikedButtonClass: 'photos__like-button_liked',
}

const validationSettings = {
  formSelector: '.form',
  fieldsetSelector: '.form__fieldset',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  profileSectionSelector: '.profile',
  addCardButtonSelector: '.profile__add-button',
  editProfileButtonSelector: '.profile__edit-button',
  popupSelector: '.popup',
  popupOpenedClass: 'popup_opened',
}

// selectors
const photoTemplateSelector = '#photos-element';
const profileNameSelector = '.profile__name';
const profileCaptionSelector = '.profile__caption';
const formInputSelector = '.form__input';
const photoNameInputSelector = '#photo-name';
const photoLinkInputSelector = '#photo-link';
const formSelector = '.form';
// classes
const editProfileButtonClass = 'profile__edit-button';
const popupClass = 'popup';
const popupOpenedClass = 'popup_opened';
const popupAddClass = 'popup-add';
const popupEditClass = 'popup-edit';
const popupCloseButtonClass = 'popup__close-button';
const popupEditCloseButtonClass = 'popup-edit__close-button';
const popupAddCloseButtonClass = 'popup-add__close-button';
const inputErrorClass = 'form__input_type_error';
const errorClass = 'form__input-error_active';

// elements
const photoListElement = document.querySelector(photoCardSettings.photoListSelector)

const profileSectionElement = document.querySelector('.profile');
const addButtonElement = profileSectionElement.querySelector('.profile__add-button');
const editButtonElement = profileSectionElement.querySelector('.profile__edit-button');

const popupAddElement = document.querySelector('.popup-add');
const popupEditProfileElement = document.querySelector('.popup-edit');

const infoFormElement = document.forms.info;
const addFormElement = document.forms.photo;
const inputProfileNameElement = popupEditProfileElement.querySelector('#profile-name');
const inputProfileCaptionElement = popupEditProfileElement.querySelector('#profile-caption');

const profileName = profileSectionElement.querySelector(profileNameSelector);
const profileCaption = profileSectionElement.querySelector(profileCaptionSelector);
const popupInputsList = Array.from(document.querySelectorAll(formInputSelector));
const popupErrorsList = Array.from(document.querySelectorAll(`${formInputSelector}-error`));

const escapeKey = 'Escape';

let openPopupElement = null;

const renderCard = (data) => {
  const card = new Card(data, photoTemplateSelector, photoCardSettings);
  const cardElement = card.generateCard();
  return cardElement;
}

initialCardsData.forEach(data => {
  const cardElement = renderCard(data);
  photoListElement.append(cardElement);
})

const initializeProfileInfo = () => {
  inputProfileNameElement.value = profileName.textContent;
  inputProfileCaptionElement.value = profileCaption.textContent;
}

const clearInputValue = (popupElement) => {
  const form = popupElement.querySelector(formSelector);
  form.reset();
}

const handleEscapePress = (evt) => {
  if (evt.key === escapeKey) {
    closePopup(openPopupElement)
  }
}

const openPopup = (popupElement) => {
  popupElement.classList.add(popupOpenedClass);
  openPopupElement = popupElement;
  document.addEventListener('keydown', handleEscapePress);
}

const closePopup = (popupElement) => {
  clearInputValue(popupElement);
  hideErrorMessages();
  document.removeEventListener('keydown', handleEscapePress);
  openPopupElement = null;
  popupElement.classList.remove(popupOpenedClass);
}

const infoFormEventHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputProfileNameElement.value;
  profileCaption.textContent = inputProfileCaptionElement.value;
  closePopup(popupEditProfileElement);
}

const addFormEventHandler = (evt) => {
  evt.preventDefault();
  const cardElement = renderCard({
    name: popupAddElement.querySelector(photoNameInputSelector).value,
    link: popupAddElement.querySelector(photoLinkInputSelector).value,
  })
  photoListElement.prepend(cardElement);
  closePopup(popupAddElement);
}

const setFormsEventListeners = () => {
  addFormElement.addEventListener('submit', addFormEventHandler);
  infoFormElement.addEventListener('submit', infoFormEventHandler);
}

const hideErrorMessages = () => {
  popupInputsList.forEach(element => {
    element.classList.remove(inputErrorClass);
  })
  popupErrorsList.forEach(element => {
    element.textContent = '';
    element.classList.remove(errorClass);
  })
}

const popupCloseEventHandler = (evt, popupElement) => {
  if (evt.target.classList.contains(popupCloseButtonClass) || evt.target.classList.contains(popupClass)) {
    closePopup(popupElement);
  }
}

addButtonElement.addEventListener('click', () => {
  openPopup(popupAddElement);
})
editButtonElement.addEventListener('click', () => {
  initializeProfileInfo();
  openPopup(popupEditProfileElement);
})
popupAddElement.addEventListener('click', (evt) => {
  popupCloseEventHandler(evt, popupAddElement);
})
popupEditProfileElement.addEventListener('click', (evt) => {
  popupCloseEventHandler(evt, popupEditProfileElement);
})

setFormsEventListeners();

const setFormValidation = (settings, formElement) => {
  const formValidator = new FormValidator(settings, formElement);
  formValidator.enableValidation();
}

setFormValidation(validationSettings, infoFormElement);
setFormValidation(validationSettings, addFormElement);
