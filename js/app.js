export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function displayError(list) {
  list.forEach(function (el) {
    const error = document.createElement("p");
    const currentElement = document.querySelector(`#${el}`);
    error.classList.add("error");
    error.textContent = `Please fill ${currentElement.getAttribute(
      "placeholder"
    )}`;

    currentElement.previousSibling.before(error);
  });
}

export function clearErrors() {
  document.querySelectorAll("p.error").forEach(function (el) {
    el.remove();
  });
}

export function getFromStorage(name) {
  return JSON.parse(localStorage.getItem(name));
}

export function addToStorage(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

export const isDev = window.location.href.includes("127.");
