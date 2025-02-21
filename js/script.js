"use strict";

// Imports
import {
  validateCardnumber,
  validateCardHolder,
  setCardDetails,
  setInitialCardText,
  toggleCardFormAndThankYou,
  showErrorMessage,
  validateCardmonth,
  validateCardyear,
  validateCardcvc,
} from "./helper.js";

// Elements
const cardDetailsForm = document.querySelector(".card-details-form");

const formCardDetailsEl = document.querySelector(".form--card-details");
export const btnConfirm = document.querySelector(".btn--confirm");

const thankYouEl = document.querySelector(".thank-you");
const btnContinue = document.querySelector(".btn--continue");

// Variables
let id = null;
const cardDetails = {};
const inputFieldNameAttrs = {
  CARDHOLDER: "cardholder",
  CARDNUMBER: "cardNumber",
  CARDEXPIRYMONTH: "cardExpiryMonth",
  CARDEXPIRYYEAR: "cardExpiryYear",
  CARDCVC: "cardCvc",
};

const handleCardholderInput = function (name, value) {
  const isCardholderValid = validateCardHolder(value.length, value);

  if (isCardholderValid) {
    setCardDetails(name, value);
  } else {
    showErrorMessage(name, `Invalid ${name}`);
  }
};

const handleCardnumberInput = function (name, value) {
  const isCardnumberValid = validateCardnumber(value);

  if (!isCardnumberValid) {
    showErrorMessage(name, "Invalid cardnumber provided");
    return;
  }
  const cardnumberInputVal = document.querySelector(`[name="${name}"]`).value;
  const cardNumberArray = cardnumberInputVal.split(" ");
  setCardDetails(name, value, cardNumberArray);
};

const handleCardMonthInput = function (name, value) {
  const isCardmonthValid = validateCardmonth(value);

  if (!isCardmonthValid) return showErrorMessage(name, `Invalid ${name}`);
  setCardDetails(name, value);
};

const handleCardYearInput = function (name, value) {
  const isCardyearValid = validateCardyear(value);

  if (!isCardyearValid) return showErrorMessage(name, `Input ${name}`);
  setCardDetails(name, value);
};

const handleCardCvcInput = function (name, value) {
  const isCardcvcValid = validateCardcvc(value);

  if (!isCardcvcValid) return showErrorMessage(name, `Input ${name}`);
  setCardDetails(name, value);
};

// Event listeners
formCardDetailsEl.addEventListener("submit", function (ev) {
  ev.preventDefault();

  if (id) clearTimeout(id);

  btnConfirm.textContent = "Submitting...";

  id = setTimeout(function () {
    cardDetailsForm.classList.toggle("hide");
    thankYouEl.classList.toggle("hide");
    btnConfirm.textContent = "Confirm";
    formCardDetailsEl.reset();
  }, 2000);
});

formCardDetailsEl.addEventListener("input", function (ev) {
  const { name, value } = ev.target;

  if (!value.length) {
    showErrorMessage(name, "Can't be empty");
    return;
  } else {
    switch (name) {
      case inputFieldNameAttrs.CARDHOLDER:
        handleCardholderInput(name, value);
        break;
      case inputFieldNameAttrs.CARDNUMBER:
        const rowInputCardNumberEl = document.querySelector(".row__input--cardnumber");
        const rowInputCardNumberValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
        rowInputCardNumberEl.value = rowInputCardNumberValue;
        handleCardnumberInput(name, rowInputCardNumberValue);
        break;
      case inputFieldNameAttrs.CARDEXPIRYMONTH:
        handleCardMonthInput(name, value);
        break;
      case inputFieldNameAttrs.CARDEXPIRYYEAR:
        handleCardYearInput(name, value);
        break;
      case inputFieldNameAttrs.CARDCVC:
        handleCardCvcInput(name, value);
        break;
    }
  }

  cardDetails[name] = value;
});

btnContinue.addEventListener("click", function () {
  toggleCardFormAndThankYou(cardDetailsForm, thankYouEl);
  setInitialCardText();
});
