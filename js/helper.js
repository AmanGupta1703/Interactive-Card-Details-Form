import { btnConfirm } from "./script.js";
import { hasNumber, containsSpecialChars, hasDoubleSpace, containsLetters } from "./util.js";

// ELEMENTS
const cardSpanFronNumberEls = document.querySelectorAll(".card-front__number");

let errorTimeout = null;
const CARDHOLDERNAME_MINLENGTH = 2;
const CARDHOLDERNAME_MAXLENGTH = 26;

const initalCardDetails = {
  cardNumber: "0000",
  cardholder: "James AppleSeed",
  cardExpiryMonth: "00",
  cardExpiryYear: "00",
  cardCvc: "000",
};

export const setCardDetails = function (className, value, cardNumberArray) {
  if (className === "cardNumber") {
    cardNumberArray.forEach(function (number, index) {
      cardNumberArray.length <= 4 ? (cardSpanFronNumberEls[index].textContent = number) : null;
    });
  } else {
    const cardTextEl = document.querySelector(`[data-card='${className}']`);
    cardTextEl.textContent = value;
  }
};

export const setInitialCardText = function () {
  for (const key of Object.keys(initalCardDetails)) {
    if (key === "cardNumber") {
      const cardNumberArray = new Array(4).fill(initalCardDetails[key]);
      setCardDetails(key, initalCardDetails[key], cardNumberArray);
    } else {
      setCardDetails(key, initalCardDetails[key]);
    }
  }
};

export const toggleCardFormAndThankYou = function (cardDetailsForm, thankYouEl) {
  cardDetailsForm.classList.toggle("hide");
  thankYouEl.classList.toggle("hide");
};

// Validation
export const validateCardHolder = function (valueLength, value) {
  return (
    valueLength >= CARDHOLDERNAME_MINLENGTH &&
    valueLength <= CARDHOLDERNAME_MAXLENGTH &&
    !hasNumber(value) &&
    !containsSpecialChars(value) &&
    !hasDoubleSpace(value)
  );
};

export const validateCardnumber = function (value) {
  const trimmedValue = value.replace(/\s+/g, "");
  return (
    trimmedValue.length <= 16 &&
    !containsLetters(trimmedValue) &&
    !containsSpecialChars(trimmedValue)
  );
};

export const validateCardmonth = function (value) {
  return (
    !containsLetters(value) &&
    !containsSpecialChars(value) &&
    Number(value) >= 1 &&
    Number(value) <= 12
  );
};

export const validateCardyear = function (value) {
  return (
    !containsLetters(value) && !containsSpecialChars(value) && value.length > 1 && value.length <= 2
  );
};

export const validateCardcvc = function (value) {
  return !containsLetters(value) && !containsSpecialChars(value) && value.length === 3;
};

// Error
const showInputError = function (className) {
  const inputEl = document.querySelector(`[name="${className}"]`);
  inputEl.classList.add("row__input--error");
};

const hideInputError = function (className) {
  const inputEl = document.querySelector(`[name="${className}"]`);
  inputEl.classList.remove("row__input--error");
};

export const showErrorMessage = function (nameAttr, textContent) {
  if (errorTimeout) clearTimeout(errorTimeout);

  const errorEl = document.querySelector(`.row__error--${nameAttr}`);
  errorEl.textContent = "";
  showInputError(nameAttr);
  errorEl.classList.remove("hide");
  errorEl.textContent = textContent;
  btnConfirm.disabled = true;

  errorTimeout = setTimeout(function () {
    hideErrorMessage(nameAttr);
  }, 1500);
};

export const hideErrorMessage = function (nameAtrr) {
  const errorEl = document.querySelector(`.row__error--${nameAtrr}`);
  hideInputError(nameAtrr);
  errorEl.classList.add("hide");
  errorEl.textContent = "";
  btnConfirm.disabled = false;
};
