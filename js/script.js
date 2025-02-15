"use strict";

// Imports
import { hasNumber, showErrorMessage, hideErrorMessage, setCardDetails } from "./helper.js";

// Elements
const cardDetailsForm = document.querySelector(".card-details-form");
const cardFrontNumberEls = document.querySelectorAll(".card-front__number");
const cardFrontNameEl = document.querySelector(".card-front__name");
const cardFrontDateMonthEl = document.querySelector(".card-front__date--month");
const cardFrontDateYearEL = document.querySelector(".card-front__date--year");

const cardBackCvcEl = document.querySelector(".card-back__cvv");

const formCardDetailsEl = document.querySelector(".form--card-details");
const btnConfirm = document.querySelector(".btn--confirm");

const thankYouEl = document.querySelector(".thank-you");
const btnContinue = document.querySelector(".btn--continue");

// Variables
let id = null;

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

  if (name === "cardholder") {
    if (!value.length) {
      showErrorMessage(name, "Cardholder name should not be empty.");
    } else {
      hideErrorMessage(name);
      setCardDetails(name, value);
    }
  } else if (name === "cardNumber") {
    const trimmedValue = value.replace(/\s+/g, "");

    if (trimmedValue.length > 16) {
      showErrorMessage("cardNumber", "Card number cannot be longer than 16 digits.");
    } else {
      hideErrorMessage("cardNumber");
      const rowInputCardNumberEl = document.querySelector(".row__input--cardnumber");
      const rowInputCardNumberValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
      const cardNumberArray = rowInputCardNumberValue.split(" ");

      const cardSpanFronNumberEls = document.querySelectorAll(".card-front__number");

      cardNumberArray.forEach(function (number, index) {
        cardSpanFronNumberEls[index].textContent = number;
      });

      rowInputCardNumberEl.value = rowInputCardNumberValue;
    }
  } else if (name === "cardExpiryMonth") {
    if (value === "" || !hasNumber(Number(value)) || Number(value) > 12) {
      showErrorMessage(name, "Invalid Month or Year.");
    } else {
      hideErrorMessage(name);
      setCardDetails(name, value);
    }
  } else if (name === "cardExpiryYear") {
    if (!value.length) {
      showErrorMessage(name, "Invalid Month or Year.");
    } else {
      hideErrorMessage(name);
      setCardDetails(name, value);
    }
  } else if (name === "cardCvc") {
    if (value.length > 4 || !hasNumber(Number(value))) {
      showErrorMessage(name, "Invalid Cvc.");
    } else {
      hideErrorMessage(name);
      setCardDetails(name, value);
    }
  }
});

btnContinue.addEventListener("click", function (ev) {
  cardDetailsForm.classList.toggle("hide");
  thankYouEl.classList.toggle("hide");
  cardFrontNameEl.textContent = "James AppleSeed";
  cardFrontNumberEls.forEach((numberSpanEl) => (numberSpanEl.textContent = "0000"));
  cardFrontDateMonthEl.textContent = "00";
  cardFrontDateYearEL.textContent = "00";
  cardBackCvcEl.textContent = "000";
});
