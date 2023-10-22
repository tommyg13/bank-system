class FormHandler {
  constructor(form, formAction) {
    if (this.constructor == FormHandler) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.formAction = formAction;
    this.form = form;
    this.errors = [];
  }

  processForm() {
    this.clearErrors();
    if (this.checkForErrors().length) {
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
    this[this.formAction](formData);
  }

  clearErrors() {
    this.form.querySelectorAll("p.error").forEach(function (el) {
      el.remove();
    });
    this.errors = [];
  }

  displayErrors() {
    this.errors.forEach(function (el) {
      const error = document.createElement("p");
      const currentElement = document.querySelector(`#${el}`);
      error.classList.add("error");
      error.textContent = `Please fill ${currentElement.getAttribute(
        "placeholder"
      )}`;

      currentElement.previousSibling.before(error);
    });
  }

  checkForErrors() {
    const errors = this.errors;

    if (!this.form) {
      errors.push("submit");
    }

    const formElements = this.form.querySelectorAll("input, textarea");
    formElements.forEach(function (el) {
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

    return errors;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  handleGlobalError() {}
}

export default FormHandler;
