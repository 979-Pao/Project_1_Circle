let okFields = {
    name: false,
    email: false,
    phone: false,
    message: false
  };
  
  function setErrorState(elementId, hasError, errorId) {
    const element = document.getElementById(elementId);
    const error = document.getElementById(errorId);
    if (hasError) {
      error.hidden = false;
      element.style.border = "1px solid red";
    } else {
      error.hidden = true;
      element.style.border = "none";
    }
  }
  
  function validateName() {
    const name = document.getElementById("full-name");
    okFields.name = !!name.value;
    setErrorState("full-name", !okFields.name, "errorName");
    checkValues();
  }
  
  function validateEmail() {
    const email = document.getElementById("email");
    const value = email.value.trim().toLowerCase();
  
    const isEmpty = !value;
    const isValid = value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}(\.[0-9]{1,3}){3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  
    okFields.email = !!value && !!isValid;
  
    setErrorState("email", isEmpty, "errorEmail");
    document.getElementById("errorFormatEmail").hidden = !!isValid || isEmpty;
  
    if (!isEmpty && !isValid) {
      email.style.border = "1px solid red";
    } else if (isValid) {
      email.style.border = "none";
    }
  
    checkValues();
  }
  
  function validatePhone() {
    const phone = document.getElementById("phone");
    okFields.phone = !!phone.value;
    setErrorState("phone", !okFields.phone, "errorPhone");
    checkValues();
  }
  
  function validateMessage() {
    const message = document.getElementById("message");
    okFields.message = message.value.length >= 6;
    setErrorState("message", !okFields.message, "errorMessageUser");
    checkValues();
  }
  
  function checkValues() {
    const allValid = Object.values(okFields).every(Boolean);
    document.getElementById("errorSubmit").hidden = allValid;
  }
  
  function sendForm() {
    const submitError = document.getElementById("errorSubmit");
    const successMessage = document.getElementById("successMessage");
  
    const allValid = Object.values(okFields).every(Boolean);
  
    if (allValid) {
      submitError.hidden = true;
      successMessage.hidden = false;
    } else {
      successMessage.hidden = true;
      submitError.hidden = false;
      submitError.style.borderColor = "red";
    }
  }
  
  function closeSuccessMessage() {
    document.getElementById("successMessage").hidden = true;
  }
