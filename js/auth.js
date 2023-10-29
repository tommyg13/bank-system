import { addToStorage, getFromStorage, isDev } from "./app.js";
import FormHandler from "./formHandler.js";

class AuthFormHandler extends FormHandler {
  constructor(form, formAction, usersList, addToStorage) {
    super(form);
    this.usersList = usersList;
    this.addToStorage = addToStorage;
    this.formAction = formAction;
  }

  register() {
    const user = this.usersList.find((user) => user.id === this.formData.id);
    if (!user) {
      this.saveUserData(true);
    }
  }

  login() {
    const user = this.usersList.find((user) => user.id === this.formData.id);
    if (!user || user.password !== this.formData.password) {
      this.handleLoginError();
    } else {
      this.saveUserData(false);
    }
  }

  processFormData() {
    super.processFormData();
    this[this.formAction]();
  }

  saveUserData(isRegister) {
    this.addToStorage("user", this.formData);
    if (isRegister) {
      this.usersList.push(this.formData);
      this.addToStorage("users", this.usersList);
    }

    window.location.href = isDev ? "/" : "/bank-system";
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
