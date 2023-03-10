const body = document.querySelector("body");
const button = document.querySelector("button");
const text = document.querySelector("span");

text.textContent = "#FFFFFF";

button.addEventListener("click", () => {
  const RandomHexColor = `#${Math.floor(Math.random() * 16777215).toString(
    16
  )}`;
  body.style.backgroundColor = RandomHexColor;
  text.textContent = `${RandomHexColor}`;
});
