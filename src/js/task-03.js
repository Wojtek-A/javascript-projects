const textInput = document.querySelector("#validation-input");

const validationHandler = (event) => {
  const input = event.target;
  const inputLength = input.value.length;
  const maxLength = Number(textInput.dataset.length);
  if (inputLength === maxLength) {
    textInput.classList.remove("invalid");
    textInput.classList.add("valid");
  } else {
    textInput.classList.remove("valid");
    textInput.classList.add("invalid");
  }
};

textInput.addEventListener("blur", validationHandler);
