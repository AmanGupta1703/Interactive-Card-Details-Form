import { btnConfirm } from "./script.js";

const initalCardDetails = {
  cardNumber: "0000",
  cardholder: "James AppleSeed",
  cardExpiryMonth: "00",
  cardExpiryYear: "00",
  cardCvc: "000",
};

export const hasNumber = function (myString) {
  return /\d/.test(myString);
};

export const setInitialCardText = function (className) {
  for (const key of Object.keys(initalCardDetails)) {
    if (key === "cardNumber") {
      className.forEach((numberSpanEl) => (numberSpanEl.textContent = "0000"));
    } else {
      setCardDetails(key, initalCardDetails[key]);
    }
  }
};

const showInputError = function (className) {
  const inputEl = document.querySelector(`[name="${className}"]`);
  inputEl.classList.add("row__input--error");
};

const hideInputError = function (className) {
  const inputEl = document.querySelector(`[name="${className}"]`);
  inputEl.classList.remove("row__input--error");
};

export const showErrorMessage = function (className, textContent) {
  const errorEl = document.querySelector(`.row__error--${className}`);
  errorEl.textContent = "";
  showInputError(className);
  errorEl.classList.remove("hide");
  errorEl.textContent = textContent;
  btnConfirm.disabled = true;
};

export const hideErrorMessage = function (className) {
  const errorEl = document.querySelector(`.row__error--${className}`);
  hideInputError(className);
  errorEl.classList.add("hide");
  errorEl.textContent = "";
  btnConfirm.disabled = false;
};

export const setCardDetails = function (className, value) {
  const cardTextEl = document.querySelector(`[data-card='${className}']`);
  cardTextEl.textContent = value;
};

export const toggleCardFormAndThankYou = function (cardDetailsForm, thankYouEl) {
  cardDetailsForm.classList.toggle("hide");
  thankYouEl.classList.toggle("hide");
};
