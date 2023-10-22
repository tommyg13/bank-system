import { addToStorage, getFromStorage } from "./app.js";
import FormHandler from "./formHandler.js";

class AuthFormHandler extends FormHandler {
  constructor(form, formAction, usersList, addToStorage) {
    super(form, formAction);
    this.usersList = usersList;
    this.addToStorage = addToStorage;
  }

  register(formUserData) {
    const user = this.usersList.find((user) => user.id === formUserData.id);
    if (!user) {
      this.saveUserData(formUserData, true);
    }
  }

  login(formUserData) {
    const user = this.usersList.find((user) => user.id === formUserData.id);
    if (!user || user.password !== formUserData.password) {
      this.handleLoginError();
    } else {
      this.saveUserData(formUserData, false);
    }
  }

  saveUserData(userData, isRegister) {
    this.addToStorage("user", userData);
    if (isRegister) {
      this.usersList.push(userData);
      this.addToStorage("users", this.usersList);
    }
    window.location.href = "/";
  }
}

const usersList = getFromStorage("users") || [];

document.body.addEventListener("click", (e) => {
  const target = e.target;

  if (target.tagName === "BUTTON" && target.id.includes("register")) {
    const form = target.closest(".auth-form");
    const formAction = form.id === "register" ? "register" : "login";
    const formInstance = new AuthFormHandler(
      form,
      formAction,
      usersList,
      addToStorage
    );
    if (form) {
      e.preventDefault();
      formInstance.processForm();
    }
  }
});
