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

export const setInitialCardText = function (cardEl, textContent) {
  cardEl.textContent = textContent;
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

  showInputError(className);
  errorEl.classList.remove("hide");
  errorEl.textContent = textContent;
};

export const hideErrorMessage = function (className) {
  const errorEl = document.querySelector(`.row__error--${className}`);
  hideInputError(className);
  errorEl.classList.add("hide");
  errorEl.textContent = "";
};

export const setCardDetails = function (className, value) {
  const cardTextEl = document.querySelector(`[data-card='${className}']`);
  cardTextEl.textContent = value;
};
