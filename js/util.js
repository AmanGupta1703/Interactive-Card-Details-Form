export const hasNumber = function (myString) {
  return /\d/.test(myString);
};

export const containsSpecialChars = function (str) {
  return /[!@#$%^&*(),.?":{}|<>]/.test(str);
};

export const containsLetters = function (str) {
  return /[a-zA-Z]/.test(str);
};

export const hasDoubleSpace = function (name) {
  return /\s{2,}/.test(name);
};
