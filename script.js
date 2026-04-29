// Replace this with your WhatsApp number in international format.
// Example: 13175551234 for a US number, no plus sign, no spaces.
const YOUR_WHATSAPP_NUMBER = "+13175126054";

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const buttonArea = document.getElementById("buttonArea");
const celebration = document.getElementById("celebration");
const whatsappBtn = document.getElementById("whatsappBtn");
const floatingHearts = document.getElementById("floatingHearts");

const noMessages = ["No 😭", "Try again 😅", "Too slow!", "Nope 🏃‍♂️", "Catch me!", "Are you sure? 😳"];
let noMessageIndex = 0;

function moveNoButton() {
  const areaRect = buttonArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = Math.max(areaRect.width - btnRect.width, 10);
  const maxY = Math.max(areaRect.height - btnRect.height, 10);

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;

  noMessageIndex = (noMessageIndex + 1) % noMessages.length;
  noBtn.textContent = noMessages[noMessageIndex];
}

// Desktop/laptop behavior: run away before cursor reaches it.
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("mouseover", moveNoButton);

// Mobile behavior: if tapped, jump away instead of accepting the click.
noBtn.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moveNoButton();
});

noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});

// Make the No button randomly move every few seconds so it feels alive.
setInterval(() => {
  if (!celebration.classList.contains("show")) {
    moveNoButton();
  }
}, 2600);

yesBtn.addEventListener("click", () => {
  celebration.classList.add("show");
  createConfettiHearts();
});

whatsappBtn.addEventListener("click", () => {
  const message = encodeURIComponent("Yes Nyasha!, I will be your girlfriend 💕");
  const whatsappLink = `https://wa.me/${YOUR_WHATSAPP_NUMBER}?text=${message}`;
  window.open(whatsappLink, "_blank");
});

function createFloatingHeart() {
  const heart = document.createElement("span");
  const hearts = ["💖", "💕", "💗", "💘", "🌸", "✨"];
  heart.className = "heart";
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animationDuration = `${5 + Math.random() * 5}s`;
  heart.style.setProperty("--drift", `${Math.random() * 120 - 60}px`);

  floatingHearts.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 10000);
}

function createConfettiHearts() {
  for (let i = 0; i < 45; i++) {
    setTimeout(createFloatingHeart, i * 45);
  }
}

setInterval(createFloatingHeart, 550);
moveNoButton();
