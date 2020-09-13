class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }
    _getErrorElement(inputElement) {
      return this._formElement.querySelector(`#${inputElement.id}-error`);
    }
    _showInputError(inputElement, validationMessage, errorElement) {
      inputElement.classList.add(this._settings.inputErrorClass);
      errorElement.textContent = validationMessage;
      errorElement.classList.add(this._settings.errorClass);
    }
    _hideInputError(inputElement, errorElement) {
      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.textContent = '';
      errorElement.classList.remove(this._settings.errorClass);
    }
    _hasInvalidInput() {
      return this._formInputs.some(inputElement => {
        return !inputElement.validity.valid;
      })
    }
    _checkInputValidity(inputElement) {
      const errorElement = this._getErrorElement(inputElement);
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage, errorElement);
      } else {
        this._hideInputError(inputElement, errorElement);
      }
    }
    _toggleSubmitButtonState() {
        if (this._hasInvalidInput(this._formInputs)) {
          this._formSubmitButton.disabled = true;
          this._formSubmitButton.classList.add(this._settings.inactiveButtonClass);
        } else {
          this._formSubmitButton.disabled = false;
          this._formSubmitButton.classList.remove(this._settings.inactiveButtonClass);
        }
    }
    _inputEventListener(evt) {
      const inputElement = evt.target;
      this._checkInputValidity(inputElement);
      this._toggleSubmitButtonState();
    }
    _setEventListeners(fieldset) {
        this._formInputs = Array.from(fieldset.querySelectorAll(this._settings.inputSelector));
        this._formSubmitButton = fieldset.querySelector(this._settings.submitButtonSelector);
        this._toggleSubmitButtonState();
        this._formInputs.forEach(inputElement => {
          inputElement.addEventListener('input', (evt) => {
            this._inputEventListener(evt);
          });
        })
    }
    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        const fieldsetList = Array.from(this._formElement.querySelectorAll(this._settings.fieldsetSelector));
        fieldsetList.forEach(fieldset => {
          this._setEventListeners(fieldset);
        })
    }
}

export {FormValidator}
