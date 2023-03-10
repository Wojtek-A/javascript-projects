const controller = document.querySelector("input");
let text = document.querySelector("span");

const textSize = (+controller.min + +controller.max) / 2;
text.style.fontSize = `${textSize}px`;

const textSizeHandler = () => {
  const controllerValue = controller.valueAsNumber;
  text.style.fontSize = `${controllerValue}px`;
};

controller.addEventListener("input", textSizeHandler);
