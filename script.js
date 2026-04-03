const display = document.getElementById("display");

/* =========================
   🔊 SOUND SETUP
========================= */
const clickSound = new Audio("click.mp3");
clickSound.volume = 0.3;

const clearSound = new Audio("clear.mp3");
clearSound.volume = 0.3;

function playSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}


/* =========================
   BASIC FUNCTIONS
========================= */

function append(value) {
  display.value += value;
  playSound();
}

function clearDisplay() {
  display.value = "";
  playSound();
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
  playSound();
}

function calculate() {
  try {
    const result = eval(display.value);
    addHistory(display.value, result);
    display.value = result;
  } catch {
    display.value = "Error";
  }
  playSound();
}

/* =========================
   🔥 KEYBOARD SUPPORT + SOUND
========================= */

let lastKeyTime = 0;

document.addEventListener("keydown", (e) => {
  const now = Date.now();
  if (now - lastKeyTime < 50) return;
  lastKeyTime = now;

  const key = e.key;
  e.preventDefault();

  if (key >= "0" && key <= "9") {
    append(key);
    glow(key);
  }

  else if (["+", "-", "*", "/", "%", "."].includes(key)) {
    append(key);
    glow(key);
  }

  else if (key === "Enter") {
    calculate();
    glow("Enter");
  }

  else if (key === "Backspace") {
    deleteLast();
    glow("Backspace");
  }

  else if (key === "Escape") {
    clearDisplay();
    glow("Escape");
  }
});

/* =========================
   🔥 BUTTON GLOW
========================= */

function glow(key) {
  const button = document.querySelector(`button[data-key="${key}"]`);

  if (button) {
    button.classList.add("active-glow");

    setTimeout(() => {
      button.classList.remove("active-glow");
    }, 120);
  }
}

/*=============
HISTORY
=============== */

const historyList = document.getElementById("historyList");

function addHistory(expression, result) {
  const item = document.createElement("div");
  item.textContent = `${expression} = ${result}`;
  historyList.prepend(item);
}

function clearHistory() {
  historyList.innerHTML = "";
  clearSound.currentTime = 0;
  clearSound.play();
}

setInterval(() => {
  const star = document.createElement("div");
  star.classList.add("shooting-star");

  star.style.left = Math.random() * window.innerWidth + "px";
  star.style.top = Math.random() * window.innerHeight / 2 + "px";

  document.body.appendChild(star);

  setTimeout(() => star.remove(), 1000);
}, 1500);



