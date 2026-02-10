// ===== SNOWFALL GENERATOR =====
const snowContainer = document.getElementById("snowContainer");

function createSnowflake() {
  const flake = document.createElement("div");
  flake.classList.add("snowflake");

  const size = Math.random() * 5 + 3;
  flake.style.width = size + "px";
  flake.style.height = size + "px";
  flake.style.left = Math.random() * 100 + "%";
  flake.style.opacity = Math.random() * 0.5 + 0.4;
  flake.style.animationDuration = Math.random() * 4 + 5 + "s";
  flake.style.animationDelay = Math.random() * 3 + "s";

  snowContainer.appendChild(flake);

  // Clean up after animation
  const lifetime =
    parseFloat(flake.style.animationDuration) * 1000 +
    parseFloat(flake.style.animationDelay) * 1000 +
    500;
  setTimeout(() => flake.remove(), lifetime);
}

// More aggressive initial batch for full sky
for (let i = 0; i < 60; i++) {
  setTimeout(createSnowflake, i * 60);
}

// Continuous spawn
setInterval(createSnowflake, 150);

// ===== BUTTONS =====
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const mainContent = document.getElementById("mainContent");
const celebration = document.getElementById("celebration");
const noMessage = document.getElementById("noMessage");

let noCount = 0;
let yesScale = 1;

const noMessages = [
  "Are you sure? 🥺",
  "The snow is perfect though! ❄️",
  "But... I already packed my ski boots! 🥾",
  "Pleeeease? 🙏",
  "I'll keep you warm on the lift! 🧣",
  "Even the mountains want you there! 🏔️",
  "I'll make you hot chocolate! ☕",
  "You're breaking my ski poles! 💔",
  "The slopes are literally crying! 😭",
  "Fine... I'll just keep asking... 😤",
];

noBtn.addEventListener("click", () => {
  noCount++;

  // Grow the Yes button
  yesScale += 0.15;
  yesBtn.style.transform = `scale(${yesScale})`;

  // Shrink the No button
  const noScale = Math.max(0.45, 1 - noCount * 0.07);
  const noOpacity = Math.max(0.35, 1 - noCount * 0.07);
  noBtn.style.transform = `scale(${noScale})`;
  noBtn.style.opacity = noOpacity;

  // Show message with pop-in animation
  const msg = noMessages[Math.min(noCount - 1, noMessages.length - 1)];
  noMessage.textContent = msg;
  noMessage.classList.remove("hidden");

  // Re-trigger pop animation
  noMessage.classList.remove("pop-in");
  void noMessage.offsetWidth; // Force reflow
  noMessage.classList.add("pop-in");

  // Shake the No button
  noBtn.style.animation = "none";
  void noBtn.offsetWidth;
  noBtn.style.animation = "shake 0.4s ease";
});

// Shake keyframes injected dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-6px) rotate(-2deg); }
        40% { transform: translateX(6px) rotate(2deg); }
        60% { transform: translateX(-4px) rotate(-1deg); }
        80% { transform: translateX(4px) rotate(1deg); }
    }
`;
document.head.appendChild(style);

// ===== YES BUTTON =====
yesBtn.addEventListener("click", () => {
  // 1. Switch content
  mainContent.style.animation = "fadeOut 0.8s ease forwards";

  setTimeout(() => {
    mainContent.classList.add("hidden");
    celebration.classList.remove("hidden");
    celebration.style.animation = "fadeInUp 1.2s ease-out";
  }, 700);

  // 2. Warm up the background (sunset transition)
  document.body.classList.add("warm");

  // 3. Big initial confetti burst
  confetti({
    particleCount: 180,
    spread: 120,
    origin: { y: 0.45 },
    colors: ["#ff6b95", "#ffd700", "#ffffff", "#ff4b6e", "#ffb88c", "#ffb6c1"],
    ticks: 200,
  });

  // 4. Continuous side confetti
  const duration = 7000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#ff6b95", "#ffd700", "#ffffff"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#ff6b95", "#ffd700", "#ffffff"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  // 5. Second burst after a beat
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 140,
      origin: { y: 0.65 },
      colors: ["#ff6b95", "#ffd700", "#ffffff"],
    });
  }, 1800);

  // 6. Third burst for extra magic
  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 90,
      startVelocity: 25,
      origin: { x: 0.5, y: 0.3 },
      colors: ["#ffb88c", "#ff6b95", "#ffd700"],
    });
  }, 3500);
});

// FadeOut keyframes
const fadeOutStyle = document.createElement("style");
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        0% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(fadeOutStyle);
