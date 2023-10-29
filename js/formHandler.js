class FormHandler {
  constructor(form) {
    if (this.constructor == FormHandler) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.form = form;
    this.errors = [];
    this.formData = {};
  }

  processForm() {
    this.clearErrors();
    this.checkForErrors();
    if (this.errors.length) {
      this.displayErrors();
      return;
    } else {
      this.processFormData();
    }
  }

  processFormData() {
    const formData = {};
    const formElements = this.form.querySelectorAll("input");
    formElements.forEach(function (el) {
      if (el.required && el.value?.trim()?.length) {
        formData[el.getAttribute("name")] = el.value;
      }
    });
    this.formData = formData;
  }

  clearErrors() {
    if (this.form) {
      this.form.querySelectorAll("p.error").forEach((el) => {
        el.remove();
      });
    }
    this.errors = [];
  }

  displayErrors() {
    this.errors.forEach((el) => {
      const error = document.createElement("p");
      const currentElement = document.getElementById(el);
      error.classList.add("error");
      if (currentElement) {
        error.textContent = `Please fill ${currentElement.getAttribute(
          "placeholder"
        )}`;

        currentElement.previousSibling.before(error);
      }
    });
  }

  checkForErrors() {
    const errors = [];
    if (!this.form) {
      errors.push("submit");
    } else {
      const formElements = this.form.querySelectorAll("input, textarea");
      //second parameter of foereach is thisArg so i convert it to arrow function to make this inherited from class
      formElements.forEach((el) => {
        if (el.required) {
          const value = el.value?.trim();
          if (value.length === 0) {
            errors.push(el.id);
          } else {
            const type = el.getAttribute("type");
            if (type === "email" && !this.isValidEmail(value)) {
              errors.push(el.id);
            }
          }
        }
      });
    }
    this.errors = errors;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  handleGlobalError() {}
}

export default FormHandler;
