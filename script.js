const EMOJIS = ["🍒", "🍋", "🍇", "🔔", "💎", "7️⃣"];
const SPIN_COST = 10;
const JACKPOT_PAYOUT = 100;

let score = 100;

const scoreDisplay = document.getElementById("score-display");
const reel1 = document.getElementById("reel-1");
const reel2 = document.getElementById("reel-2");
const reel3 = document.getElementById("reel-3");
const reels = [reel1, reel2, reel3];
const statusBanner = document.getElementById("status-banner");
const spinBtn = document.getElementById("spin-btn");
const resetBtn = document.getElementById("reset-btn");

function getRandomEmoji() {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}

function spin() {
  spinBtn.disabled = true;

  if (score < SPIN_COST) {
    return;
  }

  score -= SPIN_COST;
  scoreDisplay.textContent = score;
  statusBanner.textContent = "Rolling...";
  statusBanner.className = "status-banner";

  reels.forEach((reel) => {
    reel.classList.remove("jackpot-glow");
    reel.classList.add("rolling");
  });

  const shuffleInterval = setInterval(() => {
    reel1.textContent = getRandomEmoji();
    reel2.textContent = getRandomEmoji();
    reel3.textContent = getRandomEmoji();
  }, 75);

  setTimeout(() => {
    clearInterval(shuffleInterval);

    const r1 = getRandomEmoji();
    const r2 = getRandomEmoji();
    const r3 = getRandomEmoji();

    reel1.textContent = r1;
    reel2.textContent = r2;
    reel3.textContent = r3;

    reels.forEach((reel) => reel.classList.remove("rolling"));

    if (r1 === r2 && r2 === r3) {
      score += JACKPOT_PAYOUT;
      scoreDisplay.textContent = score;
      statusBanner.textContent = `🎉 JACKPOT! +${JACKPOT_PAYOUT} Credits!`;
      statusBanner.classList.add("win");
      reels.forEach((reel) => reel.classList.add("jackpot-glow"));
    } else if (score < SPIN_COST) {
      statusBanner.textContent = "Game Over! Out of credits.";
      statusBanner.classList.add("lose");
      resetBtn.classList.remove("hidden");
    } else {
      statusBanner.textContent = "No match. Spin again!";
    }

    if (score >= SPIN_COST) {
      spinBtn.disabled = false;
    }
  }, 1500);
}

function resetGame() {
  score = 100;
  scoreDisplay.textContent = score;
  statusBanner.textContent = "Credits restored! Press SPIN.";
  statusBanner.className = "status-banner";
  reels.forEach((reel) => reel.classList.remove("jackpot-glow"));
  resetBtn.classList.add("hidden");
  spinBtn.disabled = false;
}

spinBtn.addEventListener("click", spin);
resetBtn.addEventListener("click", resetGame);